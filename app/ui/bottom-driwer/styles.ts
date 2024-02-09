import { StyleSheet } from 'react-native'
import { screenHeight } from './constants'

export const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		borderRadius: 20,
		height: screenHeight
	},
	handleContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	handle: {
    width: '100%',
  }
})
