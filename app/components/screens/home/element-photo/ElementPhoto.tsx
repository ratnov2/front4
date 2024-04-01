import { useAuth } from '@/hooks/useAuth'
import { BaseImageUrl, BaseImageUrl2 } from '@/services/api/interceptors.api'
import { Link, useNavigation } from '@react-navigation/native'
import { FC, useReducer, useRef, useState } from 'react'
//import Draggable from 'react-native-draggable'
import {
	ActivityIndicator,
	Image,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import userPng from '@/assets/user.png'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ProfileService } from '@/services/profile/profile.service'
import {
	ILatestInside,
	ILatestPhoto,
	IProfile
} from '@/shared/types/profile.interface'
import DismissKeyboard from '@/ui/form-elements/field/DismissKeyboard'
import { useStorePhoto } from './useStorePhoto'
import { ImgAvatar } from '../../profile/other-user/OtherUserProfile'
import { normalDate } from '../../comments/CommentElement'
import { Draggable } from '../Draggable/Draggable'
import { IsTiming } from '../IsTiming'

//import { Draggable } from '../Draggable/Draggable'

interface IElementPhoto {
	photo: ILatestInside
	refetch: () => void
	toggleScroll: (scroll: boolean) => any
	reactions: { userId: string; reactionType: TReaction }[]
	startCamera: () => void
	setUserDataQuery: (data: any) => void
}

export type BaseExampleProps = {
	className?: string
}
export type TReaction =
	| 'happy_face'
	| 'laughing'
	| 'kiss'
	| 'straight_face'
	| 'distress'
