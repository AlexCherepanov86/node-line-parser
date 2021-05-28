const knex = require('knex')({
    client: 'mssql',
    connection: {
        host : '194.58.102.119:11933',
        user : 'banana',
        password : '63RwTeWc3AF2tqB3',
        database : 'sydney'
    }
});

export const qeury = knex.select().table('line');