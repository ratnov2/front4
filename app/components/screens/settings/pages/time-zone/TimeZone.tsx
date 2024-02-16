import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { LayoutLight } from '@/navigation/ui/LayoutLight'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { CardComponent, getStyleToByCardSettings } from '../../Settings'

type INotifications = NativeStackScreenProps<TypeRootStackParamList, 'TimeZone'>
type KeysOfCard = 'americans' | 'europe' | 'west_asia' | 'east_asia'

export const TimeZone: FC<INotifications> = ({ navigation }) => {
	const timeZoneComponents: {
		id: KeysOfCard
		text: string
		icon: JSX.Element
	}[] = [
		{
			id: 'americans',
			text: 'Americans',
			icon: <Ionicons name='earth' size={24} color='white' />
		},
		{
			id: 'europe',
			text: 'Europe',
			icon: <Ionicons name='earth' size={24} color='white' />
		},
		{
			id: 'west_asia',
			text: 'West Asia',
			icon: <Ionicons name='earth' size={24} color='white' />
		},
		{
			id: 'east_asia',
			text: 'East Asia',
			icon: <Ionicons name='earth' size={24} color='white' />
		}
	]
	return (
		<LayoutLight
			title='Time Zone'
			onGoBack={() => navigation.navigate('Settings')}
		>
			<View>
				<Text className='text-white text-3xl font-bold'>
					Select vour Time Zone
				</Text>
				<Text className='text-white text-lg mt-2'>
					To receive your BeReal notification during daytime, select your time
					zone. When changing your time zone, all your current BeReal will be
					deleted. You can only change time zones once a day.
				</Text>
			</View>
			<View className='mt-6'>
				{timeZoneComponents.map((item, index) => (
					<CardComponent
						icon={item.icon}
						text={item.text}
						StyleRounded={getStyleToByCardSettings(
							index,
							timeZoneComponents.length - 1
						)}
						onPress={() => ''}
					/>
				))}
			</View>
			<TouchableOpacity className='bg-zinc-800 p-4 rounded-2xl mt-4 w-full'>
				<Text className='text-white font-bold text-center'>Save</Text>
			</TouchableOpacity>
		</LayoutLight>
	)
}
