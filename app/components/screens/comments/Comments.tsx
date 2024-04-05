import { useAuth } from '@/hooks/useAuth'
import { createConnection } from '@/services/api/socket'
import { IPost, ProfileService } from '@/services/profile/profile.service'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FC, memo, useEffect, useRef, useState } from 'react'
import {
	ActivityIndicator,
	Animated,
	FlatList,
	ImageBackground,
	KeyboardAvoidingView,
	NativeScrollEvent,
	NativeSyntheticEvent,
	PanResponder,
	PlatformColor,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CommentElement } from './CommentElement'
import { PhotoComment } from '../home/element-photo/PhotoComment'
import { PhotoUser } from './PhotoUser'
import { BaseImageUrl } from '@/services/api/interceptors.api'
import { Image } from 'react-native'
import { BlurView } from 'expo-blur'
import { AntDesign, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Devider, EmodziComment } from './CommentEmodzi'
import { LinearGradient } from 'expo-linear-gradient'
import { useStorePhoto } from '../home/element-photo/useStorePhoto'
import {
	ILatestInside,
	ILatestPhoto,
	IProfile
} from '@/shared/types/profile.interface'
import { HeaderProfile } from '../profile/Profile'
import { LayoutOpacityComment } from '@/navigation/ui/LayoutOpacityComment'
import { DraggableImg } from './DraggableImg'
import { VirtualizedList } from './FF'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const Comments = () => {
	// useEffect(() => {
	// 	createConnection()
	// }, [])
	const insets = useSafeAreaInsets()
	const { params } = useRoute()
	const { navigate } = useNavigation<any>()
	const typeParam = params as { created: string; _id: string }
	const [comments, setComments] = useState<IPost[]>([])
	const userPosts = useQuery(
		['profile/user-posts'],
		() =>
			ProfileService.getPostUserByLink({
				created: typeParam?.created,
				userId: typeParam?._id
			}),
		{
			onSuccess: data => {
				const newData = []
				for (let i = 0; i < data.length; i++) {
					newData.push({ ...data[i], IDD: i })
				}
				setComments(newData)
			}
		}
	)
	const addPost = useMutation(
		['add-post'],
		(data: { message: string; created: string; userId: string }) =>
			ProfileService.addUserMessage(data),
		{
			onSuccess: data => {
				userPosts.refetch()
				//LOOK
				user3.refetch()
				latestPeople.refetch()
				latestFriends.refetch()
				//LOOK
				// queryClient.setQueryData(['get-profile'], (data?: IProfile) => {
				// 	if (!data) return data
				// 	const newDate = JSON.parse(JSON.stringify(data))
				// 	// queryClient.cancelQueries(['get-profile'])

				// 	queryClient.invalidateQueries(['get-profile'])
				// 	return newDate
				// })
			}
		}
	)
	const sendMessage = (data: {
		message: string
		created: string
		userId: string
	}) => {
		if (!user3.data) return
		const comment = {
			_id: user3.data?._id,
			avatar: user3.data?.avatar,
			comment: data.message,
			created: data.created,
			firstName: user3.data?.firstName,
			isLoading: true
		}

		setComments(state => [...state, comment])
		addPost.mutate({
			created: (params as any).created,
			message: value,
			userId: (params as any)._id
		})
		setValue('')
	}
	//console.log(userPosts.isLoading)

	const queryClient = useQueryClient()

	// Предположим, 'myQueryKey' - это ключ вашего запроса
	const queryKey3 = 'get-latest-people'
	const queryKey2 = 'get-latest-friends'
	const user3 = useQuery<IProfile>(['get-profile'])
	///correct PLZ
	const latestPeople = useQuery<IProfile>(['get-latest-people'])
	const latestFriends = useQuery<IProfile>(['get-latest-friends'])
	///correct PLZ

	//Получите данные из кеша по ключу

	const dataFromCache2: ILatestInside[] | undefined = queryClient.getQueryData([
		queryKey2
	])
	const dataFromCache3: ILatestInside[] | undefined = queryClient.getQueryData([
		queryKey3
	])
	//get-latest-photo
	const [userMainInfo] = useState<ILatestInside>(
		//@ts-ignore
		(() => {
			if (user3.data && user3.data.latestPhoto.created === typeParam.created)
				return {
					...user3.data,
					_id: {
						_id: user3.data._id
					},
					latestPhoto: {
						photos: user3.data.latestPhoto.photos,
						comment: user3.data.latestPhoto.comment,
						photoReactions: user3.data.latestPhoto.photoReactions,
						created: user3.data.latestPhoto.created
					},
					//created
					avatar: user3.data?.avatar,
					firstName: user3.data?.firstName
				}
			//@ts-ignore
			if (dataFromCache2[0]?._id === typeParam._id) {
				//@ts-ignore
				return dataFromCache2[0]
			}
			//@ts-ignore
			const data3 = dataFromCache3.filter(user => {
				//@ts-ignore
				return user._id._id === typeParam._id
			})[0]

			//@ts-ignore
			if (Object.entries(data3).length !== 0)
				return {
					...data3,
					//@ts-ignore
					avatar: data3._id.avatar
					//@ts-ignore
				}
			//for other profile
			//console.log(dataFromCache2)
		})()
	)
	//console.log(JSON.stringify(userMainInfo.latestPhoto.photos, null, 2))

	const [value, setValue] = useState('')

	const scrollFlatRef = useRef<FlatList>(null)

	useEffect(() => {
		scrollToBottom()
	}, [userPosts.data]) // Пересчитывать прокрутку, когда изменяется массив сообщений

	const [offsetScroll, setOffsetScroll] = useState(0)
	const scrollToBottom = () => {
		if (scrollFlatRef.current) {
			scrollFlatRef.current.scrollToOffset({ offset: 555555 })
		}
	}

	const [shouldScroll, setShouldScroll] = useState(true)
	const toggleScroll = (scroll: boolean) => {
		setShouldScroll(scroll)
	}
	//console.log(JSON.stringify(comments, null,2));
	//console.log('wefewf')

	//return null
	if (!userMainInfo || !userMainInfo.latestPhoto) return null

	const [isButtonVisible, setButtonVisible] = useState(true)
	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent
		const distanceToEnd =
			contentSize.height - contentOffset.y - layoutMeasurement.height
		if (distanceToEnd <= 300) {
			setButtonVisible(false)
		} else {
			setButtonVisible(true)
		}
	}

	// const addMainComment = useMutation(
	// 	['add-main-comment'],
	// 	(data: { message: string; created: Date }) =>
	// 		ProfileService.addMainComment(data),

	// 	{
	// 		onMutate: async newF => {
	// 			queryClient.cancelQueries({ queryKey: ['get-profile'] })
	// 			const previous = queryClient.getQueryData(['get-profile'])
	// 			queryClient.setQueryData(['get-profile'], (data2?: IProfile) => {
	// 				if (!data2) return data2
	// 				const newDate = JSON.parse(JSON.stringify(data2))
	// 				newDate.latestPhoto.comment = newF.message
	// 				return newDate
	// 			})
	// 		},
	// 		onSuccess: dataRes => {
	// 			queryClient.setQueryData(['get-profile'], (data?: IProfile) => {
	// 				if (!data) return data
	// 				const newDate = JSON.parse(JSON.stringify(data))
	// 				newDate.latestPhoto.comment = dataRes.data
	// 				queryClient.invalidateQueries(['get-profile'])
	// 				return newDate
	// 			})
	// 		}
	// 	}
	// )

	return (
		<View className='flex-1'>
			<LayoutOpacityComment created={(params as any).created}>
				{userPosts.data && (
					<KeyboardAvoidingView behavior='padding'>
						<VirtualizedList
							shouldScroll={shouldScroll}
							ref={scrollFlatRef}
							keyboardShouldPersistTaps='handled'
						>
							<ShareHeader
								toggleScroll={toggleScroll}
								userMainInfo={userMainInfo}
							/>
							<FlatList
								onScroll={handleScroll}
								onLayout={event =>
									setOffsetScroll(event.nativeEvent.layout.height)
								}
								data={comments}
								keyExtractor={(item, index) => item.created + index.toString()}
								renderItem={({ item }) => {
									if (item._id === user3.data?._id) {
										return (
											<CommentElement
												message={item.comment}
												avatar={user3.data.avatar}
												created={item.created}
												email={user3.data.firstName}
												key={item.comment}
												firstName={user3.data.firstName}
												id={user3.data._id}
												isLoading={(item as any)?.isLoading}
											/>
										)
									} else
										return (
											<CommentElement
												message={item.comment}
												avatar={item.avatar}
												created={item.created}
												email={item.firstName}
												key={item.comment}
												firstName={item.firstName}
												id={item._id}
												isLoading={(item as any)?.isLoading}
											/>
										)
								}}
							/>
							{userPosts.data.length === 0 && (
								<View className='mt-7'>
									<Text className='text-center text-2xl font-medium text-neutral-500'>
										No comments yet
									</Text>
								</View>
							)}
							<View className='h-[30px]'></View>
							<View className='w-full bg-[#111111]'>
								<View className='bg-neutral-600 h-[1px] w-full'></View>
								<View className='w-full flex-row'>
									<TextInput
										value={value}
										onChangeText={e => setValue(e)}
										className='text-white p-2 flex-1 text-xl'
										placeholder='Add comment...'
									/>
									<TouchableOpacity
										disabled={!value}
										onPress={() =>
											sendMessage({
												created: (params as any).created,
												message: value,
												userId: (params as any)._id
											})
										}
										className='mx-2 flex justify-center bg-inherit'
									>
										<Ionicons
											name='send'
											size={24}
											color={value ? '#ff2' : '#121'}
										/>
									</TouchableOpacity>
								</View>
								<View className='bg-neutral-600 h-[1px] w-full'></View>
								<View
									className=' w-full'
									style={{ height: insets.bottom }}
								></View>
							</View>
						</VirtualizedList>
					</KeyboardAvoidingView>
				)}
				{/* {!isButtonVisible && ( */}
				{/* <Pressable
					onPress={() => scrollToBottom()}
					style={{ position: 'absolute', right: 10, bottom: 100 }}
					className=''
				>
					<AntDesign name='downcircle' size={44} color='gray' />
				</Pressable> */}
			</LayoutOpacityComment>
			{/* <TextInput
				value={value}
				onChangeText={e => setValue(e)}
				className='text-white p-2 flex-1 text-xl'
				placeholder='Add comment...'
			/> */}
		</View>
	)
}

