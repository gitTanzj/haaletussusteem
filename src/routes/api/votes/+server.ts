import { json, error } from '@sveltejs/kit'
import { createConnection } from '$lib/database';

export async function GET() {
    const pool = await createConnection()
    console.log("try query")
    const fetchedStats = await pool.query('select otsus from HAALETUS')
    const peopleFor = await pool.query('select eesnimi, perenimi from HAALETUS where otsus = "poolt"')
    const peopleAgainst = await pool.query('select eesnimi, perenimi from HAALETUS where otsus = "vastu"')
    const stats = {
        peopleFor: peopleFor[0],
        peopleAgainst: peopleAgainst[0],
        for: 0,
        against: 0
    }
    for(let i = 0; i < fetchedStats[0].length; i++) {
        if(fetchedStats[0][i].otsus === 'poolt') {
            stats.for++
        } else if(fetchedStats[0][i].otsus === 'vastu') {
            stats.against++
        }
    }
    console.log("end query")
    await pool.end()

    return new Response(JSON.stringify(stats), {
        headers: {
            'Content-Type': 'application/json'
        }, 
        status: 200
    })
}