import { FC, useEffect } from 'react'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'
import { TReaction, reactionsData2 } from './ElementPhoto'
import { Text } from 'react-native'
import { ImgAvatar } from '../../profile/other-user/OtherUserProfile'

interface IAnimationReaction {
	reactionsLength: number
	index: number
	avatar: string
	reactionType: string
	isVisibleSmile: boolean
}

export const AnimationReaction: FC<IAnimationReaction> = ({
	index,
	reactionsLength,
	avatar,
	reactionType,
	isVisibleSmile
}) => {
	const opacity = useSharedValue(1)
	useEffect(() => {
		if (isVisibleSmile) {
			opacity.value = withTiming(0)
		} else {
			opacity.value =  withTiming(1)
		}
	}, [isVisibleSmile])
	return (
		<Animated.View
			style={{ opacity }}
			className={`relative ${reactionsLength > 4 && index !== 0 && '-ml-4'} border-stone-200 border-[1px] rounded-full`}
		>
			<ImgAvatar avatar={avatar} size='reaction-main' />
			<Text className='absolute bottom-0 -left-1'>{reactionType}</Text>
		</Animated.View>
	)
}
