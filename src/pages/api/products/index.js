import Database from '@/database/db'

const allAvos = async (req, res) => {
  try {

    const db = new Database()
    const allEntries = await db.getAll()
    const lenght = allEntries.length

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ lenght, data: allEntries }))
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.end(
      JSON.stringify({ length: 0, data: [], error: 'Something went wrong' })
    )
  }
}

export default allAvos