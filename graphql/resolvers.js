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
  return fetch(`http://localhost:8000${path}`, {
    method: 'POST',
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
      console.log(text)
      return post('/', { inputText: text })
    }
  },
}