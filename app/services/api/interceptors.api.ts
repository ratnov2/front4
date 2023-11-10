import { API_URL } from '@/config/api.config'
import axios from 'axios'
import { deleteTokensStorage, getAccessToken } from '../auth/auth.helper'
import { errorCatch } from './error.api'
import { getNewTokens } from './helper.auth'

const baseURL = 'http://localhost:4200/api'
export const BaseImageUrl = 'http://localhost:4200'

const instance = axios.create({
	//baseURL: API_URL,
	baseURL,
	headers: {
		'Content-Type': 'application/json'
	}
})

export const $files = axios.create({
	baseURL,
	headers: { 'content-type': 'multipart/form-data' }
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
			error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') await deleteTokensStorage()
			}
		}
		throw error
	}
)
export default instance
