const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const chalk = require("chalk")
const path = require("path")
const cors = require("cors")
const routes = require("./routes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use("/api", routes)

const PORT = config.get("port") ?? 8080

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")))

  const indexPath = path.join(__dirname, "client", "index.html")

  app.get("*", (req, res) => {
    res.sendFile(indexPath)
  })
}

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"))
        // await mongoose.connect(config.get("mongodb://blog-db/blog"))
        console.log(chalk.green(`MongoDB connected.`))
        app.listen(PORT, () => console.log(chalk.green(`Server has been started on port ${PORT}`)))
    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()