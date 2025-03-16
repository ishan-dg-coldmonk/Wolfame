require("./db/mongoose")
const express = require("express")
const cors = require('cors');
const userRouter = require("./routers/user")
const teamRouter = require("./routers/team")
const matchRouter = require("./routers/match")
const winnerRouter = require("./routers/winner")

const port = process.env.PORT || 8001
const app = express()

app.use(cors())
app.use(express.json())
app.use('/user', userRouter)
app.use('/team', teamRouter)
app.use('/match', matchRouter)
app.use('/winner', winnerRouter)


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})