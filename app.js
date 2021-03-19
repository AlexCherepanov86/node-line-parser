const http = require('http');
// const serverquery = require('./src/DbRequest').query;
// const serverquery = require('./src/DbRequest');

const hostname = '127.0.0.1';
const port = 3005;


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // res.write();
    res.end(JSON.stringify(result()));
});

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

    const resQuery = async () => {
         const res = await knex
            .select()
            .from('line');
         console.log(res);
        return res
    };

const result = async() => await resQuery();

// console.log(result);
    // const result = async () => {
    //     const res = await resQuery();
    //     return res;
    // };

// const query = knex.select().table('line')
//         .then((rows) => {
//             const res = rows;
//             return (
//                 res
//             )
//         });
//
// const resQuery  = async () => {
//   const q = await Query()
//     return q
// };
    //     .catch((err) => {
    //     console.log(err);
    //     throw err
    // })
    //     .finally(() => {
    //         knex.destroy();
    //
    //     });



server.listen(port, hostname, () => {
    console.log(`Server 123 running at http://${hostname}:${port}/`);
});
