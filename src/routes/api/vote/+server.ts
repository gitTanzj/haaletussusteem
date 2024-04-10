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