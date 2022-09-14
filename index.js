const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
const port = 5000;
require('dotenv').config()


app.use(express.json())
app.use(cors())

// DB_USER=mobarakDb
// DB_PASSWORD=9iSPNWnnXkFvqOvG

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.itqkdxk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(params) {
    try {
        await client.connect();

        const productCollection = client.db('userProduct').collection('products')


        app.get('/product', async (req, res) => {
            const product = await productCollection.find().toArray()
            res.send(product)
        })


        app.delete('/product/:id', async (req, res) => {
            const { id } = req.params;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query)
            res.send(result)
        })


        app.get('/product/:id', async (req, res) => {
            const { id } = req.params;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.findOne(query)
            res.send(result)
        })


        app.post('/addProduct', async (req, res) => {
            const data = req.body;
            const result = await productCollection.insertOne(data)
            res.send(result)
        })

    }
    finally {

    }
}


run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})












