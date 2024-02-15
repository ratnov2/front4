import {
	Image,
	Pressable,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { FriendItem } from '../friends/ui/friend-item'
import { useAuth } from '@/hooks/useAuth'
import { FriendBody } from '../friends/SuggestionFriends'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons'
import { FC } from 'react'
import { Icon } from '@expo/vector-icons/build/createIconSet'
import { useNavigation } from '@react-navigation/native'
import { AuthService } from '@/services/auth/auth.service'
import { CustomFriendModal } from '../friends/search-result/helper/modal/CustomFriendModal'
import { useModalState } from '../friends/search-result/helper/modal/useModalState'
import { ModalButton } from '../friends/search-result/helper/modal/ModalButton'

export const Settings = () => {
	const { user, setUser } = useAuth()
	const insets = useSafeAreaInsets()
	const navigate = useNavigation()
	const handleCardPress = (id: string) => {
		console.log(`Card pressed with ID: ${id}`)
	}
	const { handleModalVisible, modalVisible, userDataForModal } = useModalState()
	return (
		<View className='flex-1 relative'>
			<CustomFriendModal
				modalVisible={modalVisible}
				setModalVisible={() => handleModalVisible('', '', '' as any)}
				userData={userDataForModal}
			/>
			<View
				className='absolute flex-row'
				style={{ top: insets.top, zIndex: 1000 }}
			>
				<Pressable onPress={navigate.goBack}>
					<FontAwesome name='long-arrow-left' size={24} color='white' />
				</Pressable>
				<Text className='text-white'>Settings</Text>
			</View>
			{user && (
				<ScrollView
					className='flex-1 relative'
					style={{ paddingTop: insets.top + 50 }}
				>
					<View>
						<FriendItem
							styles={'mb-4 p-2'}
							avatar={user.avatar}
							name={user.firstName}
							body={<FriendBody name={user.firstName} number='3' />}
							avatarType='big'
						/>
					</View>
					<View>
						{featureComponents.map((item, index) => (
							<CardComponent
								image={''}
								onPress={() => handleCardPress(item.id)}
								text={item.text}
								key={item.id}
								StyleRounded={getStyleToByCardSettings(
									index,
									featureComponents.length - 1
								)}
							/>
						))}
						<View className='mt-4' />
						{settingsComponents.map((item, index) => (
							<CardComponent
								image={''}
								key={item.id}
								onPress={() => handleCardPress(item.id)}
								text={item.text}
								StyleRounded={getStyleToByCardSettings(
									index,
									settingsComponents.length - 1
								)}
							/>
						))}
						<View className='mt-4' />
						{aboutComponents.map((item, index) => (
							<CardComponent
								image={''}
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
						setModalVisible={() => handleModalVisible('', '', 'logout' as any)}
						text='Logout'
					/>
					{/* <TouchableOpacity
						onPress={() => AuthService.logout().then(() => setUser(null))}
						className='mt-8 items-center flex-row justify-center bg-zinc-800 rounded-2xl p-3'
					>
						<Text className='text-red-500 text-2xl font-medium ml-2'>
							Logout
						</Text>
					</TouchableOpacity> */}
				</ScrollView>
			)}
		</View>
	)
}

interface ICardComponent {
	image: any
	text: string
	StyleRounded?: string
	onPress: () => void
}

export const ExpoIcons = {
	calendar: <EvilIcons name='calendar' size={24} color='black' />,
	notifications: <Ionicons name='notifications' size={24} color='black' />
}

const CardComponent: FC<ICardComponent> = ({
	image,
	text,
	onPress,
	StyleRounded = ''
}) => {
	return (
		<Pressable
			className={`bg-zinc-800 p-3 flex-row items-center ${StyleRounded}`}
			onPress={onPress}
		>
			<EvilIcons name='calendar' size={36} color='white' />
			<Text className='text-white text-2xl font-medium ml-4'>{text}</Text>
		</Pressable>
	)
}
const featureComponents = [
	{
		id: 'like',
		text: 'Like'
	}
]
const StyleRounded = {
	top: 'rounded-t-xl',
	bottom: 'rounded-b-xl',
	full: 'rounded-xl'
}
const StyleBottomLine = 'border-b-[1px] border-solid border-zinc-700'
const settingsComponents = [
	{
		id: 'notifications',
		text: 'Notifications'
	},
	{
		id: 'Privacy',
		text: 'Privacy'
	},
	{
		id: 'time_zone',
		text: 'Time Zone'
	},
	{
		id: 'other',
		text: 'Other'
	}
]
const aboutComponents = [
	{
		id: 'share',
		text: 'Share BePrime'
	},
	{
		id: 'rate',
		text: 'Rate BePrime'
	},
	{
		id: 'help',
		text: 'Help'
	},
	{
		id: 'about',
		text: 'About'
	}
]

const getStyleToByCardSettings = (index: number, length: number) => {
	if (index === 0 && index === length) return StyleRounded.full
	if (index === 0) return StyleRounded.top + ' ' + StyleBottomLine
	if (index === length) return StyleRounded.bottom
	return StyleBottomLine
}
