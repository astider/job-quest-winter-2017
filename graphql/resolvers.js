const fetch = require('isomorphic-fetch')

const request = (path, query) => {
  return fetch(`http://localhost:8000${path}`)
  .then(response => {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json()
  })
}

const post = (path, data) => {

  console.log(`send POST to http://localhost:8000${path}`)

  return fetch(`http://localhost:8000${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.status >= 400) {
      console.log('return status : ' + response.status)
      throw new Error("Bad response from server");
    }
    return response.json()
  })
}

const del = (path, data) => {
  return fetch(`http://localhost:8000${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
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
      return request('/')
    }
  },
  Mutation: {
    createTodo(doc, { text }) {
      return post('/', { inputText: text })
    },
    deleteTodo(doc, { todoId }) {
      return del(`/${todoId}` , { todoId: todoId })
    },
    toggleTodo(doc, { todoId }) {
      return post(`/${todoId}/toggle` , { todoId: todoId })
    }
  },
}