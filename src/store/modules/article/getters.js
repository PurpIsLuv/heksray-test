export default {
  getTagList(state) {
    let tags = []
    state.list.forEach((article) => {
      tags = tags.concat(article.tags)
    })
    return [...new Set(tags)]
  }
}
