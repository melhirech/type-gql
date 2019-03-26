import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import {createConnection} from 'typeorm'

import {RegisterResolver} from './modules/user/Register'


const main = async () => {
    //connect to Postgres
    await createConnection()

    const schema = await buildSchema({
        resolvers: [RegisterResolver],
    });

    const apolloServer = new ApolloServer({schema})
    const app = Express()
    apolloServer.applyMiddleware({app})

    app.listen(3000, () => {
        console.log('Server started at http://localhost:3000/graphql ...')
    })

}

main()