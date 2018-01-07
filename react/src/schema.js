export const typeDefs = `

type Todo {
   todoId: ID!
   text: String
   done: Boolean
   createdAt: String
   updatedAt: String
}

type Query {
    listTodo: [Todo]
}

`