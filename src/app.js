const express = require('express');
const app = express();


const hostname = '127.0.0.1';
const port = 3005;

const knex = require('knex')({
    client: 'mssql',
    connection: {
        host : '194.58.102.119',
        user : 'banana',
        password : '63RwTeWc3AF2tqB3',
        database : 'sydney',
        port: 11933,
        "options": {
            "encrypt": true,
            "enableArithAbort": true
        }
    }
});

app.get('/api', (req, res) => {
    res.set({
        'Content-Type': 'application/json',
        'Content-Range': '10000',
        // Access-Control-Allow-Credentials: true
        // Access-Control-Allow-Headers: Accept, Content-Type, Cache-Control, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization
        // Access-Control-Allow-Methods: OPTIONS,POST,GET
        'Access-Control-Allow-Origin': 'http://localhost:3001'
        // Access-Control-Expose-Headers: X-Total-Count
        // Content-Type: application/json; charset=UTF-8
        // X-Total-Count: 2
        // Date: Fri, 16 Apr 2021 16:28:12 GMT
        // Content-Length: 1050
    });
    var dbReq = {};
    var reqLimit = req.query.perpage;
    var sort = req.query.sort;
    console.log(sort);
    console.log(sort[0]);
    (function (){
        dbReq = (req.query);
        delete dbReq.perpage;
        delete dbReq.sort;
        return dbReq
    }());
    // var column = sort[0];
    // var order = sort['order'];
    console.log(dbReq);
    // console.log(order);
    knex
        .select()
        .from('line')
        .offset(0)
        // .orderByRaw('gameid DESC')
        .orderBy([{column: "gameid", order: "asc"}])
        // .orderBy(sort)
        .limit(reqLimit)
        .where(
            dbReq
            )
        .then(data=> res.json(data))
});
app.disable('etag');
app.listen(port, hostname, function () {
    console.log(`Server listens http://${hostname}:${port}`)
});


