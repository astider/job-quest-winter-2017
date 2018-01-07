import React from 'react'
import gql from 'graphql-tag'
import {
    graphql
} from 'react-apollo'
import { todoListQuery } from './TodoListWithData';

const DeleteTodo = (props) => {

  const handleClick = (e) => {
      
    e.preventDefault()
    props.mutate({ 
      variables: { id: e.target.id },
      refetchQueries: [ { query: todoListQuery }]
    })
    .then( res => {
      //e.target.value = '';
    })
  }

  return (
    <button id={props.id} onClick={handleClick} className="delButton">delete</button>
  )
}

const deleteTodoMutation = gql`
mutation ($id: ID!) {
    deleteTodo(todoId: $id) {
      todoId
      text
      done
      createdAt
      updatedAt
  }
}
`

export default graphql(deleteTodoMutation)(DeleteTodo)