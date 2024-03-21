import { AntDesign, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'
import { FC, ReactNode } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ILayoutOpacityItems {
	children: ReactNode
	ComponentRender: JSX.Element
	scrollEnabled?: boolean
}

export const LayoutOpacityItems: FC<ILayoutOpacityItems> = ({
	children,
	ComponentRender,
	scrollEnabled = true
}) => {
	const insets = useSafeAreaInsets()
	return (
		<View className='flex-1 relative'>
			<View className='flex-1 mx-4'>
				<ScrollView
					scrollEnabled={scrollEnabled}
					style={{ paddingTop: insets.top + 40 }}
					className='flex-1'
				>
					{children}
					<View style={{ height: insets.bottom + 150 }} />
				</ScrollView>
				<View
					style={{ top: insets.top, zIndex: 10 }}
					className='flex-row items-center absolute'
				>
					{ComponentRender}
				</View>
			</View>
			<View style={{ zIndex: 20 }}>
				<LinearGradient
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
				></LinearGradient>
			</View>
		</View>
	)
}
