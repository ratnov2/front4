import { ProfileService } from '@/services/profile/profile.service'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { PinBlock } from '@/entities/profile'
import { Link } from '@react-navigation/native'
import { YourMemories } from '../your-memories/YourMemories'
import { UserInfo } from '../user-info/UserInfo'
import { SharePinBlock } from '../share-pin-block/SharePinBlock'
import { Joined } from '../ui/Joined'

export const MainProfile: FC = () => {
	const user = useQuery(['get-user'], () => ProfileService.getProfile())
	return (
		<View>
			{user.data && (
				<>
					<UserInfo user={user.data} />
					<Joined date={user.data.createdAt} />
					<SharePinBlock user={user.data} />
					<YourMemories />
				</>
			)}
		</View>
	)
}
