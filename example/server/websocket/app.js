const express = require('express')
const { createServer } = require('http')
const WebSocket = require('ws')
const path = require('path')

const app = express()
const server = createServer(app)
const wss = new WebSocket.Server({ server })
app.use(express.static(path.join(__dirname, '/public')))

wss.on('connection', async ws => {
	await ws.send(JSON.stringify(process.memoryUsage()))
	const test = await setInterval(() => ws.send(JSON.stringify(process.memoryUsage()), err => {}), 5000)
	ws.on('close', () => {
		console.log('close')
		clearInterval(test)
	})
})

const port = 8000

server.listen(port, () => console.log(`listening on http://localhost:${port}`))
