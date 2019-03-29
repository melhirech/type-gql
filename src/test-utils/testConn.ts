import { createConnection } from "typeorm";


export const testConn = (drop: boolean = false) => {
    //return a test connection
    return createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "med",
        password: "med",
        database: "typegraphql-example-test",
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + "/../entity/*.*"]
    })
}