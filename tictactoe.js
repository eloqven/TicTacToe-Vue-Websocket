const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3001

app.use('/style', express.static(__dirname + "/style"))
app.get('/js/Square.js', (req, res) => res.sendFile(__dirname + '/js/Square.js'))
app.get('/js/Game.js', (req, res) => res.sendFile(__dirname + '/js/Game.js'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => {
    console.log(socket.id);
    io.emit('restart', true) // start new game when new player arrives // there are no connection limits atm 
    socket.on('index', (i) => io.emit('index', i)) // send the index back to the client
    socket.on('restart', (restart) => io.emit('restart', restart)) // send the restart command back to the client
})

http.listen(port, () => console.log('listening on port ' + port))