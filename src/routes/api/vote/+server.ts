import { json, error } from '@sveltejs/kit'
import { createConnection } from '$lib/database';



export async function POST(event) {
    const body = await event.request.formData()
    
    console.log([...body]);
    const firstname = body.get('firstname');
    const lastname = body.get('lastname');
    const choice = body.get('choice');

    const pool = await createConnection()
    console.log("try choice query")
    await pool.query('CALL HAALETUS_VALIDATE(?, ?, ?)', [firstname, lastname, choice])
    console.log("end choice query")
    await pool.end()

    return json({ 'message': 'vote successfully sent'})
}

export async function GET() {
    const pool = await createConnection()
    console.log("try query")
    const fetchedStats = await pool.query('select otsus from HAALETUS')
    const stats = {
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