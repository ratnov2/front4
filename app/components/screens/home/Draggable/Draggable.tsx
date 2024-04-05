import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import { LinearGradient } from 'expo-linear-gradient'
import { FC, memo, useEffect, useRef, useState } from 'react'
import {
	Animated,
	ImageBackground,
	Pressable,
	Touchable,
	TouchableOpacity
} from 'react-native'
import { StyleSheet } from 'react-native'
import { Image, PanResponder, View } from 'react-native'
import Drag from 'react-native-draggable'
import {
	HandlerStateChangeEvent,
	PinchGestureHandler,
	PinchGestureHandlerEventPayload,
	State
} from 'react-native-gesture-handler'

interface IDraggable {
	img1: string
	img2: string
	toggleScroll: (scroll: boolean) => any
	setIsVisibleElementsPhoto: (type: boolean) => void
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
		const [scale, setScale] = useState(new Animated.Value(1))

		const onZoomEvent = Animated.event(
			[
				{
					nativeEvent: {
						scale: scale
					}
				}
			],
			{
				useNativeDriver: true
			}
		)

		const onZoomStateChange = (
			event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>
		) => {
			setIsVisibleElementsPhoto(false)
			if (event.nativeEvent.oldState === State.ACTIVE) {
				Animated.spring(scale, {
					toValue: 1,
					useNativeDriver: true
				}).start()
			}
		}

		return (
			<View style={styles.container}>
				<View
					ref={imageRef}
					onLayout={e => setMainImgMeasure(e.nativeEvent.layout)}
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<PinchGestureHandler
						onGestureEvent={onZoomEvent}
						onEnded={() => setIsVisibleElementsPhoto(true)}
						onHandlerStateChange={onZoomStateChange}
					>
						<Animated.Image
							source={
								state
									? { uri: BaseImageUrl2(img1) }
									: { uri: BaseImageUrl2(img2) }
							}
							style={{
								transform: [{ scale }]
							}}
							className='flex-1 w-full h-full rounded-2xl'
						/>
					</PinchGestureHandler>
				</View>
				
				{isVisibleElementsPhoto && (
					<Drag
						x={10}
						y={10}
						minY={0}
						minX={0}
						maxX={mainImgMeasure.width}
						maxY={mainImgMeasure.height}
						onPressIn={async () => toggleScroll(false)}
						onPressOut={async () => toggleScroll(true)}
						onShortPressRelease={() => setState(!state)}
						shouldReverse
					>
						<View style={styles.overlayImageContainer} ref={ref}>
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
					</Drag>
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
