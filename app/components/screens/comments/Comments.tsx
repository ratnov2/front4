import { useAuth } from '@/hooks/useAuth'
import { createConnection } from '@/services/api/socket'
import { ProfileService } from '@/services/profile/profile.service'
import { useRoute } from '@react-navigation/native'
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
import { Ionicons } from '@expo/vector-icons'
import { EmodziComment } from './CommentEmodzi'

export const Comments = () => {
	// useEffect(() => {
	// 	createConnection()
	// }, [])
	const insets = useSafeAreaInsets()
	const { params } = useRoute()
	const userPosts = useQuery(['profile/user-posts'], () =>
		ProfileService.getPostUserByLink({
			created: (params as any)?.created,
			userId: (params as any)?._id
		})
	)
	const addPost = useMutation(
		['add-post'],
		(data: { message: string; created: string; userId: string }) =>
			ProfileService.addUserMessage(data),
		{
			onSuccess: () => userPosts.refetch()
		}
	)
	const queryClient = useQueryClient()

	// Предположим, 'myQueryKey' - это ключ вашего запроса
	const queryKey = 'get-latest-photo'

	// Получите данные из кеша по ключу
	const dataFromCache: any = queryClient.getQueryData([queryKey])
	//get-latest-photo
	const [userMainInfo, setUserMainInfo] = useState(
		dataFromCache.map((user: { _id: any }) => {
			return user._id == params._id ? user : {}
		})[0]
	)
	// console.log('@@@',normalDate('2023-11-24T09:01:03.537Z'));

	const { user } = useAuth()
	const [value, setValue] = useState('')
	// photo, emodzi, comments, main comment
	// console.log(userPosts.data)
	// console.log(params)
	const scrollY = useRef(new Animated.Value(0)).current

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (evt, gestureState) => {
				const { dy } = gestureState
				// Разрешаем прокрутку, если скролл еще не достиг 300px
				return dy > 0 || scrollY.__getValue() < 300
			},
			onPanResponderMove: Animated.event([null, { dy: scrollY }], {
				useNativeDriver: false
			})
		})
	).current

	const headerHeight = scrollY.interpolate({
		inputRange: [0, 300],
		outputRange: [600, 250],
		extrapolate: 'clamp'
	})
	const translateY = scrollY.interpolate({
		inputRange: [0, 200],
		outputRange: [0, 600],
		extrapolate: 'clamp',
	  });
	const imageScale = scrollY.interpolate({
		inputRange: [0, 400],
		outputRange: [1, 1], // Равномерное увеличение в 2 раза
		extrapolate: 'clamp'
	})
	return (
		<View style={{ marginTop: insets.top }} className='flex-1'>
			<ScrollView
				scrollEventThrottle={16} // Количество событий скролла, отправляемых на каждый кадр
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: false }
				)}
				//{...panResponder.panHandlers}
			>
				<Animated.View
					style={{
						height: headerHeight,
						overflow: 'hidden',
						transform: [{ translateY: scrollY }],
						zIndex: 40
					}}
				>
					<Image
						source={{
							uri: `${BaseImageUrl}${userMainInfo.calendarPhotos.photos.backPhoto.photo}`
						}}
						style={{
							...{
								position: 'absolute',
								width: '100%',
								height: '100%'
							}
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
					<Text className='text-center mt-5 text-lg'>
						{normalDate(userMainInfo.calendarPhotos.photos.backPhoto.created)}
					</Text>
					<Animated.Image
						style={{
							transform: [{ scaleX: imageScale }, { scaleY: imageScale }],
							flex: 1,
							width: '100%',
							maxWidth: '95%',
							maxHeight: '95%',
							aspectRatio: 16 / 9, // Пример соотношения сторон, замените на ваше
							resizeMode: 'cover',
							marginTop: 10
						}}
						className='mx-auto rounded-3xl'
						source={{
							uri: `${BaseImageUrl}${userMainInfo.calendarPhotos.photos.frontPhoto.photo}`
						}}
					/>
					<Text className='text-center my-5 mb-10'>
						{userMainInfo.calendarPhotos.comment}
					</Text>
					<View className='bg-neutral-700 h-0.5'></View>
				</Animated.View>
				{/* </View> */}
				<EmodziComment />
				<View style={{ transform: [{  translateY }] }}>
					{userPosts.data && (
						<View className='mb-20'>
							{/* <FlatList
								data={userPosts.data}
								inverted
								contentContainerStyle={{ flexDirection: 'column-reverse' }}
								renderItem={({ item }) => (
									<CommentElement
										message={item.message}
										avatar={item.avatar}
										created={item.created}
									/>
								)}
							/> */}
							{userPosts.data?.map(e => (
								<CommentElement
									message={e.message}
									avatar={e.avatar}
									created={e.created}
									email={e.email}
									key={e.created}
									firstName={e.firstName}
								/>
							))}
						</View>
					)}
				</View>
			</ScrollView>

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
						onPress={() => {
							addPost.mutate({
								created: (params as any).created,
								message: value,
								userId: (params as any)._id
							})
							setValue('')
						}}
						className='mx-2 flex justify-center bg-inherit'
					>
						<Ionicons name='send' size={24} color='#0000ff' />
					</TouchableOpacity>
					{/* <TouchableOpacity
						onPress={() =>
							addPost.mutate({
								created: (params as any).created,
								message: value,
								userId: (params as any)._id
							})
						}
						className=' bg-red-700 p-4'
					>
						<Text className='text-white text-center'>ADD MESSAGE</Text>
					</TouchableOpacity> */}
				</View>
			</View>
		</View>
	)
}

const normalDate = (date: Date) => {
	const currentDate = new Date()
	const userDate = new Date(date)

	const hour = userDate.getHours()
	const seconds = userDate.getSeconds()
	const minutes = userDate.getMinutes()

	const difference = hour - currentDate.getHours()
	const dateStr = `${hour} : ${minutes} : ${seconds} - ${difference} hours late`
	return dateStr
}
