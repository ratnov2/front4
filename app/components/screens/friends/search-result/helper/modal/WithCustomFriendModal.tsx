import { useMutateAddFriend } from "../hooks/useMutataAddFriend"

export const WithCustomFriendModal = () => {
	const { addFriend, isLoading, setIsLoading } = useMutateAddFriend(
		userData.friendId,
		userData.status
	)
	const handleAddFriend = () => {
		setIsLoading(true)
		addFriend.mutate({
			friendId: userData.friendId,
			status: '0'
		})
		setModalVisible(false)
	}
}
