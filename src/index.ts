import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";

var session = require('express-session');
var cookieParser = require('express-session');
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";



const main = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [RegisterResolver, LoginResolver],
    });
    const apolloServer = new ApolloServer({ 
        schema,
        context: ({req}: any) => ({ req})  
    });

    const app = Express();


    app.use(cors({
        credentials: true,
        origin: "http://localhost:3000"
    }));

    app.use(cookieParser('mysecret'));
    app.use(session({
        store: new (require('connect-pg-simple')(session))(),
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
        }));

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log( "Server listening on http://localhost:4000");
    })
}

main();