import express from 'express'
require('dotenv').config()



express.json()
const app = express()
const port = process.env.APP_PORT || 3001

app.get('/', (req, res) => {
    //res.send(`<h1>NLW 4.0</h1>`)
    res.json({ message: 'NLW 4.0' })
})

app.post('/', (req, res) => {
    //requisição 
    res.json({ message: 'resposta via metodo post' })
})

app.listen(port, () => console.log(`Server is running at https://localhost:${port}`))