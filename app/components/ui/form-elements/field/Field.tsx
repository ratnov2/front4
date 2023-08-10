import { FC } from 'react'
import { View, Text, TextInput } from 'react-native'
import { IField } from './filed.interface'
import { Controller } from 'react-hook-form'
import cn from 'clsx'

const Field = <T extends Record<string, any>>({
	control,
	rules,
	name,
	className,
	...rest
}: IField<T>): JSX.Element => {
	return (
		<Controller
			name={name}
			control={control}
			rules={rules as any}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error }
			}) => (
				<>
					<View
						className={cn(
							'bg-[#232323] w-full border rounded-lg pb-4 pt-2.5 px-4 my-1.5',
							error ? 'border-red' : 'border-transparent'
						)}
					>
						<TextInput
							autoCapitalize='none'
							onChangeText={onChange}
							onBlur={onBlur}
							value={(value || '').toString()}
							className='text-white text-base'
							{...rest}
						/>
					</View>
					{error && <Text className='text-red-700'>{error.message}</Text>}
				</>
			)}
		/>
	)
}

export default Field
