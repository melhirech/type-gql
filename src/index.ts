import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import 'reflect-metadata'
import { buildSchema, Resolver, Query} from 'type-graphql'

@Resolver()
class HelloResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!"
    }
}


const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver],
    });

    const apolloServer = new ApolloServer({schema})
    const app = Express()
    apolloServer.applyMiddleware({app})

    app.listen(3000, () => {
        console.log('Server started at http://localhost:3000/graphql ...')
    })

}

main()