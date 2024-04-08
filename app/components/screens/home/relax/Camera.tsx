import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { ElementHeaderForCamera } from '../ui/ElementHeaderForCamera'
import { Camera } from 'expo-camera'
import { FC } from 'react'
import { Image } from 'react-native'
import { ElementTest } from '../ElementTest'
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'
import { PhotoLoader } from '@/ui/photo-loader/PhotoLoader'

interface ICameraComponent {
	cron?: string
	isFrontCamera: boolean
	cameraRef: any
	frontImage: string | null
	backImage: string | null
	isMakingPhoto: boolean
	setIsFrontCamera: () => void
	takeFrontPhoto: () => void
	takeBackPhoto: () => void
	setFrontImage: () => void
	setBackImage: () => void
	ff: () => void
}

export const CameraComponent: FC<ICameraComponent> = ({
	isFrontCamera,
	cron,
	cameraRef,
	backImage,
	frontImage,
	isMakingPhoto,
	setIsFrontCamera,
	takeFrontPhoto,
	takeBackPhoto,
	setFrontImage,
	ff,
	setBackImage
}) => {
	return (
		<View className='flex-1 bg-black'>
			{cron && <ElementHeaderForCamera cron={cron} />}
			<View className='mx-2 flex-1 rounded-3xl bg-red-50 overflow-hidden relative'>
				<Camera
					style={{ flex: 1 }}
					className=''
					type={
						isFrontCamera
							? (Camera.Constants.Type as any).front
							: (Camera.Constants.Type as any).back
					}
					whiteBalance={999999}
					
					ratio='4:3'
					ref={cameraRef}
				></Camera>
				{!frontImage && !backImage && isMakingPhoto && (
					<View className={`flex-1 absolute w-full h-full bg-blue-900 z-50`} />
				)}
				{(frontImage || backImage) && (
					<View className='absolute flex-1 h-full w-full bg-black'>
						<Image
							source={{ uri: frontImage as string }}
							className='w-full h-full'
						/>
					</View>
				)}
				{frontImage && backImage && (
					<View className='absolute flex-1 h-full w-full bg-black'>
						<ElementTest img1={frontImage} img2={backImage} />
					</View>
				)}
			</View>

			<View className='h-[23%] bg-black flex justify-center items-center z-[9999999] '>
				{!frontImage && !backImage && !isMakingPhoto ? (
					<View className='flex-row items-center'>
						<Pressable onPress={() => setIsFrontCamera()} className='p-2'>
							<Ionicons name='camera-reverse' size={34} color='white' />
						</Pressable>

						<TouchableOpacity
							onPress={() => {
								isFrontCamera && takeFrontPhoto()
								!isFrontCamera && takeBackPhoto()
							}}
							style={{
								height: 80
							}}
							className='text-center flex items-center'
						>
							<Feather name='circle' size={80} color='white' />
							<Text className='text-white text-center'>Post a Late BePrime</Text>
						</TouchableOpacity>

						<Pressable onPress={() => setIsFrontCamera()} className='p-2'>
							<Ionicons name='camera-reverse' size={34} color='white' />
						</Pressable>
					</View>
				) : !!frontImage && !!backImage && !isMakingPhoto ? (
					<>
						<TouchableOpacity
							onPress={() => {
								setFrontImage()
								setBackImage()
							}}
							className='flex-row justify-center items-center p-2'
						>
							<Text className='text-white font-bold text-2xl mr-4'>RETAKE</Text>
							<FontAwesome name='undo' size={30} color='white' />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={ff}
							className='flex-row justify-center items-center p-2 z-[999999]'
						>
							<Text className='text-white font-bold text-2xl mr-4'>SEND</Text>
							<Ionicons name='send-sharp' size={34} color='white' />
						</TouchableOpacity>
					</>
				) : (
					<PhotoLoader />
				)}
			</View>
		</View>
	)
}
