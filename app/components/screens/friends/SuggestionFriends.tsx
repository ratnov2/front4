import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import * as Contacts from 'expo-contacts'

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
					setContactUsers(data)
				}
			}
		})()
	}, [])

	return (
		<View>
			<View>
				<View>
					<Text className='text-white mt-20'>Contacts</Text>
				</View>
				{contactUsers &&
					contactUsers.map((contact, key) => (
						<View className='flex-row my-4 items-center' key={key}>
							<View className='w-14 h-14 bg-red-500 rounded-full text-center items-center  justify-center'>
								<Text className='font-bold text-white text-xl'>
									{contact.firstName?.[0]}
								</Text>
							</View>
							<View className='ml-4 flex-row justify-between flex-1 items-center'>
								<View>
									<Text className='text-white font-bold'>
										{contact.firstName}
									</Text>
									<Text className='text-zinc-600 font-bold'>
										Number Phone isnt
									</Text>
								</View>
								<TouchableOpacity className='bg-gray-800 p-2 rounded-full '>
									<Text className='text-white font-bold'>INVITE</Text>
								</TouchableOpacity>
							</View>
						</View>
					))}
			</View>
		</View>
	)
}
