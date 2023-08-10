import { FC, useEffect, useState } from 'react'
import {
	NavigationContainer,
	useNavigationContainerRef
} from '@react-navigation/native'
import PrivateNavigator from './PrivateNavigator'
import { useCheckAuth } from '@/providers/auth/useCheckAuth'
import { BottomMenu } from '@/ui'
import { useAuth } from '@/hooks/useAuth'

const Navigation: FC = () => {
	const { user } = useAuth()
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(
		undefined
	)

	const navRef = useNavigationContainerRef()

	useEffect(() => {
		setCurrentRoute(navRef.getCurrentRoute()?.name)

		const listener = navRef.addListener('state', () =>
			setCurrentRoute(navRef.getCurrentRoute()?.name)
		)

		return () => {
			navRef.removeListener('state', listener)
		}
	}, [])

	useCheckAuth(currentRoute)

	return (
		<>
			<NavigationContainer ref={navRef}>
				<PrivateNavigator />
			</NavigationContainer>

			{user && currentRoute && (
				<BottomMenu nav={navRef.navigate} currentRoute={currentRoute} />
			)}
		</>
	)
}

export default Navigation
