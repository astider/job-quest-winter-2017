import React from 'react'
import gql from 'graphql-tag'
import {
    graphql
} from 'react-apollo'

import AddTodo from './AddToDo'


const TodoList = ({ data: {loading, error, todos }}) => {
    
  if (loading) {
    return <p>Loading Todo List ...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  todos = [
      {
          todoId: 1,
          text: 'a'
      },
      {
          todoId: 2,
          text: 'b'
      }
  ]

  return (
      
    <div className="todosList">
      <AddTodo />
        { todos.map( todo =>
            (<div key={todo.todoId} className="todo">{ todo.text }</div>)
        )}
    </div>
  )

}

export const todoListQuery = gql`
    query {
        listTodo {
            todoId
            text
            done
            createdAt
            updatedAt
        }
    }
`

export default graphql(todoListQuery, {
  options: { pollInterval: 5000 },
})(TodoList);