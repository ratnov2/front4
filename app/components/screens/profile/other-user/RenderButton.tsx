import { TypeUserState } from '@/providers/auth/auth-provider.interface'
import { IGetUserByName } from '@/services/friends/friends.service'
import { ModalButton } from '../../friends/search-result/helper/modal/ModalButton'
import { HandleFriendButton } from '../../friends/search-result/helper/render-button/HandleFriendButton'

export const RenderButton = (
	friendStatus: string | null,
	user: IGetUserByName,
	handleModalVisible: (
		firstName: string,
		id: string,
		status: '0' | '1' | '2' | '3'
	) => void
) => {
	if (friendStatus === null) {
		return (
			<HandleFriendButton title='Add friend' id={user._id} status='1' loading />
		)
	}

	if (friendStatus === '1') {
		return (
			<ModalButton
				setModalVisible={() =>
					handleModalVisible(user.firstName, user._id, '1')
				}
				text='request is sented'
			/>
		)
	}

	if (friendStatus === '2') {
		return (
			<HandleFriendButton
				title='Accept friend'
				id={user._id}
				status='3'
				loading
			/>
		)
	}

	if (friendStatus === '3') {
		return (
			<ModalButton
				setModalVisible={() =>
					handleModalVisible(user.firstName, user._id, '3')
				}
				text='Delete friend'
			/>
		)
	}

	return null
}