//😁 || 😂 || 😍 || 😐 || 🤮
export const ElementPhoto: FC<IElementPhoto> = ({
	photo,
	refetch,
	toggleScroll,
	reactions,
	startCamera,
	setUserDataQuery
}) => {
	const queryClient = useQueryClient()
	const cron = queryClient.getQueryData(['get-cron-time'])
	const user2 = queryClient.getQueryData(['get-profile'])

	const navigate = useNavigation()
	const { user } = useAuth()

	const [value, setValue] = useState(photo.latestPhoto.comment)
	const [isMessage, setIsMessage] = useState(false)
	//console.log(photo.calendarPhotos)

	const addMainComment = useMutation(
		['add-main-comment'],
		(data: { message: string; created: Date }) =>
			ProfileService.addMainComment(data),
		{
			onSuccess: dataRes => {
				queryClient.setQueryData(['get-profile'], (data?: IProfile) => {
					if (!data) return data
					const newDate = JSON.parse(JSON.stringify(data))
					newDate.latestPhoto.comment = dataRes.data
					setUserDataQuery && setUserDataQuery(newDate)
					return data
				})
				// queryClient.setQueryData(
				// 	['get-latest-people'],
				// 	(data?: ILatestInside[]) => {
				// 		if (!data) return data
				// 		const newData = [...data]
				// 		for (let i = 0; i < data.length; i++) {
				// 			if (data[i]._id._id === user2._id) {
				// 				newData[i].latestPhoto.comment = dataRes.data
				// 				break
				// 			}
				// 		}
				// 		return [...data]
				// 	}
				// )
				//setCommentAuth(dataRes.data)
				setIsMessage(false)
			}
		}
	)

	return (
		<View className='' style={{ marginBottom: 70 }}>
			{photo && (
				<View style={{ flex: 1 }} className='relative'>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							marginBottom: 10
						}}
					>
						<View className='ml-4'>
							<Link
								to={`/Profile${
									user?._id !== photo._id ? `?id=${photo._id}` : ''
								}`}
							>
								<ImgAvatar avatar={photo.avatar} />
							</Link>
						</View>
						<View className='ml-4'>
							<Text className='text-white font-bold text-base'>
								{photo.firstName || 'Anonym'}
							</Text>
							<Text className='text-white/50'>
								{normalDate(photo.latestPhoto.created)}
							</Text>
						</View>
					</View>
					<View
						style={{ aspectRatio: 9 / 12 }}
						className='rounded-xl overflow-hidden'
					>
						<Draggable
							img1={
								(photo.latestPhoto.photos.frontPhoto?.photo || '') as string
							}
							img2={(photo.latestPhoto.photos.backPhoto?.photo || '') as string}
							toggleScroll={toggleScroll}
						/>
						<View className='absolute bottom-0 w-full'>
							<Reactions
								reactions={reactions}
								userId={photo._id}
								created={photo.latestPhoto.created}
							/>
						</View>
						{!IsTiming(cron, user2?.latestPhoto?.created || null) && (
							<View className='bg-neutral-700 w-full h-full top-0 left-0 flex justify-center items-center'>
								<Pressable
									className='bg-white rounded-2xl p-2 border-[2px] border-black'
									onPress={startCamera}
								>
									<Text className='text-neutral-800 text-2xl font-bold'>
										Post BePrime
									</Text>
								</Pressable>
							</View>
						)}
					</View>
				</View>
			)}
			{/* {!IsTiming(cron.data, user2?.data?.latestPhoto?.created) && */}
			<View className='ml-4'>
				{user?._id === photo._id && !isMessage ? (
					<TouchableOpacity
						onPress={() => {
							setIsMessage(true)
						}}
					>
						<Text className='text-white mt-4'>{photo.latestPhoto.comment || '...'}</Text>
					</TouchableOpacity>
				) : (
					user?._id === photo._id &&
					isMessage && (
						<View>
							<View
								className={`flex-row items-center mt-4 border-[1px] border-solid border-stone-700 rounded-lg ${
									addMainComment.isLoading && 'bg-stone-900 text-stone-800'
								}`}
								//onPointerDown={() => console.log('@@@')}
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
												created: photo.latestPhoto.created
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
								className='bg-yellow-400 text-center rounded-xl mt-1'
								onPress={() => setIsMessage(false)}
							>
								<Text className='text-white text-center p-2 font-bold'>
									Close
								</Text>
							</TouchableOpacity>
						</View>
					)
				)}
				{IsTiming(cron, user2?.latestPhoto?.created || null) &&
					user?._id !== photo._id && (
						<View>
							<Text className='text-white mt-4'>
								{photo.latestPhoto.comment}
							</Text>
						</View>
					)}

				{IsTiming(cron, user2?.latestPhoto?.created || null) && (
					<TouchableOpacity
						className=' rounded-xl mt-1 '
						onPress={() => {
							setIsMessage(false)
							navigate.navigate({
								name: 'Comments' as any,
								params: {
									_id: photo._id,
									created: photo.latestPhoto.created
								}
							} as never)
						}}
					>
						<View className='rounded-xl '>
							<Text className='text-zinc-400'>Add a comments...</Text>
						</View>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}
export interface IReactions {
	reactions: { userId: string; reactionType: TReaction }[]
	userId: string
	created: string
}

const Reactions: FC<IReactions> = ({ reactions, userId, created }) => {
	const queryClient = useQueryClient()
	const [isVisibleSmile, setIsVisibleSmile] = useState(false)
	const [size, setSize] = useState({ height: 0, width: 0, x: 0, y: 0 })
	const [stateReaction, setStateReactions] = useState(reactions)
	const addReaction = useMutation(
		['add-reaction'],
		(reaction: TReaction) =>
			ProfileService.addReaction({ userId, reaction, created }),
		{
			onSuccess: newData => {
				queryClient.setQueryData(['get-profile'], (data: any) => {
					const latestPhotoCopy = { ...data.latestPhoto }
					latestPhotoCopy.photoReactions = newData
					setStateReactions([...newData])
					setIsVisibleSmile(!isVisibleSmile)
					return {
						...data,
						latestPhoto: latestPhotoCopy
					}
				})
				queryClient.setQueryData(['get-latest-people'], (data: any) => {
					
					for (let i = 0; i < data.length; i++) {
						// if(data._id._id === ){
						// 	break
						// }
					}
					// const latestPhotoCopy = { ...data.latestPhoto }
					// latestPhotoCopy.photoReactions = newData
					// setStateReactions([...newData])
					// setIsVisibleSmile(!isVisibleSmile)
					// return {
					// 	...data,
					// 	latestPhoto: latestPhotoCopy
					// }
				})
			}
		}
	)

	return (
		<View
			className='flex-1 flex-row justify-between pb-4 relative'
			onLayout={e => setSize(e.nativeEvent.layout)}
		>
			<View className='flex-1'>
				{!isVisibleSmile && (
					<View className='flex-1 mx-4 flex-row'>
						{stateReaction.slice(0, 7).map((reaction, key) => (
							<Pressable
								className={`relative ${stateReaction.length > 4 && key !== 0 && '-ml-4'} border-stone-200 border-[1px] rounded-full`}
								key={key}
							>
								<ImgAvatar avatar={reaction?.avatar} size='reaction-main' />
								<Text className='absolute bottom-0 -left-1'>
									{reactionsData2[reaction.reactionType]}
								</Text>
							</Pressable>
						))}
					</View>
				)}
			</View>

			<Pressable
				className={`pr-4 ${isVisibleSmile ? 'pb-14' : ''}`}
				onPress={() => setIsVisibleSmile(!isVisibleSmile)}
			>
				<MaterialCommunityIcons name='dots-circle' size={49} color='white' />
			</Pressable>
			{isVisibleSmile && (
				<View
					className={`absolute items-center w-full bg-white/10 flex-row justify-between bottom-0`}
				>
					{['😁', '😂', '😍', '😐', '🤮'].map((smile, key) => {
						return (
							<Pressable onPress={() => addReaction.mutate(reactionsData[key])} key={key}>
								<Text style={{ fontSize: size.width / 7 }} >
									{smile}
								</Text>
							</Pressable>
						)
					})}
				</View>
			)}
		</View>
	)
}
export const reactionsData2 = {
	happy_face: '😁',
	laughing: '😂',
	kiss: '😍',
	straight_face: '😐',
	distress: '🤮'
}
const reactionsData = [
	'happy_face',
	'laughing',
	'kiss',
	'straight_face',
	'distress'
] as TReaction[]
