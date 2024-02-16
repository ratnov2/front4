import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { LayoutLight } from '@/navigation/ui/LayoutLight'
import { Entypo, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { Link } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Component, FC, useEffect, useState } from 'react'
import { Switch, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Contacts from 'expo-contacts'
import AsyncStorage from '@react-native-async-storage/async-storage'
type INotifications = NativeStackScreenProps<TypeRootStackParamList, 'Privacy'>

export const Privacy: FC<INotifications> = ({ navigation }) => {
	const insets = useSafeAreaInsets()
	const privacyItemInfo = [
		{
			id: 'blocked',
			title: 'Blocked users',
			icon: <Entypo name='block' size={29} color='white' />
		},
		{
			id: 'Hidden Users',
			title: 'Hidden users',
			icon: <Feather name='eye-off' size={29} color='white' />
		}
	]
	const privacyItemInfoWithSwitch = [
		{
			id: 'connect',
			title: 'Connect your friends',
			addedTitle: <ConnectAddedInfo />,
			icon: <FontAwesome5 name='users' size={29} color='white' />
		},
		{
			id: 'find',
			title: 'Find me by my phone number',
			addedTitle: <FindAddedInfo />,
			icon: <Entypo name='shield' size={29} color='white' />
		},
		{
			id: 'Contact sync',
			title: 'Contact sync',
			addedTitle: <ContactSyncAddedInfo />,
			icon: <Ionicons name='sync' size={29} color='white' />
		}
	]
	const [status, setStatus] = useState('granted')

	const handleItem = (id: string) => {
		if (id === 'find') {
			setStatus
		}
	}

	return (
		<LayoutLight
			onGoBack={() => navigation.navigate('Settings')}
			title='Privacy'
		>
			{privacyItemInfo.map(item => (
				<ItemView title={item.title} icon={item.icon} />
			))}
			{privacyItemInfoWithSwitch.map(item => (
				<ItemViewWithSwitch
					addedTitle={item.addedTitle}
					title={item.title}
					icon={item.icon}
				/>
			))}
		</LayoutLight>
	)
}

const ContactSyncAddedInfo = () => {
	return (
		<View className='flex-row'>
			<Text className='text-white'>
				Contact syncing gives you friends o suggestions from your phone's
				contacts.{' '}
				<Link to={'/www.google.com'}>
					<Text className='text-white font-medium'>Learn more here.</Text>
				</Link>
			</Text>
		</View>
	)
}
const FindAddedInfo = () => {
	return (
		<View className='flex-row'>
			<Text className='text-white'>
				Letting others find you by your phone number allows friends to find you
				using your phone number.{' '}
				<Link to={'/www.google.com'}>
					<Text className='text-white font-medium'>Learn more here.</Text>
				</Link>
			</Text>
		</View>
	)
}
const ConnectAddedInfo = () => {
	return (
		<View className='flex-row'>
			<Text className='text-white'>
				When enabled, your friends will be able to see each other thanks to you.
			</Text>
		</View>
	)
}

interface IItemView {
	addedTitle?: React.JSX.Element
	title: string
	icon: React.JSX.Element
}
export const ItemView: FC<IItemView> = ({ addedTitle, title, icon }) => {
	return (
		<View className='mb-4 '>
			<View className='flex-row justify-between items-center bg-zinc-800 p-3 rounded-xl '>
				<View className='flex-row items-center w-[70%] mr-10'>
					{icon}
					<Text className='text-white font-bold text-xl ml-2'>{title}</Text>
				</View>
			</View>
			<View className='mt-2'>{addedTitle}</View>
		</View>
	)
}
interface IItemViewWithSwitch {
	addedTitle?: React.JSX.Element
	title: string
	icon: React.JSX.Element
}
export const ItemViewWithSwitch: FC<IItemViewWithSwitch> = ({
	addedTitle = <View />,
	title,
	icon
}) => {
	const [isEnabled, setIsEnabled] = useState(false)
	const toggleSwitch = () => setIsEnabled(previousState => !previousState)
	return (
		<View className='mb-4 '>
			<View className='flex-row justify-between items-center bg-zinc-800 p-3 rounded-xl '>
				<View className='flex-row items-center w-[70%] mr-10'>
					{icon}
					<Text className='text-white font-bold text-xl ml-2'>{title}</Text>
				</View>
				<Switch
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
					ios_backgroundColor='#3e3e3e'
					onValueChange={toggleSwitch}
					value={isEnabled}
				/>
			</View>
			<View className='mt-2'>{addedTitle}</View>
		</View>
	)
}
