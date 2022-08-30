const {app, express} = require("./server")
const port = 3000
const path = require('path')
const {saucesRouter} = require("./routers/sauces.routes")
const {authRouter} = require("./routers/auth.routes")

// connection
require("./mongo")

//Middleware
app.use("/api/sauces", saucesRouter)
app.use("/api/auth", authRouter)

// routes
app.get("/", (req , res) => res.send("Hello world"))

// listen
app.use('/images', express.static(path.join(__dirname, 'images')))
app.listen(port, () => console.log("listening on port " + port))