export const normalDate = (date: string) => {
	const currentDate = new Date()
	const userDate = new Date(date)

	const hour = userDate.getHours()
	const seconds = userDate.getSeconds()
	const minutes = userDate.getMinutes()

	const difference = hour - currentDate.getHours()
	const dateStr = `${hour} : ${minutes} : ${seconds} - ${difference} hours late`
	return dateStr
}

interface IHeaderComponent {
	userMainInfo: ILatestInside
	toggleScroll: (scroll: boolean) => void
}

const HeaderComponent: FC<IHeaderComponent> = memo(
	({ userMainInfo, toggleScroll }) => {
		const queryClient = useQueryClient()

		const user = useQuery<IProfile>(['get-profile'])
		const addMainComment = useMutation(
			['add-main-comment'],
			(data: { message: string; created: string }) =>
				ProfileService.addMainComment(data),
			{
				onSuccess: dataRes => {
					queryClient.setQueryData(['get-profile'], (data?: IProfile) => {
						if (!data) return data
						const newDate = JSON.parse(JSON.stringify(data))
						//newDate.latestPhoto.comment = dataRes.data
						//queryClient.refetchQueries(['get-profile'])
						
						//setUserDataQuery && setUserDataQuery(newDate)
						return newDate
					})
					user.refetch()
					setIsMessage(false)
				}
			}
		)
		const handleButtonPress = () => {
			setIsMessage(true)
		}

		const [value, setValue] = useState(userMainInfo.latestPhoto.comment)
		
		
		const [isMessage, setIsMessage] = useState(false)
		const { top } = useSafeAreaInsets()
		const textInputRef = useRef<TextInput>(null)
		useEffect(() => {
			if (isMessage && textInputRef.current) {
				textInputRef.current.focus()
			}
		}, [isMessage])
		//console.log(user.data?._id,userMainInfo._id  );

		return (
			<View className='flex-1' style={{ aspectRatio: 9 / 14 }}>
				<View style={{ height: top + 20 }} />
				<ImageBackground
					source={{
						uri: `${BaseImageUrl}${userMainInfo.latestPhoto.photos.backPhoto?.photo}`
					}}
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%'
					}}
				/>

				<BlurView
					intensity={60}
					style={{
						...{
							position: 'absolute',
							width: '100%',
							height: '100%'
						}
					}}
				/>
				<View className='mx-4 flex-1 rounded-xl overflow-hidden'>
					<DraggableImg
						img1={userMainInfo.latestPhoto.photos.frontPhoto?.photo || ''}
						img2={userMainInfo.latestPhoto.photos.backPhoto?.photo || ''}
						toggleScroll={toggleScroll}
					/>
				</View>
				<View className='h-20 justify-center mx-4'>
					{user.data?._id === userMainInfo._id._id && !isMessage ? (
						<TouchableOpacity onPress={handleButtonPress}>
							<Text className='text-white text-center'>
								{user.data?.latestPhoto.comment || '...'}
							</Text>
							{/* {user.data?.latestPhoto.comment ? (
							<Text className='text-white mt-2'>
								{user.data?.latestPhoto.comment || '...'}
							</Text>
						) : (
							<View className='mt-2 mx-2 mb-2 flex-row items-center justify-between  flex-1'>
								<Text className='text-white'>Add comment</Text>
								<AntDesign name='pluscircle' size={34} color='white' />
							</View>
						)} */}
						</TouchableOpacity>
					) : (
						user.data?._id === userMainInfo._id._id &&
						isMessage && (
							<View>
								<View
									className={`flex-row items-center border-[1px] border-solid border-stone-700 rounded-lg ${
										addMainComment.isLoading && 'bg-stone-900 text-stone-800'
									}`}
								>
									<TextInput
										ref={textInputRef}
										value={value}
										onChangeText={e => setValue(e)}
										className={`p-2 rounded-lg flex-1 color-white  ${
											addMainComment.isLoading && ' text-stone-600'
										}`}
										pointerEvents={addMainComment.isLoading ? 'none' : 'auto'}
										placeholder='input text'
										onBlur={() => {
											!addMainComment.isLoading && setIsMessage(false)
										}}
										onSubmitEditing={() =>
											addMainComment.mutate({
												message: value,
												created: userMainInfo.latestPhoto.created
											})
										}
									>
										{/* <View className='bg-yellow-300 w-20 h-20 absolute right-0 bottom-0'></View> */}
									</TextInput>

									{!addMainComment.isLoading ? (
										<TouchableOpacity
											className='mx-2'
											onPress={() => {
												addMainComment.mutate({
													message: value,
													created: userMainInfo.latestPhoto.created
												})
											}}
										>
											<MaterialIcons name='send' size={24} color='white' />
										</TouchableOpacity>
									) : (
										<ActivityIndicator
											className='mx-2'
											size={24}
											color='white'
										/>
									)}
								</View>
							</View>
						)
					)}

					{user.data?._id !== userMainInfo._id._id && (
						<Text className='text-white text-center'>
							{userMainInfo.latestPhoto.comment}
						</Text>
					)}
				</View>
			</View>
		)
	}
)

const ShareHeader: FC<IHeaderComponent> = memo(
	({ toggleScroll, userMainInfo }) => {
		return (
			<View className='flex-1'>
				<HeaderComponent
					userMainInfo={userMainInfo}
					toggleScroll={toggleScroll}
				/>

				<EmodziComment
					//@ts-ignore
					reactionsData={userMainInfo.latestPhoto.photoReactions}
				/>
			</View>
		)
	}
)
