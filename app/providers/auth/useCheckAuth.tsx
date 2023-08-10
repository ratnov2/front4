import { useAuth } from '@/hooks/useAuth'
import { errorCatch } from '@/services/api/error.api'
import { getAccessToken } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import { EnumSecureStore } from '@/shared/types/auth.interface'
import { getItemAsync } from 'expo-secure-store'
import { FC, useEffect } from 'react'

export const useCheckAuth = (routeName?: string) => {
	const { user, setUser } = useAuth()

	useEffect(() => {
		const checkAccessToken = async () => {
			const accessToken = await getAccessToken()
			if (accessToken) {
				try {
				} catch (e) {
					if (errorCatch(e) === 'jwt expired') {
						await AuthService.logout()
						setUser(null)
					}
				}
			}
		}

		checkAccessToken()
	}, [])

	useEffect(() => {
		const checkRefreshToken = async () => {
			const refreshToken = await getItemAsync(EnumSecureStore.REFRESH_TOKEN)
			if (!refreshToken && user) {
				await AuthService.logout()
				setUser(null)
			}
		}

		checkRefreshToken()
	}, [routeName])
}
