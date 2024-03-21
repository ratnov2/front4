import { useAuth } from '@/hooks/useAuth'
import { createConnection } from '@/services/api/socket'
import { IPost, ProfileService } from '@/services/profile/profile.service'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import {
	Animated,
	FlatList,
	ImageBackground,
	PanResponder,
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
import { Feather, Ionicons } from '@expo/vector-icons'
import { Devider, EmodziComment } from './CommentEmodzi'
import { LinearGradient } from 'expo-linear-gradient'
import { useStorePhoto } from '../home/element-photo/useStorePhoto'
import { ILatestInside, ILatestPhoto } from '@/shared/types/profile.interface'
import { HeaderProfile } from '../profile/Profile'
import { LayoutOpacityComment } from '@/navigation/ui/LayoutOpacityComment'
import { DraggableImg } from './DraggableImg'

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
				setComments(data)
			}
		}
	)
	const addPost = useMutation(
		['add-post'],
		(data: { message: string; created: string; userId: string }) =>
			ProfileService.addUserMessage(data),
		{
			onSuccess: () => {
				userPosts.refetch()
			}
		}
	)
	const sendMessage = (data: {
		message: string
		created: string
		userId: string
	}) => {
		const comment = {
			_id: dataFromCache?._id,
			avatar: dataFromCache.avatar,
			comment: data.message,
			created: data.created,
			firstName: dataFromCache.firstName,
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
	const queryKey = 'get-profile'

	//Получите данные из кеша по ключу
	const dataFromCache: ILatestInside[] | undefined = queryClient.getQueryData([
		queryKey
	])
	const dataFromCache2: ILatestInside[] | undefined = queryClient.getQueryData([
		queryKey2
	])
	const dataFromCache3: ILatestInside[] | undefined = queryClient.getQueryData([
		queryKey3
	])
	//get-latest-photo
	const [userMainInfo, setUserMainInfo] = useState<ILatestInside>(
		//@ts-ignore
		(() => {
			//console.log("dataFromCache", dataFromCache);
			//@ts-ignore
			const data = dataFromCache?.calendarPhotos?.filter(user => {
				//@ts-ignore
				return user._id === typeParam._id
			})[0]

			if (data && Object.entries(data).length !== 0)
				return {
					...data,
					latestPhoto: { photos: data.photos },
					//@ts-ignore
					avatar: dataFromCache.avatar,
					//@ts-ignore
					_id: dataFromCache._id,
					//@ts-ignore
					firstName: dataFromCache.firstName
				}
			//@ts-ignore
			if (dataFromCache2[0]?._id === typeParam._id) {
				//@ts-ignore
				return dataFromCache2[0]
			}
			//console.log('wefwefwef',dataFromCache2);
			//@ts-ignore
			const data3 = dataFromCache3.filter(user => {
				return user._id._id === typeParam._id
			})[0]
			
			//@ts-ignore
			if (Object.entries(data3).length !== 0)
				return {
					...data3,
					avatar: data3._id.avatar
					//@ts-ignore
				}
			//for other profile
			//console.log(dataFromCache2)
		})()
	)
	//console.log('userMainInfo', userMainInfo, typeParam)
	const [value, setValue] = useState('')

	const scrollY = useRef(new Animated.Value(0)).current

	const headerHeight = scrollY.interpolate({
		inputRange: [0, 300],
		outputRange: [600 + insets.top + 100, 250],
		extrapolate: 'clamp'
	})
	const translateY = scrollY.interpolate({
		inputRange: [0, 300],
		outputRange: [0, 300],
		extrapolate: 'clamp'
	})
	// const imageScale = scrollY.interpolate({
	// 	inputRange: [0, 400],
	// 	outputRange: [1, 1], // Равномерное увеличение в 2 раза
	// 	extrapolate: 'clamp'
	// })

	// const imageScale2 = scrollY.interpolate({
	// 	inputRange: [0, 300],
	// 	outputRange: [1, 0.5], // Равномерное увеличение в 2 раза
	// 	extrapolate: 'clamp'
	// })
	const scrollViewRef = useRef<ScrollView>(null)

	useEffect(() => {
		scrollToBottom()
	}, [userPosts.data]) // Пересчитывать прокрутку, когда изменяется массив сообщений

	const scrollToBottom = () => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollToEnd({ animated: true })
		}
	}


	const [shouldScroll, setShouldScroll] = useState(true)
	const toggleScroll = (scroll: boolean) => {
		setShouldScroll(scroll)
	}
	if (!userMainInfo || !userMainInfo.latestPhoto) return null
	return (
		<View className='flex-1'>
			{/* <TouchableOpacity onPress={() => navigate('Home')}>
				<Feather name='arrow-left' size={30} color='white' />
			</TouchableOpacity> */}
			<LayoutOpacityComment created={(params as any).created}>
				{/* // scrollEventThrottle={16} // Количество событий скролла, отправляемых на каждый кадр
				// onScroll={Animated.event(
				// 	[{ nativeEvent: { contentOffset: { y: scrollY } } }],
				// 	{ useNativeDriver: false }
				// )}
				//{...panResponder.panHandlers} */}
				<ScrollView
					className='flex-1 '
					ref={scrollViewRef}
					onContentSizeChange={scrollToBottom}
					scrollEnabled={shouldScroll}
				>
					{/* <Animated.View
						style={{
							height: headerHeight,
							overflow: 'hidden',
							transform: [{ translateY: scrollY }],
							zIndex: 40,
							backgroundColor: 'red'
						}}
					>
						<View style={{ height: insets.top + 20 }} />
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
						<LinearGradient
							colors={['#00000000', '#111111']}
							style={{
								height: '70%',
								width: '100%',
								position: 'absolute',
								bottom: 0
							}}
						></LinearGradient>
						<LinearGradient
							colors={['#111111', '#00000000']}
							style={{
								height: '70%',
								width: '100%',
								position: 'absolute',
								top: 0
							}}
						></LinearGradient>
						<Animated.View
							className='flex-1 relative mx-auto rounded-3xl'
							style={{
								transform: [{ scaleX: imageScale2 }, { scaleY: imageScale }],
								flex: 1,
								width: '100%',
								maxWidth: '95%',
								maxHeight: '95%',
								aspectRatio: 16 / 9 // Пример соотношения сторон, замените на ваше
							}}
						>
							<Animated.Image
								style={{
									// transform: [{ scaleX: imageScale }, { scaleY: imageScale }],
									flex: 1,
									width: '100%',
									maxWidth: '95%',
									maxHeight: '95%',
									aspectRatio: 16 / 9, // Пример соотношения сторон, замените на ваше
									resizeMode: 'cover'
								}}
								className='mx-auto rounded-3xl '
								source={{
									uri: `${BaseImageUrl}${store[store.current || 'backPhoto']
										?.photo}`
								}}
							/>
							{store.length === 2 && (
								<TouchableOpacity
									className='flex-1 absolute left-[4%] top-[4%] w-20'
									onPress={() => dispatch({ type: store.current })}
								>
									<Animated.View
										style={{
											aspectRatio: 10 / 12,
											transform: [
												{ scaleX: imageScale2 },
												{ scaleY: imageScale2 }
											]
										}}
										className=' flex-1 border-2 border-solid border-stone-900 rounded-xl overflow-hidden'
									>
										<Animated.Image
											className=''
											style={{
												aspectRatio: 9 / 16
											}}
											source={{
												uri: `${BaseImageUrl}${store[UnCurrent(store.current)]
													?.photo}`
											}}
										/>
									</Animated.View>
								</TouchableOpacity>
							)}
							<Text className='text-center my-5 mb-10 text-white text-bol'>
								{userMainInfo.latestPhoto.comment}
							</Text>
						</Animated.View>

						<Devider />
					</Animated.View> */}
					{/* </View> */}
					<View className='flex-1 ' style={{ aspectRatio: 9 / 14 }}>
						<View style={{ height: insets.top + 20 }} />

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
						<View className='h-20' />
					</View>
					<Animated.View style={{ transform: [{ translateY }] }}>
						<EmodziComment />
						{comments.length > 0 && (
							<View className='mb-20'>
								<FlatList
									data={comments}
									inverted
									disableVirtualization
									contentContainerStyle={{ flexDirection: 'column-reverse' }}
									renderItem={({ item }) => (
										<CommentElement
											message={item.comment}
											avatar={item.avatar}
											created={item.created}
											email={item.firstName}
											key={item.created}
											firstName={item.firstName}
											id={item._id}
											isLoading={(item as any)?.isLoading}
										/>
									)}
								/>
							</View>
						)}
					</Animated.View>
				</ScrollView>
			</LayoutOpacityComment>

			<View className='absolute bottom-0 flex-1 w-full bg-[#111111]'>
				<View className='bg-neutral-600 h-[1px] w-full'></View>
				<View className=' w-full flex-row'>
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
						<Ionicons name='send' size={24} color={value ? '#ff2' : '#121'} />
					</TouchableOpacity>
				</View>
				<View className='bg-neutral-600 h-[1px] w-full'></View>
				<View className=' w-full' style={{ height: insets.bottom }}></View>
			</View>
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
