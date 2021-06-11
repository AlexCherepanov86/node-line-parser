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

    (function (){
        dbReq = (req.query);
        delete dbReq.perpage;
        delete dbReq.start;
        delete dbReq.end;
        delete dbReq.sort;
        delete dbReq.order;
        return dbReq
    }());


    console.log(dbReq);
    console.log(Object.keys(dbReq).length);
    console.log(`${Object.keys(dbReq)}`, ...Object.values(dbReq));
    console.log([...Object.keys(dbReq)], ...Object.values(dbReq));

    const getData = async() => {
        var totalrows = 0;

        await res.set({
            'Content-Type': 'application/json',
            // Access-Control-Allow-Credentials: true
            // Access-Control-Allow-Headers: Accept, Content-Type, Cache-Control, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': 'Content-Range',
            // X-Total-Count: 2
        });

        (Object.keys(dbReq).length === 1 && Object.values(dbReq)[0].length === 1 || Object.keys(dbReq).length === 0) ?
        (
            await knex
                    .select()
                    .from('line')
                    .offset(start)
                    .orderBy([{column: `${sort}`, order: `${order}`}])
                    .limit(reqLimit)
                    .where(dbReq)
                    .then(data=>{
                        totalrows = data.length
                        res.set({
                            'Content-Range': `posts ${start}-${end}/${totalrows}`
                        });
                        res.json(data)
                        console.log("вариант1");

                     })
        )
                :
                (Object.keys(dbReq).length === 1 && Object.values(dbReq)[0].length > 1 ) ?
            (
                await knex
                    .select()
                    .from('line')
                    .offset(start)
                    .orderBy([{column: `${sort}`, order: `${order}`}])
                    .limit(reqLimit)
                    .whereIn(`${Object.keys(dbReq)}`, ...Object.values(dbReq))
                    .then(data=>{
                        totalrows = data.length
                        res.set({
                            'Content-Range': `posts ${start}-${end}/${totalrows}`,
                        });
                        res.json(data)
                        console.log("вариант2");
                    })
            )
            :
            (
                await knex
            .select()
            .from('line')
            .offset(start)
            .orderBy([{column: `${sort}`, order: `${order}`}])
            .limit(reqLimit)
            .whereIn([...Object.keys(dbReq)], ...Object.values(dbReq))
            .then(data => {
                totalrows = data.length
                res.set({
                    'Content-Range': `posts ${start}-${end}/${totalrows}`,
                });
                res.json(data)
                console.log("вариант3");
            })
            )
    }
    getData().then(data => data);
});

server.disable('etag');
server.listen(port, hostname, function () {
    console.log(`Server listens http://${hostname}:${port}`)
});


