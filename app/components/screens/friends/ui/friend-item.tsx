import { Entypo } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, Text, View } from 'react-native'

interface IFriendItem {
	avatar: string
	name: string
}

export const FriendItem: FC<IFriendItem> = ({ avatar, name }) => (
	<View className='flex-row'>
		<View>
			{avatar ? (
				<Image className='w-14 h-14' source={{ uri: avatar }} />
			) : (
				<View className='bg-red-600 w-12 h-12 rounded-full flex-row justify-center items-center'>
					<Text className='text-white'>{name[0] || 'A'}</Text>
				</View>
			)}
		</View>
		<View className='flex-row justify-between flex-1 items-center ml-4 '>
			<View className='h-12 justify-between flex-1'>
				{/* <Text className='text-white font-bold text-base'>
					Invite freinds on BeReal
				</Text> */}
				{/* <Text className='text-white font-medium text-base'>{`bere.al/${email.split(
					'@'
				)[0]}`}</Text> */}
			</View>
			
		</View>
	</View>
)
