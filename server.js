// Require
const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env['PORT'] || 3000;

const app = express();

// Middlware

// ACCESS LOG
app.use((req, res, next) => {
    const log = [
        `${new Date().toISOString()}\t`,
        `${req.method}\t`,
        `${req.path}`,
        `${res.statusCode}`,
        `\n`
    ].join(' ');
    fs.appendFile('logs.txt', log, (err) => {
        if (err) {
            throw err;
        }
    });
    next();
})

// AUTHENTICATION

// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.get('/', (req, res) => {

    res.send({
        status: 'OK',
        msg: 'Hello world'
    })
});


app.get('/yoou', (req, res) => {

    res.send({
        status: 'OK',
        msg: 'Hello yoou'
    })
});

// Start app
app.listen(PORT, () => {
    console.log('App started on port: ', PORT);
});