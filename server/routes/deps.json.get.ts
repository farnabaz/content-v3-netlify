export default eventHandler(() => {
  const env = process.env
  const deps = Object.keys(env)
    .filter(key => key.startsWith("npm_package_dependencies_"))
    .map(dep => {
      return {
        name: dep.replace("npm_package_dependencies_", ""),
        version: env[dep]
      }
    })

  return {
    deps
  }
})