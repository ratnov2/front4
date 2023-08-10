import { FC, PropsWithChildren } from 'react'
import { Text, Pressable } from 'react-native'
import { IButton } from './button.interface'
import cn from 'clsx'

const Button: FC<PropsWithChildren<IButton>> = ({
	className,
	icon,
	children,
	...rest
}) => {
	return (
		<Pressable
			className={cn('self-center mt-3.5 bg-red-800', className)}
			{...rest}
		>
			<Text className='text-white'>{children}</Text>
		</Pressable>
	)
}

export default Button
