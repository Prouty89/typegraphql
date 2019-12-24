import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import "reflect-metadata";

@Resolver()
class HelloResolver{
    @Query(() => String)
    async helloWorld() {
        return "Hello World!"
    }
}

const main = async () => {
    const schema = await buildSchema({
        resolvers: [HelloResolver],
    });
    const apolloServer = new ApolloServer({schema})

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log( "Server listening on http://localhost:4000");
    })
}

main();