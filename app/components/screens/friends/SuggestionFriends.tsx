import { FC, useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import * as Contacts from 'expo-contacts'
import { FriendItem } from './ui/friend-item'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ContactContext } from '@/providers/contacts/ContactsDataProvider'
import { WithShareProfile } from '@/ui/share-profile/WithShareProfile'

export const SuggestionFriends = () => {
	const { contact } = useContext(ContactContext)
	const [contactUsers, setContactUsers] = useState(contact)

	useEffect(() => {
		;(async () => {
			const { status } = await Contacts.requestPermissionsAsync()
			if (status === 'granted') {
				const { data } = await Contacts.getContactsAsync({
					fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers]
				})
				if (data.length > 0) {
					setContactUsers(data)
					AsyncStorage.setItem('cachedContacts', JSON.stringify(data))
				}
			}
		})()
	}, [])

	return (
		<View>
			<View>
				<View>
					<Text className='text-white mt-20 text-xl font-bold uppercase mb-6'>
						Contacts
					</Text>
				</View>
				{contactUsers &&
					contactUsers.map((contact, key) => (
						<FriendItem
							name={contact.firstName || 'Anonym'}
							body={
								<FriendBody
									name={contact.firstName || 'Anonym'}
									number={contact.phoneNumbers?.[0].number || 'unknown'}
								/>
							}
							key={key}
							buttons={<InviteButton />}
							styles='bg-transparent p-0 mb-5'
						/>
					))}
			</View>
		</View>
	)
}

interface IFriendBody {
	name: string
	number: string
}
export const FriendBody: FC<IFriendBody> = ({ name, number }) => (
	<View>
		<Text className='text-white text-lg font-bold'>{name || 'Anonym'}</Text>
		{/* <Text className='text-stone-400 font-bold '>{number}</Text> */}
	</View>
)

export const InviteButton = () => {
	return (
		<WithShareProfile>
			<View className='bg-zinc-700 p-2 rounded-full uppercase'>
				<Text className='text-white font-bold'>Invite</Text>
			</View>
		</WithShareProfile>
	)
}
