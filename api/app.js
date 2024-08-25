import express from 'express'
import grade from './routes/grade.js'

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use('/grade/', grade)

app.listen(3000, () => console.log('server running on port 3000'))