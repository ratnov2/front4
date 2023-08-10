import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { useNavigation, NavigationProp } from '@react-navigation/native'

export const useTypedNavigation = () =>
	useNavigation<NavigationProp<TypeRootStackParamList>>()
