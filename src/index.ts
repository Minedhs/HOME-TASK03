import express from "express";
import bodyParser from  "body-parser";
import {blogsRouter} from "./routes/blogs-route"
import {postsRouter} from "./routes/posts-route";
import {testingRouter} from "./routes/testing-route"
import {runDb} from "./repositories/db";

const app = express()
const port = process.env.PORT || 5003

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use(bodyParser())

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing/all-data', testingRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()
