import { EvilIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ISearchInput {
	value: string
	handlerChangeText: (text: string) => void
}

export const SearchInput: FC<ISearchInput> = ({ value, handlerChangeText }) => {
	const insets = useSafeAreaInsets()
	return (
		<View
			// paddingLeft: 14, paddingRight: 14
			className='relative z-20'
			style={{ marginTop: insets.top + 50 }}
		>
			<View className='flex-row w-full relative'>
				<TextInput
					className='bg-zinc-800 p-2 pl-10 rounded-2xl text-white flex-1 text-xl'
					placeholder='Add or search friends'
					placeholderTextColor='rgba(196, 196, 196, 0.45)'
					value={value}
					onChangeText={e => handlerChangeText(e)}
				/>
				<EvilIcons
					name='search'
					size={30}
					style={{
						position: 'absolute',
						left: 6,
						top: 12,
						color: 'rgba(196, 196, 196, 0.45)'
					}}
				/>

				{value && (
					<TouchableOpacity
						className='items-center flex justify-center mx-3 text-bold'
						onPress={() => {
							handlerChangeText('')
							Keyboard.dismiss()
						}}
					>
						<Text className='text-white'>Cancel</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}
