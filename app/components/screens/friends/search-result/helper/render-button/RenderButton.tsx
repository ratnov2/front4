import { TypeUserState } from '@/providers/auth/auth-provider.interface'
import { IGetUserByName } from '@/services/friends/friends.service'

import { ModalButton } from '../modal/ModalButton'
import { ItsMeButton } from './RenderButtons'
import { HandleFriendButton } from './HandleFriendButton'

export const RenderButton = (
	usersByName: IGetUserByName,
	user: TypeUserState,
	handleModalVisible: (
		firstName: string,
		id: string,
		status: '0' | '1' | '2' | '3'
	) => void
) => {
	if (usersByName._id === user?._id) {
		return <ItsMeButton />
	}

	if (usersByName.friendship === null || usersByName.friendship.length === 0) {
		return (
			<HandleFriendButton
				title='Add friend'
				id={usersByName._id}
				status='1'
				loading
			/>
		)
	}
	const status = usersByName.friendship[0]?.status

	if (status === '2') {
		return (
			<ModalButton
				setModalVisible={() =>
					handleModalVisible(usersByName.firstName, usersByName._id, '1')
				}
				text='request is sented'
			/>
		)
	}

	if (status === '1') {
		return (
			<HandleFriendButton
				title='Accept friend'
				id={usersByName._id}
				status='3'
				loading
			/>
		)
	}

	if (status === '3') {
		return (
			<ModalButton
				setModalVisible={() =>
					handleModalVisible(usersByName.firstName, usersByName._id, '3')
				}
				text='Delete friend'
			/>
		)
	}

	return null
}
