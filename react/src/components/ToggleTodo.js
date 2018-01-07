import React from 'react'
import gql from 'graphql-tag'
import {
    graphql
} from 'react-apollo'
import { todoListQuery } from './TodoListWithData';

const ToggleTodo = (props) => {

  const handleClick = (e) => {
      
    props.mutate({ 
      variables: { id: e.target.id },
      refetchQueries: [ { query: todoListQuery }]
    })
    .then( res => {
      //e.target.value = '';
    })
  }

  return (
    <input className="checkToggle" type="checkbox" id={props.id} onClick={handleClick} defaultChecked={props.done} />
  )
}

const toggleTodoMutation = gql`
mutation ($id: ID!) {
    toggleTodo(todoId: $id) {
      todoId
      text
      done
      createdAt
      updatedAt
  }
}
`

export default graphql(toggleTodoMutation)(ToggleTodo)