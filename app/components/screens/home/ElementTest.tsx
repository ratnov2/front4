import {
	Image,
	ImageBackground,
	ImageProps,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View
} from 'react-native'
import bg from '@/assets/bg-red.jpg'
import bg2 from '@/assets/user.png'
import { FC, useEffect, useRef, useState } from 'react'
import { PanResponder } from 'react-native'

interface IElementTest {
	img1: string
	img2: string
}

export const ElementTest: FC<IElementTest> = ({ img1, img2 }) => {
	const ref = useRef<View>(null)
	const imageRef = useRef<Image>(null)

	const [position, setPosition] = useState({ x: 20, y: 20 })
	const [absolutePosImgBackground, setAbsolutePosImgBackground] = useState({
		x: 0,
		y: 0,
		maxX: 0,
		maxY: 0
	})
	const [measureDraggableImg, setMeasureDraggableImg] = useState({
		x: 0,
		y: 0,
		height: 0,
		width: 0
	})

	const isMoveX = (moveX: number) => {
		const { x, maxX } = absolutePosImgBackground
		const { width } = measureDraggableImg
		if (moveX < width / 2) return 0
		if (moveX + width / 2 > maxX) return maxX - width
		return moveX - width / 2
	}

	const isMoveY = (moveY: number) => {
		const { y, maxY } = absolutePosImgBackground
		const { height } = measureDraggableImg
		if (moveY < height / 2 + y) return 0
		if (moveY > maxY - y + height) return maxY - y - height / 2 + 30
		return moveY - height / 2 - y
	}
	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (_, gesture) => {
			setPosition({
				x: isMoveX(gesture.moveX), // Ограничение движения по горизонтали
				y: isMoveY(gesture.moveY) // Ограничение движения по вертикали
			})
		},
        
		onPanResponderRelease: (f, gesture) => {
            if( position.x < 80 && position.x > -20 && position.y > -20 && position.y < 80){
                setState(!state)
            }
            
			setPosition({ x: 20, y: 20 })

		}
	})
	useEffect(() => {
		ref?.current?.measureInWindow((x, y, width, height) => {
			setAbsolutePosImgBackground({
				x,
				y,
				maxX: width,
				maxY: height
			})
		})
	}, [ref])
	useEffect(() => {
		imageRef?.current?.measureInWindow((x, y, width, height) => {
			setMeasureDraggableImg({
				x,
				y,
				height,
				width
			})
		})
	}, [imageRef])
	const [state, setState] = useState(true)
	return (
		<View style={styles.container}>
			<Pressable style={{ flex: 1 }} ref={ref}>
				<Image
					source={state ? { uri: img1 } : { uri: img2 }}
					style={styles.backgroundImage}
				/>
			</Pressable>
			<View
				style={[
					styles.overlayImageContainer,
					{
						left: position.x,
						top: position.y
					}
				]}
				ref={imageRef}
				{...panResponder.panHandlers}
			>
				{/* <TouchableOpacity
                 onMagicTap={() => setState(!state)} 
                 className='flex-1 w-full'
                 > */}
					<ImageBackground
						source={state ? { uri: img2 } : { uri: img1 }}
						style={styles.overlayImage}
					/>
				{/* </TouchableOpacity> */}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative'
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'cover'
	},
	overlayImageContainer: {
		position: 'absolute',
		overflow: 'hidden',
		// left: '2%',
		// top: '2%',
		backgroundColor: 'white',
		borderRadius: 10,
		//   width: '4%',
		width: 110,
		// width: 10,
		height: 130,
		justifyContent: 'center',
		alignItems: 'center'
	},
	overlayImage: {
		flex: 1,

		//resizeMode: 'stretch',
		width: '100%',
		//aspectRatio: 4 / 3,
		borderRadius: 10
	}
})
