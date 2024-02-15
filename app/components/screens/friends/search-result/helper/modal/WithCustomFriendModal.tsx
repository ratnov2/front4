import { FC } from 'react'
import { useMutateAddFriend } from '../hooks/useMutataAddFriend'
import { CustomModal } from './CustomFriendModal'
import { ModalTextByKey } from './modal-texts-data'
import { useModalState } from './useModalState'

interface IWithCustomFriendModal {
	userData: {
		username: string
		friendId: string
		status: '0' | '1' | '2' | '3'
	}
	setModalVisible: (isVisible: boolean) => void
	modalVisible: boolean
}

export const WithCustomFriendModal: FC<IWithCustomFriendModal> = ({
	userData,
	setModalVisible,
	modalVisible
}) => {
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

	const text = ModalTextByKey(userData.username, userData.status)

	return (
		<CustomModal
			isLoading={isLoading}
			onConfirm={handleAddFriend}
			text={text}
			modalVisible={modalVisible}
			setModalVisible={setModalVisible}
		/>
	)
}
