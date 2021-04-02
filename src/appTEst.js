// const http = require('http');
// const serverquery = require('./src/DbRequest').query;
// const serverquery = require('./src/DbRequest');

// var result = {};

// const Query = async (result) => {
//     result = await knex
//         .select()
//         .from('line')
//     console.log(result);
//     return await result
// };
//
// Query();

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     // res.write();
//     res.end(JSON.stringify(Query()));
// });



// const resQuery = async() =>{
//     var result = await Query();
//     console.log(result);
//     return result;
// }
// const result = async() => await resQuery();

// console.log(Query());

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


//
// server.listen(port, hostname, () => {
//     console.log(`Server 123 running at http://${hostname}:${port}/`);
// });