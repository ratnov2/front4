import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import { FC } from 'react'
import { FlatList, Image, Pressable, Text } from 'react-native'
import { View } from 'react-native'
import { TReaction, reactionsData2 } from '../home/element-photo/ElementPhoto'
import { ImgAvatar } from '../profile/other-user/OtherUserProfile'
import { Link, useNavigation } from '@react-navigation/native'
import { useAuth } from '@/hooks/useAuth'

interface IEmodziComment {
	style?: string
	reactionsData: {
		userId: string
		reactionType: TReaction
		avatar: string
	}[]
}

export const EmodziComment: FC<IEmodziComment> = ({
	style = '',
	reactionsData
}) => {
	const { user } = useAuth()
	if (!user) return null
	const { navigate } = useNavigation<any>()
	console.log(reactionsData);
	
	return (
		<View className={`mt-4 ${style} mx-2`}>
			<View className='flex-row'>
				{reactionsData.length > 0 ? (
					<FlatList
						data={[...reactionsData]}
						className='flex-row'
						horizontal
						showsHorizontalScrollIndicator={false}
						renderItem={({ item }) => (
							<Pressable
								className='mr-4'
								onPress={() => navigate('Profile', { id: item.userId })}
							>
								<ImgAvatar avatar={item?.avatar} size='reaction-main' />
								<Text className='absolute bottom-0 -right-1'>
									{reactionsData2[item.reactionType]}
								</Text>
							</Pressable>
						)}
					></FlatList>
				) : (
					<View className='h-10 flex-1 justify-center'>
						<Text className='text-white/50 text-lg font-bold text-center '>
							Пока нет реакций
						</Text>
					</View>
				)}
				{/* {reactionsData.map((reaction, key) => (
					<Pressable className='relative' key={key}>
						<ImgAvatar avatar={reaction?.avatar} size='reaction-main' />
						<Text className='absolute bottom-0 -right-1'>
							{reactionsData2[reaction.reactionType]}
						</Text>
					</Pressable>
				))} */}
			</View>
			<Devider style='mt-4' />
		</View>
	)
}

interface IDevider {
	style?: string
}

export const Devider: FC<IDevider> = ({ style = '' }) => {
	return <View className={`w-full bg-zinc-700 h-[0.5px] ${style}`} />
}
