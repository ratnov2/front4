import { useState } from 'react'

export const useModalState = () => {
	const [userDataForModal, setUserDataForModal] = useState({
		username: '',
		friendId: '',
		status: '' as '0' | '1' | '2' | '3'
	})
	const [modalVisible, setModalVisible] = useState(false)
	const handleModalVisible = (
		username: string,
		friendId: string,
		status: '0' | '1' | '2' | '3'
	) => {
		const newUserData = { username, friendId, status }
		setUserDataForModal({ ...newUserData })
		setModalVisible(!modalVisible)
	}
	
	return { modalVisible, handleModalVisible, userDataForModal }
}
