import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
// import { ProfileHeader } from './header/Header'
import { MainProfile } from './main/MainProfile'
import { CalendarMin } from './calendar-min/CalendarMin'
import { useNavigation, useRoute } from '@react-navigation/native'
import { OtherUserProfile } from './other-user/OtherUserProfile'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { LayoutOpacityItems } from '@/navigation/ui/LayoutOpacityItems'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { LayoutLightOpacityOtherProfile } from '@/navigation/ui/LayoutLightOpacityOtherProfile'
import { useGetData } from '@/navigation/useGetData'
//import { useNotifications } from './PERMISSIONS/Notefications'

type IProfile = NativeStackScreenProps<TypeRootStackParamList, 'Profile'>

export const HeaderProfile = () => {
	const { navigate } = useNavigation<any>()
	const { user } = useAuth()
	return (
		<View className='flex-row justify-between flex-1 items-center'>
			<TouchableOpacity onPress={() => navigate('Home')}>
				<AntDesign name='arrowleft' size={30} color='white' />
			</TouchableOpacity>
			<Text className='text-white '>{user?.email}</Text>
			<TouchableOpacity onPress={() => navigate('Settings')}>
				<Entypo name='dots-three-vertical' size={24} color='white' />
			</TouchableOpacity>
		</View>
	)
}
const Profile: FC<IProfile> = ({ navigation }) => {
	const { user } = useAuth()
	let { params } = useRoute<any>()
	useGetData()
	return (
		<View className='flex-1'>
			{user && (
				<View className='flex-1'>
					{(params as { id: string })?.id !== user._id &&
					(params as { id: string })?.id ? (
						<LayoutLightOpacityOtherProfile
							onGoBack={() => navigation.navigate('Home')}
							title={'be-prime'}
						>
							<OtherUserProfile />
						</LayoutLightOpacityOtherProfile>
					) : (
						<LayoutOpacityItems ComponentRender={<HeaderProfile />}>
							<View className='flex-1'>
								<MainProfile />
								<CalendarMin />
							</View>
						</LayoutOpacityItems>
					)}
				</View>
			)}
		</View>
	)
}

export default Profile
