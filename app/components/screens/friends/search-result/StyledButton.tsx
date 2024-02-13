import { TouchableOpacity, ViewStyle } from 'react-native'
import { IStyledButton } from './types'
import { FC } from 'react'

export const StyledButton: FC<IStyledButton> = ({
	styles,
	children,
	...rest
}) => {
	return (
		<TouchableOpacity
			style={[
				{
					paddingTop: 5,
					paddingBottom: 5,
					borderRadius: 13,
					display: 'flex',
					justifyContent: 'center'
				},
				AddingStylesButton[styles]
			]}
			{...rest}
			className='border-stone-700 '
		>
			{children}
		</TouchableOpacity>
	)
}

const AddingStylesButton: { close: ViewStyle; delete: ViewStyle } = {
	delete: {
		backgroundColor: '#d42a2a',
		width: '100%',
		paddingBottom: 9,
		paddingTop: 9,
		height: 50
	},
	close: {
		borderWidth: 2,
		borderColor: 'rgb(68 64 60)',
		width: '100%',
		paddingBottom: 9,
		paddingTop: 9,
		height: 50
	}
}
