import React, { useState, useEffect, memo, FC } from 'react'
import { FlatList, View } from 'react-native'
import { CommentElement } from './CommentElement'
import { IPost } from '@/services/profile/profile.service'

interface IYour {
	comments2: IPost[]
	component: JSX.Element
}

export const YourComponent: FC<IYour> = memo(({ comments2, component }) => {
	const renderItem = ({ item }: { item: IPost }) => (
		<CommentElement
			message={item.comment}
			avatar={item.avatar}
			created={item.created}
			email={item.firstName}
			key={item.comment}
			firstName={item.firstName}
			id={item._id}
			isLoading={(item as any)?.isLoading}
		/>
	)

	return (
		<FlatList
			ListHeaderComponent={component}
			data={comments2}
			renderItem={renderItem}
			keyExtractor={item => item.IDD} // В качестве ключей используем item.created
		/>
	)
})
export const VirtualizedList = ({ children, shouldScroll }: any) => {
	return (
		<FlatList
			data={[]}
			scrollEnabled={shouldScroll}
			keyExtractor={() => 'key'}
			renderItem={null}
			ListHeaderComponent={<>{children}</>}
		/>
	)
}
