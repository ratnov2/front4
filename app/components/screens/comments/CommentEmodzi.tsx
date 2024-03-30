import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import { FC } from 'react'
import { FlatList, Image, Pressable, Text } from 'react-native'
import { View } from 'react-native'
import { TReaction, reactionsData2 } from '../home/element-photo/ElementPhoto'
import { ImgAvatar } from '../profile/other-user/OtherUserProfile'

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
	return (
		<View className={`mt-4 ${style} mx-2`}>
			<View className='flex-row'>
				<FlatList
					data={[
						...reactionsData,
						...reactionsData,
						...reactionsData,
						...reactionsData,
						...reactionsData,
						...reactionsData,
						...reactionsData
					]}
					className='flex-row'
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({item}) => (
						<Pressable className='relative mr-4'>
							<ImgAvatar avatar={item?.avatar} size='reaction-main' />
							<Text className='absolute bottom-0 -right-1'>
								{reactionsData2[item.reactionType]}
							</Text>
						</Pressable>
					)}
				></FlatList>
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
