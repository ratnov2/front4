import Field from '@/components/ui/form-elements/field/Field'
import { validEmail } from '@/shared/reges'
import { IAuthFormData } from '@/shared/types/auth.interface'
import { FC } from 'react'
import { Control } from 'react-hook-form'
import { View, Text } from 'react-native'

interface IAuthFields {
	control: Control<IAuthFormData> | any
	isPassRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({ control, isPassRequired }) => {
	return (
		<>
			<Field<IAuthFormData>
				control={control}
				name='email'
				placeholder='Enter email'
				rules={{
					required: 'Email',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email address'
					}
				}}
				keyboardType='email-address'
			/>
			<Field<IAuthFormData>
				control={control}
				name='password'
				placeholder='Enter password'
				rules={{
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'Password should be minimum 6 characters long'
					}
				}}
				keyboardType='email-address'
			/>
		</>
	)
}

export default AuthFields
