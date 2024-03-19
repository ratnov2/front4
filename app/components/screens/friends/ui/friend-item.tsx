import { Entypo } from '@expo/vector-icons'
import { FC, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { ImgAvatar } from '../../profile/other-user/OtherUserProfile'

interface IFriendItem {
	avatar?: string
	name: string
	body: React.ReactElement
	buttons?: React.ReactElement | null
	styles?: string
}

export const FriendItem: FC<IFriendItem> = ({
	avatar,
	name,
	body,
	buttons = null,
	styles = ''
}) => {
	return (
		<View
			className={`flex-row bg-zinc-800 p-3 rounded-2xl items-center ${styles} items-center`}
		>
			<View>
				<ImgAvatar avatar={avatar || ''} name={name} size='friends-item' />
			</View>
			<View className='flex-row justify-between flex-1 items-center ml-4'>
				{body}
			</View>
			<View>{buttons}</View>
		</View>
	)
}

//const TextUp = (children: React.ReactNode) => <Text className='text-white'>{children}</Text>
