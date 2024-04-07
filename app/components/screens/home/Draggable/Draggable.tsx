import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import { FC, memo, useRef, useState } from 'react'

import { ImageBackground, Pressable, StyleSheet } from 'react-native'
import { Image, View } from 'react-native'
import { ImageZoom } from '@likashefqet/react-native-image-zoom'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated'

interface IDraggable {
	img1: string
	img2: string
	toggleScroll?: (scroll: boolean) => any
	setIsVisibleElementsPhoto?: (type: boolean) => void
	isVisibleElementsPhoto: boolean
}

export const Draggable: FC<IDraggable> = memo(
	({
		img1,
		img2,
		toggleScroll,
		setIsVisibleElementsPhoto,
		isVisibleElementsPhoto
	}) => {
		const ref = useRef<View>(null)
		const imageRef = useRef<Image>(null)

		const [mainImgMeasure, setMainImgMeasure] = useState({
			x: 0,
			y: 0,
			width: 0,
			height: 0
		})

		const [state, setState] = useState(true)

		const imageZoomRef = useRef(null)
		const [isVisible, setVisible] = useState(true)

		const onAnimationStart = () => {
			setVisible(false)
		}

		const onAnimationEnd = (finished?: boolean) => {
			if (finished) {
				setVisible(true)
			}
		}

		const onLeft = useSharedValue(true)
		const BEGIN_TRANSLATE = 10
		const position = useSharedValue(BEGIN_TRANSLATE)
		const position2 = useSharedValue(BEGIN_TRANSLATE)
		const END_POSITION = mainImgMeasure.width - 110
		const END_POSITION_Y = mainImgMeasure.height - 130

		// 	maxY={mainImgMeasure.height}
		const panGesture = Gesture.Pan()
			.onUpdate(e => {
				if (onLeft.value) {
					if (e.translationX < -BEGIN_TRANSLATE) {
						position.value = 0
					} else if (e.translationX > END_POSITION - BEGIN_TRANSLATE) {
						position.value = END_POSITION
					} else {
						position.value = e.translationX + BEGIN_TRANSLATE
					}
					if (e.translationY < -BEGIN_TRANSLATE) {
						position2.value = 0
					} else if (e.translationY > END_POSITION_Y - BEGIN_TRANSLATE) {
						position2.value = END_POSITION_Y
					} else {
						position2.value = e.translationY + BEGIN_TRANSLATE
					}
				} else {
					if (e.translationX > BEGIN_TRANSLATE) {
						position.value = END_POSITION
					} else if (e.translationX < -END_POSITION + BEGIN_TRANSLATE) {
						position.value = 0
					} else {
						position.value = END_POSITION + e.translationX - BEGIN_TRANSLATE
					}
					if (e.translationY < -BEGIN_TRANSLATE) {
						position2.value = 0
					} else if (e.translationY > END_POSITION_Y - BEGIN_TRANSLATE) {
						position2.value = END_POSITION_Y
					} else {
						position2.value = e.translationY + BEGIN_TRANSLATE
					}
				}
			})
			.onEnd(e => {
				if (position.value > END_POSITION / 2) {
					position.value = withTiming(END_POSITION - BEGIN_TRANSLATE, {
						duration: 300
					})
					position2.value = withTiming(BEGIN_TRANSLATE, { duration: 300 })
					onLeft.value = false
				} else {
					position2.value = withTiming(BEGIN_TRANSLATE, { duration: 300 })
					position.value = withTiming(BEGIN_TRANSLATE, { duration: 300 })
					onLeft.value = true
				}
			})

		const animatedStyle = useAnimatedStyle(() => ({
			transform: [
				{ translateX: position.value },
				{ translateY: position2.value }
			]
		}))
		return (
			<View style={styles.container}>
				<View
					ref={imageRef}
					onLayout={e => setMainImgMeasure(e.nativeEvent.layout)}
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<ImageZoom
						ref={imageZoomRef}
						
						uri={state ? BaseImageUrl2(img1) : BaseImageUrl2(img2)}
						style={{ width: '100%' }}
						minScale={1}
						maxScale={5}
						isPanEnabled={false}
						doubleTapScale={3}
						minPanPointers={1}
						onInteractionStart={() => {
							onAnimationStart()
						}}
						onInteractionEnd={() => {
							// onAnimationStart()
							// setTimeout(() => {
							// 	imageZoomRef.current?.reset()
							// }, 3000)
						}}
						onPinchStart={() => console.log('onPinchStart')}
						onPinchEnd={zoomType => {
							onAnimationStart()
							setTimeout(() => {
								imageZoomRef.current?.reset()
							}, 10)
						}}
						onResetAnimationEnd={finished => {
							onAnimationEnd(finished)
						}}
						resizeMode='cover'
						
					/>
				</View>

				{isVisibleElementsPhoto && (
					// <Pressable
					// 	className='flex-1 absolute'
					// 	onPress={() => setState(!state)}
					// >
					<GestureDetector gesture={panGesture}>
						<Animated.View style={[styles.box, animatedStyle]} ref={ref}>
							<Pressable onPress={() => setState(!state)}>
								<View
									style={styles.overlayImageContainer}
									ref={ref}
									className='border-2 border-black'
								>
									<ImageBackground
										source={
											state
												? { uri: BaseImageUrl2(img2) }
												: { uri: BaseImageUrl2(img1) }
										}
										className='bg-black'
										style={styles.overlayImage}
									/>
								</View>
							</Pressable>
						</Animated.View>
					</GestureDetector>
				)}
			</View>
		)
	}
)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative'
	},
	box: {
		height: 130,
		width: 110,
		backgroundColor: '#b58df1',
		borderRadius: 20,
		marginBottom: 30,
		position: 'absolute'
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover',
		backgroundColor: 'black'
	},
	overlayImageContainer: {
		overflow: 'hidden',
		backgroundColor: 'white',
		borderRadius: 10,
		width: 110,
		height: 130,
		justifyContent: 'center',
		alignItems: 'center'
	},
	overlayImage: {
		flex: 1,
		width: '100%',
		borderRadius: 10
	}
})
