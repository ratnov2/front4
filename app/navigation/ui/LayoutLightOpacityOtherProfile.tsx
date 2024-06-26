import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'
import { FC, ReactNode, useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface LayoutLightOpacity {
	children: ReactNode
	onGoBack: () => void
	title: string
	padding?: string
}

export const LayoutLightOpacityOtherProfile: FC<LayoutLightOpacity> = ({
	children,
	onGoBack,
	title,
	padding = ''
}) => {
	const [isVisibleModal, setIsVisibleModal] = useState(false)
	const insets = useSafeAreaInsets()
	return (
		<View className={`flex-1 relative ${padding}`}>
			<ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: insets.top + 40 }} className='flex-1'>
				{children}
				<View style={{ height: insets.bottom + 150 }} />
			</ScrollView>
			{/* <LinearGradient
				colors={['#00000000', '#111111']}
				style={{
					height: 50,
					width: '100%',
					position: 'absolute',
					bottom: 0
				}}
			></LinearGradient>
			<LinearGradient
				colors={['#111111', '#00000000']}
				style={{
					height: insets.top + 50,
					width: '100%',
					position: 'absolute',
					top: 0
				}}
			></LinearGradient> */}
			<View
				style={{ top: insets.top }}
				className={`flex-row items-center absolute ${padding}`}
			>
				<View className='flex-row justify-between flex-1'>
					<View className='flex-row'>
						<TouchableOpacity onPress={onGoBack}>
							<AntDesign name='arrowleft' size={30} color='white' />
						</TouchableOpacity>
						<Text className='text-white ml-4 font-bold text-lg'>{title}</Text>
					</View>
					{/* <TouchableOpacity onPress={() => setIsVisibleModal(true)}>
						<Entypo name='dots-three-vertical' size={24} color='white' />
					</TouchableOpacity> */}
				</View>
			</View>
		</View>
	)
}
