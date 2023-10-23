import { FC } from 'react'
import { Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import clsx from 'clsx'

interface IPinBlock {
	type: 'add' | 'block'
}

export const PinBlock: FC<IPinBlock> = ({ type }) => {
	return (
		<View
			className={clsx(
				'w-[30%] h-32 border-2 flex-col border-dotted border-gray-500 rounded-2xl justify-center',
				type === 'block' && 'border-solid border-[#3e3e3e]'
			)}
		>
			<View className='m-auto'>
				{type === 'add' ? (
					<AntDesign name='plus' size={24} color='white' />
				) : (
					<AntDesign name='lock' size={24} color='#3e3e3e' />
				)}
			</View>
		</View>
	)
}
