const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/getLabels', (req, res) => {
    console.log(req.query)
    // let apiKey = req.query.apiKey
    // let textId = req.query.textId
    // let websiteId = req.query.websiteId
    // res.json(`Test received: ${textId}`)
    let labels = {
        header1: 'testHeader',
        paragraph: 'testpaaragarph'
    }
    res.json(labels)
})

app.listen(port, () => {
    console.log(`Express app listenning on port ${port}`)
})