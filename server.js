const fs = require("fs")
// const http = require("http")
const express = require("express")

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        "status": "Success",
        "message": "Application is running good..."
    })
})

app.get('/nanda', (req, res) => {
    res.status(200).json({
        "message": "Ping Successfully !"
    })
})

// middleware / handler untuk url yang tidak dapat diakses
// middleware = our own middleware
app.use((req, res, next) => {
    res.status(404).json({
        "status": "Failed",
        "message": "API not exist !!!"
    })
})

app.listen("3000", () => {
    console.log("start aplikasi kita di port 3000")
})
