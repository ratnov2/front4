import { CustomModal } from '@/components/screens/friends/search-result/helper/modal/CustomFriendModal'
import { ModalTextByKey } from '@/components/screens/friends/search-result/helper/modal/modal-texts-data'
import { useAuth } from '@/hooks/useAuth'
import { AuthService } from '@/services/auth/auth.service'
import { FC } from 'react'

interface IWithCustomLogoutModal {
	setModalVisible: (isVisible: boolean) => void
	modalVisible: boolean
}

export const WithCustomLogoutModal: FC<IWithCustomLogoutModal> = ({
	setModalVisible,
	modalVisible
}) => {
	const { setUser } = useAuth()
	const handleLogout = () => {
		setModalVisible(false)
		AuthService.logout().then(() => setUser(null))
	}
	const text = ModalTextByKey('', 'logout')

	return (
		<CustomModal
			onConfirm={handleLogout}
			text={text}
			modalVisible={modalVisible}
			setModalVisible={setModalVisible}
		/>
	)
}
