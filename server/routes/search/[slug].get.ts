
export default eventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")

  const data = await queryCollection(event, "content").path(`/${slug}`).first()
  return data
})