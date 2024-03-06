import { Text, TouchableOpacity } from 'react-native'

import { ActivityIndicator } from 'react-native'
import { useMutateAddFriend } from '../hooks/useMutataAddFriend'

export const HandleFriendButton = ({
	title,
	id,
	status,
	req = true
}: {
	handleFriend?: () => void
	title: string
	loading: boolean
	id: string
	status: '0' | '1' | '2' | '3'
	req?: boolean
}) => {
	const { addFriend, isLoading, setIsLoading } = useMutateAddFriend(id, status)

	return (
		<TouchableOpacity
			className={`bg-zinc-700 p-2 rounded-full uppercase  ${
				status === '3' && 'bg-yellow-400'
			}`}
			onPress={() => {
				setIsLoading(true)
				addFriend.mutate({ friendId: id, status })
			}}
		>
			{!isLoading ? (
				<Text className='text-white font-bold text-center'>{title}</Text>
			) : (
				<ActivityIndicator size={'small'} className='w-16' />
			)}
		</TouchableOpacity>
	)
}
