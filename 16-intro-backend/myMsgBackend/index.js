const fs = require('fs');
const express = require('express');
const cors = require('cors');

const DB = './posts.json';
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

/**
 * GET a specified amount of the `count` most recent messages from our 'db'.
 */
app.get('/message', (req, res) => {
    fs.readFile(DB, (err, data) => {
        if (err || !req.query.count)
            res.status(500).json(err).end();
        else
            res.status(200).json(JSON.parse(data).slice(0, req.query.count)).end();
    });
});

/**
 * POST to create a message in our 'db'.
 */
app.post('/message', (req, res) => {
    fs.readFile(DB, (err, data) => {
        if (err)
            res.status(500).json(err).end();
        let j = Array.from(JSON.parse(data));
        j.push(req.body);
        fs.writeFile(DB, JSON.stringify(j), (err, data) => {
            if (err)
                res.status(500).json(err).end();
        });
    });
    res.status(200).end();
});

app.listen(port, () => {
    console.log(`Started listening at http://localhost:${port}`);
});