const graphqlHTTP = require('express-graphql');
const express = require('express');
const cors = require('cors');
const schema = require('./schema');
const path = require('path');

const apiKey = 'CD8B674A00E49B33814FDFC559FCFB2B';
const app = express();
app.use(cors());
app.use(express.json());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.use(express.static('public'));

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('server is running on port', PORT));