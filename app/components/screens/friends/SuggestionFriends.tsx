import { FC, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import * as Contacts from 'expo-contacts'
import { FriendItem } from './ui/friend-item'

export const SuggestionFriends = () => {
	const [contactUsers, setContactUsers] = useState<Contacts.Contact[]>()
	useEffect(() => {
		;(async () => {
			const { status } = await Contacts.requestPermissionsAsync()
			if (status === 'granted') {
				const { data } = await Contacts.getContactsAsync({
					fields: [Contacts.Fields.Emails]
				})

				if (data.length > 0) {
					//console.log(data);

					setContactUsers(data)
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
						// <View className='flex-row my-4 items-center' key={key}>
						// 	<View className='w-14 h-14 bg-red-500 rounded-full text-center items-center  justify-center'>
						// 		<Text className='font-bold text-white text-xl'>
						// 			{contact.firstName?.[0]}
						// 		</Text>
						// 	</View>
						// 	<View className='ml-4 flex-row justify-between flex-1 items-center'>
						// 		<View>
						// 			<Text className='text-white font-bold'>
						// 				{contact.firstName}
						// 			</Text>
						// 			<Text className='text-zinc-600 font-bold'>
						// 				Number Phone isnt
						// 			</Text>
						// 		</View>
						// 		<TouchableOpacity className='bg-gray-800 p-2 rounded-full '>
						// 			<Text className='text-white font-bold'>INVITE</Text>
						// 		</TouchableOpacity>
						// 	</View>
						// </View>
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
		<Text className='text-stone-400 font-bold '>{number}</Text>
	</View>
)

export const InviteButton = ({ deleteFriend }: { deleteFriend: () => void }) => {
	return (
		<TouchableOpacity className='bg-zinc-700 p-2 rounded-full uppercase'>
			<Text className='text-white font-bold'>Invite</Text>
		</TouchableOpacity>
	)
}
