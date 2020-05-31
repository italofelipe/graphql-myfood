import { GraphQLServer } from 'graphql-yoga'
import { resolve } from 'path'

const typeDefs = resolve(__dirname, 'schema.graphql')
const USERS = [
  { id: 1, name: 'The Lich King', email: 'arthas@wow.com' },
  { id: 2, name: 'Jaina Proudmoore', email: 'jaina@wow.com' },
  { id: 3, name: 'Uther', email: 'uther@wow.com' }
]

const resolvers = {
  User: {
    name: (parent): string => {
      console.log('Parent: ', parent)
      return 'User: ' + parent.name
    }
  },
  Query: {
    users: (): typeof USERS => USERS
  },
  Mutation: {
    createUser: (parent, args): typeof USERS[0] => {
      const { data } = args
      console.log('args: ', args)

      const user = {
        ...data,
        id: USERS.length + 1
      }
      USERS.push(user)
      return user
    }
  }
}
const server = new GraphQLServer({
  typeDefs,
  resolvers
})

export default server
