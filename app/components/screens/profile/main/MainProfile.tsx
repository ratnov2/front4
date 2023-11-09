import { ProfileService } from '@/services/profile/profile.service'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Image, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { PinBlock } from '@/entities/profile'
import { Link } from '@react-navigation/native'

export const MainProfile: FC = () => {
	const user = useQuery(['get-user'], () => ProfileService.getProfile())
	// console.log(user.data?.favoritePhotos)

	return (
		<View>
			{user.data && (
				<>
					<View className='w-20 h-20 rounded-full bg-red-600 flex justify-center items-center color-white'>
						<Text className='text-white uppercase font-bold text-3xl'>{(user.data.firstName || 'anonym')[0]}</Text>
					</View>
					<View className='flex-row justify-between items-center mt-4'>
						<Text className='text-white text-5xl font-bold'>
							{user.data.firstName || 'anonym'}
						</Text>
						<View className='bg-white rounded-full h-10 w-10 flex justify-center items-center '>
							<Entypo name='share' size={24} color='black' />
						</View>
					</View>
					<Text className='text-gray-400 text-lg mt-5'>
						You joined BePrime 4 months ago
					</Text>
					<View>
						<View className='flex-row justify-between my-4 items-center'>
							<Text className='text-white text-2xl font-bold'>Pins</Text>
							<Text className=' text-gray-500'>Visible to your friends</Text>
						</View>
						<View>
							<View className='flex-row justify-between'>
								<PinBlock
									img={user.data.favoritePhotos.photoOne}
									pin='photoOne'
								/>
								<PinBlock
									img={user.data.favoritePhotos.photoTwo}
									pin='photoTwo'
								/>
								<PinBlock
									img={user.data.favoritePhotos.photoThree}
									pin='photoThree'
								/>
							</View>
						</View>
					</View>
					<View>
						<View className='flex-row justify-between items-center mt-6'>
							<Text className='text-white text-2xl font-bold'>
								Your memories
							</Text>
							<Text className='text-gray-500'>Only visible to you</Text>
						</View>
					</View>
				</>
			)}
		</View>
	)
}
