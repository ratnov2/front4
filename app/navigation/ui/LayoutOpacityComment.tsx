import { shareProfile } from '@/ui/share-profile/ShareProfile'
import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

import { FC, ReactNode } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ILayoutOpacityComment {
	children: ReactNode
	ComponentRender?: JSX.Element
}

export const LayoutOpacityComment: FC<ILayoutOpacityComment> = ({
	children,
	ComponentRender
}) => {
	const insets = useSafeAreaInsets()
	const { navigate } = useNavigation<any>()
	return (
		<View className='flex-1 relative'>
			<View className='flex-1'>
				<ScrollView className='flex-1'>{children}</ScrollView>
			</View>
			<View
				style={{ top: insets.top, zIndex: 10000000000 }}
				className='flex-row items-center absolute w-full'
			>
				<View className='flex-row flex-1 relative justify-between'>
					<View className='absolute w-full flex-row justify-center '>
						<View>
							<Text className='text-white text-center font-bold text-xl'>
								My BePrime
							</Text>
							<Text className='text-white text-center'>12,12,12</Text>
						</View>
					</View>
					<TouchableOpacity onPress={() => navigate('Home')}>
						<Feather name='arrow-left' size={30} color='white' />
					</TouchableOpacity>
					<View className='flex-row'>
						<TouchableOpacity onPress={() => shareProfile('')}>
							<Entypo name='share' size={24} color='white' />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => navigate('Home')}>
							<Entypo name='dots-three-vertical' size={24} color='white' />
						</TouchableOpacity>
					</View>
				</View>
			</View>

			{/* <LinearGradient
				colors={['#111111', 'rgba(0,0,0,0)']}
				style={{
					height: insets.top + 100,
					width: '100%',
					position: 'absolute',
					top: 0,
					pointerEvents: 'box-only'
				}}
			></LinearGradient> */}
		</View>
	)
}
