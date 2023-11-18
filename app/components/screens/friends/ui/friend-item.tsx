import { Entypo } from '@expo/vector-icons'
import { FC } from 'react'
import { Image, Text, View } from 'react-native'

interface IFriendItem {
	avatar?: string
	name: string
	body: React.ReactElement
	buttons: React.ReactElement
	styles?: string
}

export const FriendItem: FC<IFriendItem> = ({
	avatar,
	name,
	body,
	buttons,
	styles = ''
}) => {
	return (
		<View
			className={`flex-row bg-zinc-800 p-3 rounded-2xl items-center ${styles}`}
		>
			<View>
				{avatar ? (
					<Image className={`w-14 h-14 `} source={{ uri: avatar }} />
				) : (
					<View className='bg-red-600 w-12 h-12 rounded-full flex-row justify-center items-center'>
						<Text className='text-white font-bold text-xl'>
							{name[0] || 'A'}
						</Text>
					</View>
				)}
			</View>
			<View className='flex-row justify-between flex-1 items-center ml-4 '>
				{body}
			</View>
			<View>{buttons}</View>
		</View>
	)
}

//const TextUp = (children: React.ReactNode) => <Text className='text-white'>{children}</Text>
