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

server.get('/api', (req, res) => {
    var dbReq = {};
    var reqLimit = req.query.perpage;
    var start = req.query.start;
    var end = req.query.end;
    var sort = req.query.sort;
    var order = req.query.order;

    (function (){
        dbReq = (req.query);
        delete dbReq.perpage;
        delete dbReq.start;
        delete dbReq.end;
        delete dbReq.sort;
        delete dbReq.order;
        return dbReq
    }());
    var totalrows = 1;

    async function total (){
        return totalrows = await knex
            .select()
            .from('line')
            .where(
                dbReq
            )
            .then(data=> {
                // console.log(data.length);
                data.length})
    }
    // var column = sort[0];
    // var order = sort['order'];
    console.log(dbReq);
    console.log(totalrows);
    // console.log(order);
    const getData = async() => {

        await total();
        await res.set({
            'Content-Type': 'application/json',
            'Content-Range': `posts ${start}-${end}/${totalrows}`,
            // Access-Control-Allow-Credentials: true
            // Access-Control-Allow-Headers: Accept, Content-Type, Cache-Control, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': 'Content-Range',
            // Content-Type: application/json; charset=UTF-8
            // X-Total-Count: 2
        });
        await  knex
            .select()
            .from('line')
            .offset(start)
            // .orderByRaw('gameid DESC')
            .orderBy([{column: `${sort}`, order: `${order}`}])
            // .orderBy(sort)
            .limit(reqLimit)
            .where(
                dbReq
            )
            .then(data=> {
                res.json(data)})
    }
    getData();
});
server.disable('etag');
server.listen(port, hostname, function () {
    console.log(`Server listens http://${hostname}:${port}`)
});


