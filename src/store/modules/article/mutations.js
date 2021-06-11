export default {
  DELETE_ARTICLE(state, id) {
    const index = state.list.findIndex((item) => item.id === id)
    state.list.splice(index, 1)
  },
  ADD_ARTICLE(state, data) {
    const id = Math.max(...state.list.map((item) => item.id)) + 1
    state.list.push({ id, ...data })
  },
  CHANGE_ARTICLE(state, data) {
    let article = state.list.find((article) => article.id === data.id)
    article.title = data.title
    article.text = data.text
    article.tags = data.tags
  }
}
