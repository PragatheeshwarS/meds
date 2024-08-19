const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = "mongodb+srv://spragatheeshwar:praga@cluster0.1jjpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'meds';
const collectionName = 'affords';

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    app.get('/', async (req, res) => {
      try {
        const data = await collection.find({}).toArray();
        res.json(data);
        console.log(data);
      } catch (err) {
        res.status(500).send('Error fetching data');
      }
    });

    app.get('/sorted-in-price', async (req, res) => {
      try {
        const price = [];
        const data = await collection.find({}).toArray();
        res.json(data);
        console.log(data);
        for(i=0; i<data.length; i++) {
          price.push(data.price);
        }
        console.log(price[0:price.length()]);

      } catch (err) {
        res.status(500).send('Error fetching data');
      }
    });

    app.get('/sorted-in-name', async (req, res) => {
      try {
        const name = [];
        const data = await collection.find({}).toArray();
        res.json(data);
        console.log(data);
        for(i=0; i<data.length; i++) {
          price.push(data.price);
        }
        name = name.sort();
        console.log(price[0:name.length()]);
        
      } catch (err) {
        res.status(500).send('Error fetching data');
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));