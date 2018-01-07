import React from 'react'
import gql from 'graphql-tag'
import {
    graphql
} from 'react-apollo'

import AddTodo from './AddTodo'
import DeleteTodo from './DeleteTodo'
import ToggleTodo from './ToggleTodo'

const TodoList = ({ data: {loading, error, listTodo }}) => {

  if (loading) {
    return <p>Loading Todo List ...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }

  while (loading) {}
  console.log(loading)

  return (
      
    <div className="todosList">
      <AddTodo />
        { listTodo.map( todo => 
            (
                <div key={todo.todoId} className={(todo.done) ? 'done':'todo'}>
                <label>
                    <ToggleTodo id={todo.todoId} done={todo.done} />
                    { todo.text }
                </label>
                <DeleteTodo id={todo.todoId} /></div>
            )
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