const express = require('express')
const app = express()
const port = 3000

app.listen(port, console.log('listening at port '+port))
app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})