const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const seedData = {};
const stringifySeedData = JSON.stringify(seedData)

// fs.writeFileSync('caseInformation.json', stringifySeedData)


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin', 'X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.get('/api/case-information', (req, res, next) => {
    const caseInformation = fs.readFileSync('caseInformation.json');
    const parseCaseInformation = JSON.parse(caseInformation)
    res.status(200).json(parseCaseInformation);
});

app.post('/api/case-information', (req, res, next) => {
    const caseInformation = req.body;
    console.log(caseInformation);
    res.status(201).json({
        message: 'Info added successfully'
    });
})

module.exports = app;