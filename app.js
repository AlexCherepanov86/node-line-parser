const http = require('http');
// const serverquery = require('./src/DbRequest').query;
// const serverquery = require('./src/DbRequest');

const hostname = '127.0.0.1';
const port = 3005;


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // res.write();
    res.end(JSON.stringify(resQuery()));
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
    return knex
        .select()
        .from('line')
        // TODO В этой функции данные в rows можно преобразовывать или просто удалить эут конструкцию
        .then((rows) => {
            return rows
        });
};

resQuery().then(rows => {
    // TODO Вот тут единственное место где можно получить к ним доступ
    console.log(rows);
    return {
      data: rows
    }  
});

// const query = knex.select().table('line')
//         .then((rows) => {
//
//             const res = rows;
//
//             return (
//                 res
//             )
//         });
// const resQuery  = async () => {
//   const q = await query
//   return q
// };
    //     .catch((err) => {
    //     console.log(err);
    //     throw err
    // })
    //     .finally(() => {
    //         knex.destroy();
    //
    //     });

// TODO Тут ты не можешь получить данные, этот код выполнится раньше чем они придут
console.log(resQuery.data);

server.listen(port, hostname, () => {
    console.log(`Server 123 running at http://${hostname}:${port}/`);
});
