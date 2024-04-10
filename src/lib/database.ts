import mysql from 'mysql2/promise';

// Database functions are here for now

export async function createConnection(): Promise<mysql.Pool> {
    return mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'kasparita22_haaletus',
        password: 'GoodPassword123',
        database: 'kasparita22_haaletussusteem',
    })
}