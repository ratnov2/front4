import { FriendsService } from '@/services/friends/friends.service'
import { Link, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const Friends = () => {
	const insets = useSafeAreaInsets()
	// const suggestions = useQuery(['get-suggestion']()=>'') TASK ADD suggestion
	const myFriends = useQuery(['get-my-friends'], () =>
		FriendsService.getAllFriends()
	)
	const { params } = useRoute()
	const [typeFriend, setTypeFriend] = useState<
		'suggestion' | 'friends' | 'requests'
	>('friends')
	useEffect(() => {
		if (!myFriends.isLoading) {
			myFriends.refetch()
		}
	}, [typeFriend])

	return (
		<View className='flex-1'>
			<Text
				className='text-white text-2xl font-bold text-center left-0 right-0'
				style={{ top: insets.top, position: 'absolute' }}
			>
				BePrime
			</Text>
			<View className='mx-4' style={{ marginTop: insets.top + 50 }}>
				<TextInput
					className='bg-zinc-800 p-4 rounded-2xl'
					placeholder='Add or search friends'
				/>
			</View>
			<View
				className='bg-slate-800 rounded-full p-3 flex-row justify-between items-center'
				style={{
					alignSelf: 'center',
					position: 'absolute',
					bottom: insets.bottom
				}}
			>
				<TouchableOpacity
					className={`${
						typeFriend === 'suggestion' && 'bg-slate-500'
					} p-2 rounded-full`}
					onPress={() => setTypeFriend('suggestion')}
				>
					<Text className='text-white'>Suggestion</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className={`${
						typeFriend === 'friends' && 'bg-slate-500'
					} p-2 rounded-full ml-1`}
					onPress={() => setTypeFriend('friends')}
				>
					<Text className='text-white'>Friends</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className={`${
						typeFriend === 'requests' && 'bg-slate-500'
					} p-2 rounded-full ml-1`}
					onPress={() => setTypeFriend('requests')}
				>
					<Text className='text-white'>Requests</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
