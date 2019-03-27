import { MeResolver } from './modules/user/Me';
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import session from 'express-session'
import ConnectRedis from 'connect-redis'
import { redis } from './../redis';
import cors from 'cors'

import { RegisterResolver } from './modules/user/Register'
import { LoginResolver } from './modules/user/Login'

const main = async () => {
    //connect to Postgres
    await createConnection()

    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver, MeResolver],
        authChecker: ({ context: { req } }) => !!req.session.userId
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: any) => ({ req })
    })

    const app = Express()
    app.use(cors({
        credentials: true,
        origin: "http://localhost:4000"
    }))
    const RedisStore = ConnectRedis(session)
    app.use(
        session({
            store: new RedisStore({
                client: redis
            }),
            name: "qid",
            secret: "aslkdfjoiq12312",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
            }
        })
    );

    apolloServer.applyMiddleware({ app })

    app.listen(3000, () => {
        console.log('Server started at http://localhost:3000/graphql ...')
    })

}

main()