import Field from '@/ui/form-elements/field/Field'
import { validEmail } from '@/shared/reges'
import { FC } from 'react'
import { Control } from 'react-hook-form'
import { View, Text } from 'react-native'
import { TypeEditProfile } from '@/services/profile/profile.service'

export interface IEditProfileFields {
	control: Control<TypeEditProfile> | any
	isPassRequired?: boolean
	isLoading: boolean
}

const EditProfileFields: FC<IEditProfileFields> = ({
	control,
	isLoading,
	isPassRequired
}) => {
	return (
		<>
			<View className='mt-3'>
				<Text className='text-white text-xl'>Введите ваше имя</Text>
				<Field<TypeEditProfile>
					control={control}
					name='firstName'
					placeholder='Enter firstName'
					isLoading={isLoading}
					// isLoading={false}
					// rules={{
					// 	required: 'firstName',
					// }}
					keyboardType='default'
				/>
			</View>
			<Text className='text-white  text-xl'>Введите вашу фамилию</Text>
			<Field<TypeEditProfile>
				control={control}
				name='lastName'
				placeholder='Enter lastName'
				isLoading={isLoading}
				// secureTextEntry
				// rules={{
				// 	required: 'Password is required',
				// }}
				keyboardType='default'
			/>
		</>
	)
}

export default EditProfileFields
