import { Ionicons } from '@expo/vector-icons'
import { Link } from '@react-navigation/native'
import { Component, FC, useState } from 'react'
import { Switch, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const Privacy = () => {
	const insets = useSafeAreaInsets()
    const privacyLightInfo = []
	const privacyItemInfo = [
		{
			id: 'blocked',
			title: 'Blocked users'
		},
		{ id: 'Hidden Users', title: 'Blocked users' },
		{
			id: 'connect',
			title: 'Connect your friends',
			addedTitle: <ConnectAddedInfo />
		},
		{
			id: 'find',
			title: 'Find me by my phone number',
			addedTitle: <FindAddedInfo />
		},
		{
			id: 'Contact sync',
			title: 'Contact sync',
			addedTitle: <ContactSyncAddedInfo />
		}
	]
	return (
		<View style={{ marginTop: insets.top + 50 }} className='mx-2 flex-1'>
			{privacyItemInfo.map(item => (
				<ItemView
					isSwitch={!!item.addedTitle}
					addedTitle={item.addedTitle}
					title={item.title}
				/>
			))}
			{/* <ItemView /> */}

			{/* <ContactSyncAddedInfo /> */}
		</View>
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
	isSwitch?: boolean
	addedTitle?: React.JSX.Element
	title: string
}

const ItemView: FC<IItemView> = ({ isSwitch, addedTitle, title }) => {
	const [isEnabled, setIsEnabled] = useState(false)
	const toggleSwitch = () => setIsEnabled(previousState => !previousState)
	return (
		<View className='mb-4 '>
			<View className='flex-row justify-between items-center bg-zinc-800 p-2 rounded-xl '>
				<View className='flex-row items-center  w-[70%] mr-10'>
					<Ionicons name='sync' size={34} color='white' />
					<Text className='text-white font-bold text-xl ml-2'>{title}</Text>
				</View>
				{isSwitch && (
					<Switch
						trackColor={{ false: '#767577', true: '#81b0ff' }}
						thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
						ios_backgroundColor='#3e3e3e'
						onValueChange={toggleSwitch}
						value={isEnabled}
					/>
				)}
			</View>
			<View className='mt-2'>{addedTitle}</View>
		</View>
	)
}
