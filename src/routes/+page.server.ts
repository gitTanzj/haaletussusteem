import { createConnection } from '$lib/database';

/*
Näite https://sidorares.github.io/node-mysql2/docs/documentation/promise-wrapper
async function example1() {
  const mysql = require('mysql2/promise');
  const conn = await mysql.createConnection({ database: test });
  const [rows, fields] = await conn.execute('select ?+? as sum', [2, 2]);
  await conn.end();
}

async function example2() {
  const mysql = require('mysql2/promise');
  const pool = mysql.createPool({ database: test });
  // execute in parallel, next console.log in 3 seconds
  await Promise.all([
    pool.query('select sleep(2)'),
    pool.query('select sleep(3)'),
  ]);
  console.log('3 seconds after');
  await pool.end();
}
*/

// Create connection is now at lib/database.ts

async function test() {
    console.log("create connection")
    const pool = await createConnection()
    console.log("try query")
    console.log( await pool.query('select 1;') )
    console.log("end")
    await pool.end()
}

test()




// export function mysqlConn() {
//     if (!mysqlconn) {
//         mysqlconn = mysql.createConnection({
//             host: 'ikt.khk.ee:2083',
//             user: 'kasparita22_haaletus',
//             password: 'GoodPassword123',
//             database: '',
//         });
//     }
//     return mysqlconn
// }