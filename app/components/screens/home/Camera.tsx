//ts-nocheck
import { StatusBar } from 'expo-status-bar'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
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
import { Camera } from 'expo-camera'
import { useMutation } from '@tanstack/react-query'
import { FilesService } from '@/services/files/files.service'
import { ProfileService } from '@/services/profile/profile.service'
import loadingSvg from '@/assets/loading.gif'
let camera: Camera | null
let camera2: Camera | null

interface ICameraComp {
	startCamera: boolean
	setStartCamera: Dispatch<SetStateAction<boolean>>
	__startCamera: () => void
}

export const CameraComp: FC<ICameraComp> = ({
	__startCamera,
	setStartCamera,
	startCamera
}) => {
	const { mutate } = useMutation(['push-photo'], (form: FormData) =>
		FilesService.pushPhoto(form)
	)
	const [loading, setLoading] = useState(false)
	///
	// const [startCamera, setStartCamera] = useState(false)
	const [previewVisible, setPreviewVisible] = useState(false)
	const [capturedImage, setCapturedImage] = useState<any>(null)
	//@ts-ignore
	const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
	const [flashMode, setFlashMode] = useState('off')

	// const __startCamera = async () => {
	// 	const { status } = await Camera.requestCameraPermissionsAsync()
	// 	console.log(status)
	// 	if (status === 'granted') {
	// 		setStartCamera(true)
	// 	} else {
	// 		Alert.alert('Access denied')
	// 	}
	// }
	const __takePicture = async () => {
		setLoading(true)

		try {
			const photo: any = await camera?.takePictureAsync()
			setPreviewVisible(true)
			setCapturedImage(photo)
			setLoading(false)
		
		} catch (e) {
		
		}
	}
	const __savePhoto = () => {
		setStartCamera(false)
		const formData = new FormData()

		const uri = capturedImage.uri
		//@ts-ignore
		formData.append('image', {
			uri: capturedImage.uri,
			type: mime.getType(uri),
			name: uri.split('/').pop()
		})
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
	return (
		<View style={styles.container}>
			{/* {loading ? (
				<View>
					<Image source={loadingSvg} />
				</View>
			)  */}
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
							loading={loading}
						/>
					) : (
						<View
							className={`relative flex-1 
					
						`}
						>
							<View
								className={`relative flex-1 
							${loading && 'fixed left-96'}
							`}
								// ${
								// 	loading && 'absolute left-[100000px]'
								// }
							>
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
							{/* {loading && (
								<View className=''>
									<Text>wgelknegwjknewgnegwl</Text>
								</View>
							)} */}
						</View>
					)}
				</View>
			) : (
				<View></View>
			)}

			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	}
})

const CameraPreview = ({ photo, retakePicture, savePhoto, loading }: any) => {
	return (
		<View
			style={{
				backgroundColor: 'transparent',
				flex: 1,
				width: '100%',
				height: '100%'
			}}
		>
			{!!loading ? (
				<View>
					<Image source={loadingSvg} />
				</View>
			) : (
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
			)}
		</View>
	)
}
