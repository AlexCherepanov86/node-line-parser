const knex = require('knex')({
    client: 'mssql',
    connection: {
        host : '194.58.102.119:11933',
        user : 'banana',
        password : '63RwTeWc3AF2tqB3',
        database : 'sydney'
    }
});
//
// import { SqlConfig, sql } from '@frangiskos/mssql';
// const sqlConfig: SqlConfig = {
//     user: 'banana',
//     password: '63RwTeWc3AF2tqB3',
//     server: '194.58.102.119:11933',
//     database: 'sydney'
// };


// export const query = sql.query('SELECT * FROM line').then(data => console.log(data)).catch(error => console.error(error));

export const qeury = knex.select().table('line');