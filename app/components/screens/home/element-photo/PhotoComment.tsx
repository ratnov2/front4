import { useAuth } from '@/hooks/useAuth'
import { BaseImageUrl } from '@/services/api/interceptors.api'
import { Link, useNavigation } from '@react-navigation/native'
import { FC, useReducer, useRef, useState } from 'react'
import {
	ActivityIndicator,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import userPng from '@/assets/user.png'
import { MaterialIcons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import { ILatestPhoto } from '@/shared/types/profile.interface'
import DismissKeyboard from '@/ui/form-elements/field/DismissKeyboard'

interface IElementPhoto {
	photo: ILatestPhoto
	refetch: () => void
}

export type BaseExampleProps = {
	className?: string
}

type State = {
	frontPhoto?:
		| {
				created: Date
				photo: string
				locate: string
		  }
		| undefined
	backPhoto?:
		| {
				created: Date
				photo: string
				locate: string
		  }
		| undefined
	length: 0 | 1 | 2
	current: null | 'frontPhoto' | 'backPhoto'
}

type Action = {
	type: null | 'frontPhoto' | 'backPhoto'
}

const reducer = (state: State, action: Action): State => {
	const { type } = action
	switch (type) {
		case 'frontPhoto':
			return { ...state, current: 'backPhoto' }
		case 'backPhoto':
			return { ...state, current: 'frontPhoto' }
		default:
			return state
	}
}

const ShareImageUrl = (photo?: string) => `${BaseImageUrl}${photo}`

const UnCurrent = (type: 'frontPhoto' | 'backPhoto' | null) => {
	if (type === 'frontPhoto') return 'backPhoto'
	else return 'frontPhoto'
}

export const PhotoComment: FC<IElementPhoto> = ({ photo }) => {
	const navigate = useNavigation()
	const { user } = useAuth()

	const photosUser = photo.calendarPhotos?.photos
	const [store, dispatch] = useReducer(
		reducer,
		(() => {
			const result: State = {
				current: null,
				length: 0
			}
			if (photosUser.frontPhoto?.photo) {
				result.frontPhoto = photosUser.frontPhoto
				result.current = 'frontPhoto'
				result.length++
			}
			if (photosUser.backPhoto?.photo) {
				result.backPhoto = photosUser.backPhoto
				if (result.current !== 'frontPhoto') result.current = 'backPhoto'
				result.length++
			}

			return result
		})()
	)

	const [value, setValue] = useState(photo.calendarPhotos.comment)
	const [isMessage, setIsMessage] = useState(false)
	//console.log(photo.calendarPhotos)

	// console.log(photo)

	return (
		<View style={{ marginBottom: 70 }}>
			{photo && (
				<View style={{ flex: 1 }}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							marginBottom: 10
						}}
					>
						<View>
							<Link
								to={`/Profile${
									user?._id !== photo._id ? `?id=${photo._id}` : ''
								}`}
							>
								<Image
									source={userPng}
									style={{
										width: 30,
										height: 30,
										backgroundColor: '#fff',
										borderRadius: 100
									}}
								/>
							</Link>
						</View>
						<Text style={{ marginLeft: 10 }} className='text-white'>
							{photo.name || 'Anonym'}
						</Text>
					</View>
					<View style={{ aspectRatio: 9 / 16 }} className='relative'>
						<Image
							className='rounded-2xl'
							style={{
								resizeMode: 'cover',
								flex: 1,
								borderRadius: 20
							}}
							source={{
								uri: ShareImageUrl(store[store.current || 'backPhoto']?.photo)
							}}
						/>
						{store.length === 2 && (
							<TouchableOpacity
								className='absolute left-4 top-4 border-2 border-solid border-stone-900 rounded-xl overflow-hidden'
								onPress={() => dispatch({ type: store.current })}
							>
								<View className=''>
									<Image
										className='w-28 h-32  '
										source={{
											uri: ShareImageUrl(store[UnCurrent(store.current)]?.photo)
										}}
									/>
								</View>
							</TouchableOpacity>
						)}
					</View>
				</View>
			)}

			<TouchableOpacity
				className='text-center rounded-xl flex-row items-center justify-center mt-5 '
				onPress={() => {
					setIsMessage(false)
					navigate.navigate({
						name: 'Comments' as any,
						params: {
							_id: photo._id,
							created: photo.calendarPhotos.created
						}
					} as never)
				}}
			>
				{/* <Link
					to={`/Comments?_id=${photo._id}?created='2022-10-10'`}
					className='items-center flex-row block '
				> */}
				{/* </Link> */}
			</TouchableOpacity>
		</View>
	)
}
