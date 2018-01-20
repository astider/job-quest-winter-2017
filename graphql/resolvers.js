const fetch = require('isomorphic-fetch')

const request = (path, options) => {

  const fetchOptions = {
    method: options.method
  }

  if (options.method == 'POST' || options.method == 'DELETE') {
    fetchOptions.body = JSON.stringify(options.data)
    fetchOptions.headers = { 'Content-Type': 'application/json' }
  }

  return fetch(`http://localhost:8000${path}`, fetchOptions)
  .then(response => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json()
  })
}


module.exports = {
  Query: {
    listTodo() {
      return request('/', { method: 'GET'} )
    }
  },
  Mutation: {
    createTodo(doc, { text }) {
      const options = { method: 'POST', data: { inputText: text } }
      return request('/', options)
    },
    deleteTodo(doc, { todoId }) {
      const options = { method: 'DELETE', data: { todoId: todoId } }
      return request(`/${todoId}`, options)
    },
    toggleTodo(doc, { todoId }) {
      const options = { method: 'POST', data: { todoId: todoId } }
      return request(`/${todoId}/toggle`, options)
    }
  },
}