const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/');
const resolvers = require('./resolvers/');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.server}/${process.env.database}`,
{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
    // app.listen(port, (err) => {
    //     if (err) throw err;
    //     console.log(`Listening to port ${port}...`);
    // });
    const server = new ApolloServer({
        typeDefs, resolvers
    });
    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
}).catch(err => {
    console.error(err);
});

