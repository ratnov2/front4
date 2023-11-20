import { io } from 'socket.io-client'
import { BaseImageUrl } from './interceptors.api'
export const createConnection = () => {
	//const socket = SocketIOClient('http://localhost:3000');
	const socket = io(`http://localhost:4200/`)
	console.log(`http://localhost:4200/`)

	socket.on('connect', () => {
		console.log('connect')
	})
	socket.on('disconnect', e => {
		console.log('disconnect')
	})
}
