import { ProfileService } from '@/services/profile/profile.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { YourMemories } from '../your-memories/YourMemories'
import { UserInfo } from '../user-info/UserInfo'
import { SharePinBlock } from '../share-pin-block/SharePinBlock'
import { Joined } from '../ui/Joined'
import { IProfile } from '@/shared/types/profile.interface'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const MainProfile: FC = () => {
	const user = useQuery(['get-profile'], () => ProfileService.getProfile(), {
		onSuccess: data => {
			setUserState(data)
			AsyncStorage.setItem('cashed-my-profile', JSON.stringify(data))
		}
	})
	const queryClient = useQueryClient()

	const [userState, setUserState] = useState<IProfile | null>(null)
	useEffect(() => {
		;(async () => {
			if (!user.data) {
				const userFromCache = await AsyncStorage.getItem('cashed-my-profile')
				//console.log(userFromCache)

				//setUserState(userFromCache)
			}

			//return queryClient.getQueryCache()
		})()
	}, [])
	// @get-user
	//console.log(user);
	//console.log(userState);
	
	return (
		<View>
			{userState && (
				<>
					<UserInfo user={userState} />
					<Joined date={userState.createdAt} />
					<SharePinBlock user={userState} />
					<YourMemories />
				</>
			)}
		</View>
	)
}
