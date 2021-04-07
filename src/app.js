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
    var dbReq = {};
    var reqLimit = req.query.perpage;
    var sort = req.query.sort;
    (function (){
        dbReq = (req.query);
        delete dbReq.perpage;
        delete dbReq.sort;
        return dbReq
    }());

    console.log(dbReq);
    console.log(sort);
    knex
        .select()
        .from('line')
        .offset(0)
        // .orderByRaw('gameid DESC')
        // .orderBy([{column: 'gameid', order: 'desc'}])
        .orderBy(sort)
        .limit(reqLimit)
        .where(
            dbReq
            )

        .then(data=> res.json(data))
});

app.listen(port, hostname, function () {
    console.log(`Server listens http://${hostname}:${port}`)
});


