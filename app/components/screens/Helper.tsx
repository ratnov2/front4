import { useAuth } from '@/hooks/useAuth'
import { ProfileService } from '@/services/profile/profile.service'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { View } from 'react-native'

export const Helper = ({ deviceToken }: { deviceToken?: string }) => {
	const { user } = useAuth()
	const user2 = useQuery(['get-profile'], () => ProfileService.getProfile())
	const sendToken = useMutation(
		['send-expo-push-tokens'],
		(data: { deviceToken: string; _id: string }) =>
			ProfileService.sendDeviceToken(data)
	)
	useEffect(() => {
		if (user && deviceToken) sendToken.mutate({ _id: user._id, deviceToken })
	}, [deviceToken])
	return <></>
}
