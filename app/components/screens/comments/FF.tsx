import React, {
	useState,
	useEffect,
	memo,
	FC,
	forwardRef,
	ForwardedRef
} from 'react'
import { FlatList, LayoutChangeEvent, View } from 'react-native'
import { CommentElement } from './CommentElement'
import { IPost } from '@/services/profile/profile.service'

interface IYour {
	comments2: IPost[]
	component: JSX.Element
}

interface IVirtualizedList {
	children: React.ReactNode
	shouldScroll: boolean
	setHeight: (height: number) => void
}

export const VirtualizedList: FC<IVirtualizedList> = forwardRef(
	({ children, shouldScroll, setHeight }, ref: ForwardedRef<FlatList>) => {
		const handleLayout = (event: LayoutChangeEvent) => {
			const { height } = event.nativeEvent.layout
			//setHeight(height)
		}
		return (
			<FlatList
				showsVerticalScrollIndicator={false}
				onLayout={handleLayout}
				ref={ref}
				data={[]}
				scrollEnabled={shouldScroll}
				keyExtractor={() => 'key'}
				renderItem={null}
				keyboardShouldPersistTaps='handled'
				ListHeaderComponent={<>{children}</>}
			/>
		)
	}
)
