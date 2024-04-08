import { AntDesign, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'
import { FC, ReactNode } from 'react'
import {
	KeyboardAvoidingView,
	KeyboardAvoidingViewBase,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface LayoutLightOpacity {
	children: ReactNode
	onGoBack: () => void
	title: string
	padding?: string
}

export const LayoutLightOpacity: FC<LayoutLightOpacity> = ({
	children,
	onGoBack,
	title,
	padding = ''
}) => {
	const insets = useSafeAreaInsets()
	return (
		<View className={`flex-1 relative ${padding}`}>
			<KeyboardAwareScrollView
				className='flex-1'
				keyboardShouldPersistTaps='handled'
				showsVerticalScrollIndicator={false}
			>
				<ScrollView
					style={{
						paddingTop: insets.top + 40,
						backgroundColor: 'transparent'
					}}
					keyboardShouldPersistTaps='handled'
					className='flex-1'
					showsVerticalScrollIndicator={false}
				>
					{children}
					<View style={{ height: insets.bottom + 150 }} />
				</ScrollView>
			</KeyboardAwareScrollView>
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
				<TouchableOpacity onPress={onGoBack}>
					<AntDesign name='arrowleft' size={30} color='white' />
				</TouchableOpacity>
				<Text className='text-white ml-4 font-bold text-lg'>{title}</Text>
			</View>
		</View>
	)
}
