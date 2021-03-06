import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import session from 'express-session'
import ConnectRedis from 'connect-redis'
import { redis } from './../redis';
import cors from 'cors'
import { createSchema } from './utils/createSchema';


const main = async () => {
    //connect to Postgres
    await createConnection()

    const schema = await createSchema()
    
    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }: any) => ({ req, res })
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