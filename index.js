const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
const port = 5000;
require('dotenv').config()


app.use(express.json())
app.use(cors())



const uri = "mongodb+srv://mobarakDb:9iSPNWnnXkFvqOvG@cluster0.itqkdxk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(params) {
    try {
        await client.connect();

        const productCollection = client.db('userProduct').collection('products')


        app.get('/product', async (req, res) => {
            const product = await productCollection.find().toArray()
            res.send(product)
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












