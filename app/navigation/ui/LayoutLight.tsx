import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { FC, ReactNode } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ILayoutLight {
	children: ReactNode
	// pressableItem: JSX.Element
	onGoBack: () => void
	title: string
}

export const LayoutLight: FC<ILayoutLight> = ({
	children,
	onGoBack,
	title
}) => {
	const insets = useSafeAreaInsets()

	return (
		<View style={{ marginTop: insets.top }} className='flex-1'>
			<View className='flex-row items-center mb-2'>
				<TouchableOpacity onPress={onGoBack}>
					<AntDesign name='arrowleft' size={30} color='white' />
				</TouchableOpacity>
				<Text className='text-white ml-4 font-bold text-lg'>{title}</Text>
			</View>
			<View className='flex-1'>
				<ScrollView className='flex-1'>{children}</ScrollView>
			</View>
		</View>
	)
}
