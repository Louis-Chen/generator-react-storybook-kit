import React, { useState, useEffect } from 'react'

const useWebSocket = () => {
	const [data, setData] = useState([])
	useEffect(() => {
		const url = 'ws://localhost:8000'
		const ws = new WebSocket(url)
		ws.onopen = event => console.log('connect ws')
		ws.onmessage = event => {
			const data = JSON.parse(event.data)
			setData(data)
		}
	}, [])
	return [data]
}

const MockWebSocket = () => {
	const [data] = useWebSocket()
	const { rss, heapTotal, heapUsed, external } = data

	return (
		<div>
			<h1>Server Stats</h1>
			<table style={{ border: '1px soild #333' }}>
				<thead style={{ backgroundColor: '#333', color: '#fff' }}>
					<tr>
						<th colSpan={2}>Memory usage</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style={{ border: '1px soild #333' }}>Rss</td>
						<td style={{ border: '1px soild #333' }}>{rss}</td>
					</tr>
					<tr>
						<td style={{ border: '1px soild #333' }}>HeapTotal</td>
						<td style={{ border: '1px soild #333' }}>{heapTotal}</td>
					</tr>
					<tr>
						<td style={{ border: '1px soild #333' }}>HeapUsed</td>
						<td style={{ border: '1px soild #333' }}>{heapUsed}</td>
					</tr>
					<tr>
						<td style={{ border: '1px soild #333' }}>External</td>
						<td style={{ border: '1px soild #333' }}>{external}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export const toStorybook = () => <MockWebSocket></MockWebSocket>

export default {
	title: 'WebSocket'
}
toStorybook.story = {
	name: 'websocket demo'
}
