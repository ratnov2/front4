import { FC } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import clsx from 'clsx'
import {
	Link,
	createNavigationContainerRef,
	useNavigation,
	useRoute
} from '@react-navigation/native'
import { BaseImageUrl } from '@/services/api/interceptors.api'

interface IPinBlock {
	img: string
	pin: 'photoOne' | 'photoTwo' | 'photoThree'
}
//?pin=${pin}
export const PinBlock: FC<IPinBlock> = ({ img, pin }) => {
	let navigate = useNavigation()

	if (!!img) {
		return (
			<View
				className={clsx(
					'w-[30%] h-40 border-2 flex-col rounded-2xl justify-center '
				)}
			>
				{/* <Link to={`/CalendarTask?pin=${pin}`} className='block'> */}
				<TouchableOpacity
					onPress={() =>
						//@ts-ignore
						navigate.navigate(`CalendarTask`, {
							pin: pin
						})
					}
				>
					<View className='bg-red w-[100%] h-[100%] block w-30 '>
						<Image
							className='w-[100%] h-[100%] rounded-2xl'
							resizeMode='cover'
							source={{ uri: `${BaseImageUrl}${img}` }}
						/>
					</View>
				</TouchableOpacity>
				{/* </Link> */}
			</View>
		)
	}

	return (
		<TouchableOpacity
			onPress={() =>
				//@ts-ignore
				navigate.navigate(`CalendarTask`, {
					pin: pin
				})
			}
			className={clsx(
				'w-[32%] h-40 border-2 flex-col border-dotted border-gray-500 rounded-2xl justify-center'
			)}
		>
			<View className='m-auto'>
				{!img ? (
					<AntDesign name='plus' size={24} color='white' />
				) : (
					<AntDesign name='lock' size={24} color='#3e3e3e' />
				)}
			</View>
		</TouchableOpacity>
	)
}
