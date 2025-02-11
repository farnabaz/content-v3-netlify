import { resolve, dirname } from "node:path";

export default function bunSqliteConnector(opts) {
  let _db;
  console.log({opts, _db});
  const getDB = async () => {
    if (_db) {
      return _db;
    }

    const filePath = resolve(
      opts.cwd || ".",
      opts.path || `.data/${opts.name || "db"}.bun.sqlite`,
    );
    const Database = await import("@db/sqlite").then(m => m.Database);
    _db = new Database(filePath);

    return _db;
  };

  return {
    name: "sqlite",
    dialect: "sqlite",
    getInstance: () => getDB(),
    async exec(sql) {
      return (await getDB()).prepare(sql).run();
    },
    prepare(sql) {
      const _stmt = getDB().then(db => db.prepare(sql));
      const stmt = {
        _params: [],
        bind(...params) {
          if (params.length > 0) {
            this._params = params;
          }
          return stmt;
        },
        async all(...params) {
          return Promise.resolve(( await _stmt).all(...params));
        },
        async run(...params) {
          const res = ( await _stmt).run(...params);
          return Promise.resolve({ success: true });
        },
        async get(...params) {
          return Promise.resolve(( await _stmt).get(...params));
        },
      };
      return stmt;
    },
  };
}