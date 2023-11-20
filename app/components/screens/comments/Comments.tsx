import { useAuth } from '@/hooks/useAuth'
import { createConnection } from '@/services/api/socket'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import { View } from 'react-native'

export const Comments = () => {
	// useEffect(() => {
	// 	createConnection()
	// }, [])
	const ff = useRoute()
	const { user } = useAuth()
	console.log(ff.params)

	return <View>

    </View>
}
