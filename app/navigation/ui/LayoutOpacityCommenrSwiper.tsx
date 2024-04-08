//import { normalDate } from '@/components/screens/comments/CommentElement'
import {
	ProfileService,
	TypeUpdateFavoritePhoto
} from '@/services/profile/profile.service'
import { IProfile } from '@/shared/types/profile.interface'
import { shareProfile } from '@/ui/share-profile/ShareProfile'
import {
	AntDesign,
	Entypo,
	Feather,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons
} from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LinearGradient } from 'expo-linear-gradient'

import { FC, ReactNode, useEffect, useState } from 'react'
import {
	ActivityIndicator,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ILayoutOpacityComment {
	children: ReactNode
	created: string
	index: number
}

export const LayoutOpacityComment: FC<ILayoutOpacityComment> = ({
	children,
	created,
	index
}) => {
	const insets = useSafeAreaInsets()
	const { navigate } = useNavigation<any>()
	const updateFavoritePhoto = useMutation(
		['update-favorite-photo-calendar'],
		(data: TypeUpdateFavoritePhoto) => ProfileService.updateFavoritePhoto(data),
		{
			onSuccess: () => {
				profile.refetch()
			}
		}
	)
	const profile = useQuery<IProfile>(['get-profile'])
	const [isPinsPhoto, setIsPinsPhoto] = useState(
		(() => {
			const isPins =
				profile.data?.favoritePhotos.photoOne?.created === created ||
				profile.data?.favoritePhotos.photoTwo?.created === created ||
				profile.data?.favoritePhotos.photoThree?.created === created
			return isPins
		})()
	)
	useEffect(() => {
		const isPins = () => {
			const isPins =
				profile.data?.favoritePhotos.photoOne?.created === created ||
				profile.data?.favoritePhotos.photoTwo?.created === created ||
				profile.data?.favoritePhotos.photoThree?.created === created
			return isPins
		}

		setIsPinsPhoto(isPins())
	}, [profile.data])

	//console.log(JSON.stringify(profile.data?.favoritePhotos))
	const { params } = useRoute<any>()
	console.log(params?.typePhoto)

	return (
		<View className='flex-1 relative'>
			<View>{children}</View>
			<View
				style={{ top: insets.top, zIndex: 10000000000 }}
				className='flex-row items-center absolute w-full'
			>
				<View className='flex-row flex-1 relative justify-between'>
					<View className='absolute w-full flex-row justify-center '>
						<View>
							<NormalDate created={created} />
						</View>
					</View>
					<TouchableOpacity onPress={() => navigate('Profile')}>
						<Feather name='arrow-left' size={30} color='white' />
					</TouchableOpacity>
					<View className='flex-row'>
						{!updateFavoritePhoto.isLoading ? (
							<TouchableOpacity
								onPress={() =>
									updateFavoritePhoto.mutate({
										key:
											(params?.['pin' as keyof typeof params] as unknown as
												| 'photoOne'
												| 'photoTwo'
												| 'photoThree') || 'photoOne',
										frontPhoto:
											profile.data?.calendarPhotos[index].photos.frontPhoto
												?.photo || '',
										backPhoto:
											profile.data?.calendarPhotos[index].photos.backPhoto
												?.photo || '',
										created: profile.data?.calendarPhotos[index].created || ''
									})
								}
								disabled={updateFavoritePhoto.isLoading}
							>
								{!isPinsPhoto ? (
									<MaterialIcons name='push-pin' size={30} color='white' />
								) : (
									<MaterialCommunityIcons
										name='pin-off'
										size={30}
										color='white'
									/>
								)}
							</TouchableOpacity>
						) : (
							<ActivityIndicator />
						)}
						<TouchableOpacity onPress={() => navigate('Home')}>
							<Entypo name='dots-three-vertical' size={24} color='white' />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	)
}
export const NormalDate = ({ created }: { created: string }) => {
	const date = new Date(created)

	return (
		<View>
			<Text className='text-white text-xl font-bold'>
				{date.toLocaleString('ru', { month: 'long' })} {date.getDate()}
				{', '}
				{date.getFullYear()}
			</Text>
			<Text className='text-center text-gray-400'>
				{NormalizeDate(date.getHours())} : {NormalizeDate(date.getMinutes())}
			</Text>
		</View>
	)
}
const NormalizeDate = (number: number) => {
	return number < 10 ? `0${number}` : number
}
