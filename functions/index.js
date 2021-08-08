const functions = require("firebase-functions");
const express = require('express');
const faker = require('faker');
const app = express();
const engines = require('consolidate');
app.engine('ejs', engines.ejs);
app.set('views', './views');
app.set('view engine', 'ejs');

const data = ()=>{
    return {
        name: faker.name.findName(),
        phrases: [1,1,1].map(faker.hacker.phrase)
    }
}
app.get(
    '/',
    (req, res)=>{
        res.set('Cache-Control', 'public, max-age:100')
        functions.logger.info("Hello logs!", {structuredData: true});
        res.render('index', data()) 
    }
)


app.get(
    '/json',
    (req, res)=>{
        res.set('Cache-Control', 'public, max-age:100')
        res.json( data()) 
    }
)

exports.app = functions.https.onRequest(app);
