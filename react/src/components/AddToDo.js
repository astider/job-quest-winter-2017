import React from 'react'
import gql from 'graphql-tag'
import {
    graphql
} from 'react-apollo'
import { todoListQuery } from './TodoListWithData';

const AddTodo = ({ mutate }) => {

  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist()
      mutate({ 
        variables: { inputText: evt.target.value },
        refetchQueries: [ { query: todoListQuery }]
      })
      .then( res => {
        evt.target.value = '';
      })
    }
  }

  return (
    <input
      type="text"
      placeholder="Enter new Todo"
      onKeyUp={handleKeyUp}
    />
  )
}

const addTodoMutation = gql`
mutation ($inputText: String!) {
    createTodo(text: $inputText) {
      todoId
      text
      done
      createdAt
      updatedAt
  }
}
`

export default graphql(addTodoMutation)(AddTodo)