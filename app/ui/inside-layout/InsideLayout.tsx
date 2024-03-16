import { FC, ReactNode } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const InsideLayout: FC<{ children: ReactNode }> = ({ children }) => {
	const pt = useSafeAreaInsets().top
	//console.log(pt)

	return <View >{children}</View>
}
