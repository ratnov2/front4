import axios from 'axios'
import { deleteUserStorage, getAccessToken } from '../auth/auth.helper'
import { errorCatch } from './error.api'
import { getNewTokens } from './helper.auth'

//let url = '85.92.111.216'

let url = '192.168.181.227'

export const baseURL = `http://${url}:4200/api`
export const BaseImageUrl = `http://${url}:4200`

export const BaseImageUrl2 = (path: string) => `http://${url}:4200${path}`

const instance = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json'
	}
})

export const $files = axios.create({
	baseURL,
	headers: { 'Content-Type': 'multipart/form-data' }
})

instance.interceptors.request.use(async config => {
	const accessToken = await getAccessToken()
	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`
	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await getNewTokens()
				return await instance.request(originalRequest)
			} catch (error) {
				if (
					errorCatch(error) === 'jwt expired' ||
					errorCatch(error) === 'Unauthorized'
				) {
					await deleteUserStorage()
				}
			}
		}
		throw error
	}
)
export default instance
