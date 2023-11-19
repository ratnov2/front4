import { useAuth } from '@/hooks/useAuth'
import { BaseImageUrl } from '@/services/api/interceptors.api'
import { Link } from '@react-navigation/native'
import { FC, useRef, useState } from 'react'
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

export const ElementPhoto: FC<IElementPhoto> = ({ photo, refetch }) => {
	const { user } = useAuth()
	const photoStr = `${BaseImageUrl}${photo.calendarPhotos.photo}`
	const [value, setValue] = useState(photo.calendarPhotos.comment)
	const [isMessage, setIsMessage] = useState(false)
	const addMainComment = useMutation(
		['add-main-comment'],
		(data: { message: string; link: string }) =>
			ProfileService.addMainComment(data),
		{
			onSuccess: () => {
				setIsMessage(false)
				refetch()
			}
		}
	)

	return (
		<View className='' style={{ marginBottom: 70 }}>
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
					<Image
						className='rounded-2xl'
						style={{
							resizeMode: 'cover',
							flex: 1,
							aspectRatio: 9 / 16,
							borderRadius: 20
						}}
						source={{
							uri: photoStr
						}}
						// source={{
						// 	uri: 'https://sun9-23.userapi.com/impf/c636420/v636420339/2f8/mEInMCYFfUI.jpg?size=640x512&quality=96&sign=34a9d640a547d663a0f0e55ef2aa4f40&c_uniq_tag=XAjjwBc58g9NQ16xv9-345VibwQmIFlYxdNvG9hr-DY&type=album'
						// }}
					/>
				</View>
			)}
			{user?._id === photo._id ? (
				!isMessage ? (
					<TouchableOpacity
						onPress={() => {
							setIsMessage(true)
						}}
					>
						<Text className='text-white mt-4'>
							{photo.calendarPhotos.comment || 'Anonym'}
						</Text>
					</TouchableOpacity>
				) : (
					<View>
						<View
							className={`flex-row items-center mt-4 border-[1px] border-solid border-stone-700 rounded-lg ${
								addMainComment.isLoading && 'bg-stone-900 text-stone-800'
							}`}
							onPointerDown={() => console.log('@@@')}
						>
							<TextInput
								value={value}
								onChangeText={e => setValue(e)}
								className={`p-2 rounded-lg flex-1 color-white ${
									addMainComment.isLoading && ' text-stone-600'
								}`}
								pointerEvents={addMainComment.isLoading ? 'none' : 'auto'}
								placeholder='input text'
								keyboardType='default'
								onBlur={() => setIsMessage(false)}
							/>

							{!addMainComment.isLoading ? (
								<TouchableOpacity
									className='mx-2'
									onPress={() => {
										addMainComment.mutate({
											message: value,
											link: photo.calendarPhotos.photo
										})
									}}
								>
									<MaterialIcons name='send' size={24} color='white' />
								</TouchableOpacity>
							) : (
								<ActivityIndicator className='mx-2' size={24} color='white' />
							)}
						</View>
						<TouchableOpacity
							className='bg-cyan-400 text-center rounded-xl'
							onPress={() => setIsMessage(false)}
						>
							<Text className='text-stone-950 text-center p-2 font-bold'>
								Close
							</Text>
						</TouchableOpacity>
					</View>
				)
			) : (
				<View>
					<Text className='text-white mt-4'>
						{photo.calendarPhotos.comment || 'Anonym'}
					</Text>
				</View>
			)}
			<TouchableOpacity
				className='text-center rounded-xl flex-row items-center justify-center mt-5'
				onPress={() => setIsMessage(false)}
			>
				<MaterialIcons name='comment' size={24} color='white' />
				<Text className='text-white text-center p-2 font-bold'>
					Add comments
				</Text>
			</TouchableOpacity>
		</View>
	)
}
