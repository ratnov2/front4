import { FC, PropsWithChildren } from 'react'
import {
	View,
	TouchableWithoutFeedback,
	Keyboard,
	ViewProps
} from 'react-native'

const DismissKeyboard: FC<PropsWithChildren<ViewProps>> = ({
	children,
	...rest
}) => {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={{ flex: 1 }} {...rest}>
				{children}
			</View>
		</TouchableWithoutFeedback>
	)
}

export default DismissKeyboard
