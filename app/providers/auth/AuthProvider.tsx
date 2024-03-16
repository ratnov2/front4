import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState
} from 'react'
import { IContext, TypeUserState } from './auth-provider.interface'
import * as SplashScreen from 'expo-splash-screen'
import { getAccessToken, getUserFromStorage } from '@/services/auth/auth.helper'
export const AuthContext = createContext({} as IContext)

SplashScreen.preventAutoHideAsync()

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(null)

	useEffect(() => {
		let isMounted = true
		const checkAccessToken = async () => {
			try {
				const accessToken = await getAccessToken()
				if (accessToken) {
					const user = await getUserFromStorage()
					if (isMounted) {
						setUser(user)
					}
				}
			} catch {
				//console.log('AuthProvider');
				
			} finally {
				await SplashScreen.hideAsync()
			}
		}
		checkAccessToken()

		return () => {
			isMounted = false
		}
	}, [])

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
