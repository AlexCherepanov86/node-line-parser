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

    let resultArr = {}
    const getFilters = async () => {

        let resultArrLeague = []
        let resultArrTeam1 = []
        let resultArrTeam2 = []

        await  knex
            .select()
            .distinct()
            .column('league')
            .from('line')
            .then(data => {
                data.map(item => {
                    item = {id: item.league, name: item.league}
                    resultArrLeague.push(item)
                })
            });
        await  knex
            .select()
            .distinct()
            .column('t1')
            .from('line')
            .then(data => {
                data.map(item => {
                    item = {id: item.t1, name: item.t1}
                    resultArrTeam1.push(item)
                })
            });
        await  knex
            .select()
            .distinct()
            .column('t2')
            .from('line')
            .then(data => {
                data.map(item => {
                    item = {id: item.t2, name: item.t2}
                    resultArrTeam2.push(item)
                })
            });

       return  resultArr = {league: resultArrLeague, team1: resultArrTeam1, team2:resultArrTeam2}
    }
    getFilters().then(resultArr => res.json(resultArr))
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


