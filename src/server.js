const express = require('express');
const server = express();


const hostname = '127.0.0.1';
const port = process.env.PORT || 3005;

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

server.get('/filter', (req, res) => {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Range',
    });
    knex
        .select()
        .distinct()
        .column('league')
        .from('line')
        .then(data=> {
            res.json(data)});
})

server.get('/filters', (req, res) => {
    knex
        .column('league')
        .select()
        .from('line')
        .limit(100)
        .then(data=> {
            // let data2 = new Map ([...data])
            let result = [];
            // Object.values = obj => Object.keys(obj).map(key => obj[key]);
            // result = Object.values(data);
            for (let value of Object.values(data)) {
                result.push(value);
            }
            // result = Array.from(new Set(data));
            return res.json(result)})
})

server.get('/api', (req, res) => {
    var dbReq = {};
    var reqLimit = req.query.perpage;
    var start = req.query.start;
    var end = req.query.end;
    var sort = req.query.sort;
    var order = req.query.order;
    // var dbFilter = req.query.filter;

    (function (){
        dbReq = (req.query);
        delete dbReq.perpage;
        delete dbReq.start;
        delete dbReq.end;
        delete dbReq.sort;
        delete dbReq.order;
        return dbReq
    }());

    var totalrows = 0;

    console.log(dbReq);
    console.log(totalrows);

    const getData = async() => {
        await knex
            .select()
            .from('line')
            .where(
                dbReq
            )
            .then(data=> {
                totalrows = data.length}
            );
        await res.set({
            'Content-Type': 'application/json',
            'Content-Range': `posts ${start}-${end}/${totalrows}`,
            // Access-Control-Allow-Credentials: true
            // Access-Control-Allow-Headers: Accept, Content-Type, Cache-Control, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': 'Content-Range',
            // X-Total-Count: 2
        });
        await  knex
            .select()
            .from('line')
            .offset(start)
            .orderBy([{column: `${sort}`, order: `${order}`}])
            .limit(reqLimit)
            .where(
                dbReq
            )
            .then(data=> {
                res.json(data)})
    }
    getData().then(data => data);

});

server.disable('etag');
server.listen(port, hostname, function () {
    console.log(`Server listens http://${hostname}:${port}`)
});


