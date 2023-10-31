//ts-nocheck
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import mime from 'mime'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Alert,
	ImageBackground,
	Image
} from 'react-native'
// import * as Settings from 'expo-settings'
import { Camera } from 'expo-camera'
import { useMutation } from '@tanstack/react-query'
import { FilesService } from '@/services/files/profile.service'
import { ProfileService } from '@/services/profile/profile.service'
let camera: Camera | null
let camera2: Camera | null
export default function Home() {
	const { mutate } = useMutation(['push-photo'], (form: FormData) =>
		FilesService.pushPhoto(form)
	)
	///
	const [startCamera, setStartCamera] = useState(false)
	const [previewVisible, setPreviewVisible] = useState(false)
	const [capturedImage, setCapturedImage] = useState<any>(null)
	//@ts-ignore
	const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
	const [flashMode, setFlashMode] = useState('off')

	const __startCamera = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync()
		console.log(status)
		if (status === 'granted') {
			setStartCamera(true)
		} else {
			Alert.alert('Access denied')
		}
	}
	const __takePicture = async () => {
		const photo: any = await camera?.takePictureAsync()
		setPreviewVisible(true)
		setCapturedImage(photo)
	}
	const __savePhoto = () => {
		setStartCamera(false)
		const formData = new FormData()
		
		const uri = capturedImage.uri
		formData.append('image', {
			uri: capturedImage.uri,
			type: mime.getType(uri),
			name: uri.split('/').pop()
		})
		console.log(formData)
		mutate(formData)
	}
	const __retakePicture = () => {
		setCapturedImage(null)
		setPreviewVisible(false)
		__startCamera()
	}

	const __handleFlashMode = () => {
		if (flashMode === 'on') {
			setFlashMode('off')
		} else if (flashMode === 'off') {
			setFlashMode('on')
		} else {
			setFlashMode('auto')
		}
	}
	const __switchCamera = () => {
		if (cameraType === 'back') {
			setCameraType('front')
		} else {
			setCameraType('back')
		}
	}
	const mut = useMutation(['update-favorite-photo'],()=>ProfileService.updateFavoritePhoto())
	return (
		<View style={styles.container}>
			{startCamera ? (
				<View
					style={{
						flex: 1,
						width: '100%'
					}}
				>
					{previewVisible && capturedImage ? (
						<CameraPreview
							photo={capturedImage}
							savePhoto={__savePhoto}
							retakePicture={__retakePicture}
						/>
					) : (
						<View className='relative flex-1'>
							<Camera
								type={cameraType}
								//   flashMode={flashMode}
								style={{ flex: 1 }}
								ref={r => {
									camera = r
								}}
							>
								<View
									style={{
										flex: 1,
										width: '100%',
										backgroundColor: 'transparent',
										flexDirection: 'row'
									}}
								>
									<View
										style={{
											position: 'absolute',
											left: '5%',
											top: '10%',
											flexDirection: 'column',
											justifyContent: 'space-between'
										}}
									>
										<TouchableOpacity
											onPress={__handleFlashMode}
											// style={{
											//   backgroundColor: flashMode === 'off' ? '#000' : '#fff',
											//   borderRadius: '50%',
											//   height: 25,
											//   width: 25
											// }}
										>
											<Text
												style={{
													fontSize: 20
												}}
											>
												⚡️
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={__switchCamera}
											// style={{
											//   marginTop: 20,
											//   borderRadius: '50%',
											//   height: 25,
											//   width: 25
											// }}
										>
											<Text
												style={{
													fontSize: 20
												}}
											>
												{cameraType === 'front' ? '🤳' : '📷'}
											</Text>
										</TouchableOpacity>
									</View>
									<View
										style={{
											position: 'absolute',
											bottom: 0,
											flexDirection: 'row',
											flex: 1,
											width: '100%',
											padding: 20,
											justifyContent: 'space-between'
										}}
									>
										<View
											style={{
												alignSelf: 'center',
												flex: 1,
												alignItems: 'center'
											}}
										>
											<TouchableOpacity
												onPress={__takePicture}
												style={{
													width: 70,
													height: 70,
													bottom: 0,
													borderRadius: 50,
													backgroundColor: '#fff'
												}}
											/>
										</View>
									</View>
								</View>
							</Camera>
						</View>
					)}
				</View>
			) : (
				<View
					style={{
						flex: 1,
						backgroundColor: '#fff',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<TouchableOpacity
						onPress={__startCamera}
						style={{
							width: 130,
							borderRadius: 4,
							backgroundColor: '#14274e',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							height: 40
						}}
					>
						<Text
							style={{
								color: '#fff',
								fontWeight: 'bold',
								textAlign: 'center'
							}}
						>
							Take picture
						</Text>
					</TouchableOpacity>
				</View>
			)}
			<TouchableOpacity onPress={()=>mut.mutate()}>
				<Text className='text-black w-20 h-20'>CLiCK</Text>
			</TouchableOpacity>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
	return (
		<View
			style={{
				backgroundColor: 'transparent',
				flex: 1,
				width: '100%',
				height: '100%'
			}}
		>
			<ImageBackground
				source={{ uri: photo && photo.uri }}
				style={{
					flex: 1
				}}
			>
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						padding: 15,
						justifyContent: 'flex-end'
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						<TouchableOpacity
							onPress={retakePicture}
							style={{
								width: 130,
								height: 40,

								alignItems: 'center',
								borderRadius: 4
							}}
						>
							<Text
								style={{
									color: '#fff',
									fontSize: 20
								}}
							>
								Re-take
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={savePhoto}
							style={{
								width: 130,
								height: 40,

								alignItems: 'center',
								borderRadius: 4
							}}
						>
							<Text
								style={{
									color: '#fff',
									fontSize: 20
								}}
							>
								save photo
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	)
}
