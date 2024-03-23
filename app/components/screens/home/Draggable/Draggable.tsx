import { BaseImageUrl2 } from '@/services/api/interceptors.api'
import { FC, memo, useEffect, useRef, useState } from 'react'
import {
	ImageBackground,
	Pressable,
	Touchable,
	TouchableOpacity
} from 'react-native'
import { StyleSheet } from 'react-native'
import { Image, PanResponder, View } from 'react-native'
import Drag from 'react-native-draggable'

interface IDraggable {
	img1: string
	img2: string
	toggleScroll: (scroll: boolean) => any
	
}

export const Draggable: FC<IDraggable> = memo(
	({ img1, img2, toggleScroll }) => {
		const ref = useRef<View>(null)
		const imageRef = useRef<Image>(null)

		const [mainImgMeasure, setMainImgMeasure] = useState({
			x: 0,
			y: 0,
			width: 0,
			height: 0
		})

		const [state, setState] = useState(true)

		return (
			<View style={styles.container}>
				<View
					ref={imageRef}
					className='flex-1'
					// onLayout={e => setMainImgMeasure(e.nativeEvent.layout)}
				>
					<Image
						source={
							state
								? { uri: BaseImageUrl2(img1) }
								: { uri: BaseImageUrl2(img2) }
						}
						style={styles.backgroundImage}
					/>
				</View>
				<Drag
					x={10}
					y={10}
					minY={0}
					minX={0}
					// maxX={mainImgMeasure.width}
					// maxY={mainImgMeasure.height}
					onPressIn={() => toggleScroll(false)}
					onPressOut={() => toggleScroll(true)}
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
