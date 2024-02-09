import { FC, RefObject } from 'react'
import { Animated, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface IListButtonSwiperFriend {
	refButtonGroup: RefObject<View>
	scrollToPage: (index: number) => void
	animatedValue: Animated.Value
}

export const ListButtonSwiperFriend: FC<IListButtonSwiperFriend> = ({
	refButtonGroup,
	scrollToPage,
	animatedValue
}) => {
	const insets = useSafeAreaInsets()
	return (
		<View
			className='bg-slate-800 rounded-full p-2 flex-row justify-between items-center z-40 w-[300]'
			style={{
				alignSelf: 'center',
				position: 'absolute',
				bottom: insets.bottom
			}}
			ref={refButtonGroup}
		>
			<Animated.View
				style={{
					position: 'absolute',
					bottom: 6,
					left: 6,
					width: 90,
					height: 36,
					backgroundColor: 'red',
					borderRadius: 100,
					transform: [
						{
							translateX: animatedValue.interpolate({
								inputRange: [0, 1, 2],
								outputRange: [0, 300 / 3 + 5, (300 / 3) * 2]
							})
						}
					]
				}}
			/>
			<TouchableOpacity
				className={`p-2 rounded-full`}
				onPress={() => scrollToPage(0)}
				// ref={refButton1}
			>
				<Text className='text-white'>Suggestion</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className={`${''} p-2 rounded-full ml-1`}
				onPress={() => scrollToPage(1)}
				// ref={refButton2}
			>
				<Text className='text-white'>Friends</Text>
			</TouchableOpacity>
			<TouchableOpacity
				className={`${''} p-2 rounded-full ml-1`}
				onPress={() => scrollToPage(2)}
			>
				<Text className='text-white'>Requests</Text>
			</TouchableOpacity>
		</View>
	)
}
