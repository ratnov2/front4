import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'
import { shareProfile } from './ShareProfile'

export const WithShareProfile: FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const { user } = useAuth()
	return (
		<TouchableOpacity onPress={() => shareProfile(String(user?._id))}>
			{children}
		</TouchableOpacity>
	)
}
