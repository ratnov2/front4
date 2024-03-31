import { Pressable, ScrollView, Text, View } from 'react-native'
import { FriendItem } from '../friends/ui/friend-item'
import { useAuth } from '@/hooks/useAuth'
import { FriendBody } from '../friends/SuggestionFriends'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
	AntDesign,
	Entypo,
	EvilIcons,
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons
} from '@expo/vector-icons'
import { FC } from 'react'
import { useModalState } from '../friends/search-result/helper/modal/useModalState'
import { ModalButton } from '../friends/search-result/helper/modal/ModalButton'
import { WithCustomLogoutModal } from './ui/with-custom-logout-botton/WithCustomLogoutModal'
import {
	CompositeScreenProps,
	NavigatorScreenParams,
	RouteProp,
	useNavigation
} from '@react-navigation/native'
import {
	NativeStackNavigationProp,
	NativeStackScreenProps
} from '@react-navigation/native-stack'
import {
	RootStackParamList,
	TypeRootStackParamList
} from '@/navigation/navigation.types'
import { LayoutLight } from '@/navigation/ui/LayoutLight'
import { LayoutLightOpacity } from '@/navigation/ui/LayoutLightOpacity'
import { shareProfile } from '@/ui/share-profile/ShareProfile'
import { Invite } from '../friends/ui/Invite'
import { useQueryClient } from '@tanstack/react-query'

//type KeysOfCards = keyof typeof featureComponents.id

type ISettings = NativeStackScreenProps<TypeRootStackParamList, 'Settings'>
//shareProfile
export const Settings: FC<ISettings> = ({ navigation }) => {
	//const { user } = useAuth()
	const queryClient = useQueryClient()
	const userProfile = queryClient.getQueryData(['get-profile'])
	const handleCardPress = (id: KeysOfCard) => {
		if (id === 'memories') navigation.navigate('Memories_settings')
		if (id === 'notifications') navigation.navigate('Notifications')
		if (id === 'privacy') navigation.navigate('Privacy')
		if (id === 'time_zone') navigation.navigate('TimeZone')
		if (id === 'other') navigation.navigate('Other')
		if (id === 'share') shareProfile(String(userProfile?._id))
		if (id === 'rate') return
		if (id === 'help') navigation.navigate('Help')
		if (id === 'about') navigation.navigate('About')
	}
	const { handleModalVisible, modalVisible, userDataForModal } = useModalState()
	return (
		<View className='flex-1'>
			<View className='flex-1 relative'>
				<WithCustomLogoutModal
					modalVisible={modalVisible}
					setModalVisible={() => handleModalVisible('', '', '' as any)}
				/>

				<LayoutLightOpacity
					onGoBack={() => navigation.navigate('Profile')}
					title='Settings'
				>
					<View className='flex-1 bg-w'>
						{!!userProfile && <Invite />}
						<View>
							<HeaderCardComponent text='Features' />
							{featureComponents.map((item, index) => (
								<CardComponent
									icon={item.icon}
									onPress={() => handleCardPress(item.id)}
									text={item.text}
									key={item.id}
									StyleRounded={getStyleToByCardSettings(
										index,
										featureComponents.length - 1
									)}
								/>
							))}
							<HeaderCardComponent text='Settings' />

							{settingsComponents.map((item, index) => (
								<CardComponent
									icon={item.icon}
									key={item.id}
									onPress={() => handleCardPress(item.id)}
									text={item.text}
									StyleRounded={getStyleToByCardSettings(
										index,
										settingsComponents.length - 1
									)}
								/>
							))}
							<HeaderCardComponent text='About' />
							{aboutComponents.map((item, index) => (
								<CardComponent
									icon={item.icon}
									key={item.id}
									onPress={() => handleCardPress(item.id)}
									text={item.text}
									StyleRounded={getStyleToByCardSettings(
										index,
										aboutComponents.length - 1
									)}
								/>
							))}
						</View>
						<ModalButton
							setModalVisible={() =>
								handleModalVisible('', '', 'logout' as any)
							}
							style='bg-zinc-800 p-4 rounded-xl mt-8'
						>
							<Text className='text-center text-red-500 font-bold text-lg'>
								Log out
							</Text>
						</ModalButton>
					</View>
				</LayoutLightOpacity>
			</View>
		</View>
	)
}

const HeaderCardComponent: FC<{ text: string }> = ({ text }) => (
	<Text className='text-zinc-500 font-bold text-lg uppercase my-3'>{text}</Text>
)

type KeysOfCard =
	| 'notifications'
	| 'privacy'
	| 'time_zone'
	| 'other'
	| 'memories'
	| 'share'
	| 'rate'
	| 'help'
	| 'about'
interface ICardComponent {
	icon: JSX.Element
	text: string
	StyleRounded?: string
	onPress: () => void
}

export const ExpoIcons = {
	calendar: <EvilIcons name='calendar' size={24} color='black' />,
	notifications: <Ionicons name='notifications' size={24} color='black' />
}

export const CardComponent: FC<ICardComponent> = ({
	icon,
	text,
	onPress,
	StyleRounded = ''
}) => {
	return (
		<Pressable
			className={`bg-zinc-800 p-3 flex-row items-center ${StyleRounded}`}
			onPress={onPress}
		>
			{icon}
			<Text className='text-white text-2xl font-medium ml-4'>{text}</Text>
		</Pressable>
	)
}

const featureComponents: { id: KeysOfCard; text: string; icon: JSX.Element }[] =
	[
		{
			id: 'memories',
			text: 'Memories',
			icon: <AntDesign name='calendar' size={24} color='white' />
		}
	]
const StyleRounded = {
	top: 'rounded-t-xl',
	bottom: 'rounded-b-xl',
	full: 'rounded-xl'
}
export const StyleBottomLine = 'border-b-[1px] border-solid border-zinc-700'
const settingsComponents: {
	id: KeysOfCard
	text: string
	icon: JSX.Element
}[] = [
	{
		id: 'notifications',
		text: 'Notifications',
		icon: <Ionicons name='notifications' size={24} color='white' />
	},
	{
		id: 'privacy',
		text: 'Privacy',
		icon: <Entypo name='shield' size={29} color='white' />
	},
	{
		id: 'time_zone',
		text: 'Time Zone',
		icon: <Ionicons name='earth' size={24} color='white' />
	},
	{
		id: 'other',
		text: 'Other',
		icon: <MaterialCommunityIcons name='wrench' size={24} color='white' />
	}
]
const aboutComponents: { id: KeysOfCard; text: string; icon: JSX.Element }[] = [
	{
		id: 'share',
		text: 'Share BePrime',
		icon: <Entypo name='share' size={24} color='white' />
	},
	{
		id: 'rate',
		text: 'Rate BePrime',
		icon: <AntDesign name='staro' size={24} color='white' />
	},
	{
		id: 'help',
		text: 'Help',
		icon: <Ionicons name='help-buoy-outline' size={24} color='white' />
	},
	{
		id: 'about',
		text: 'About',
		icon: <AntDesign name='questioncircle' size={24} color='white' />
	}
]

export const getStyleToByCardSettings = (index: number, length: number) => {
	if (index === 0 && index === length) return StyleRounded.full
	if (index === 0) return StyleRounded.top + ' ' + StyleBottomLine
	if (index === length) return StyleRounded.bottom
	return StyleBottomLine
}
