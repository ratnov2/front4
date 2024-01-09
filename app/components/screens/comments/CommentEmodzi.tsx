import { Image, Text } from 'react-native'
import { View } from 'react-native'

export const EmodziComment = () => {
	return (
		<View>
			<Devider />
			<View className='flex-row'>
				{emodzi.map((emodzi, key) => (
					<View key={key}>
						<View className='relative'>
							<Image source={{ uri: emodzi.source }} />
							{/* emodzi */}
						</View>
						<Text>{emodzi.firstName}</Text>
					</View>
				))}
			</View>
			<Devider />
		</View>
	)
}

const Devider = () => {
	return <View className='w-full bg-zinc-900 h-[0.4px]' />
}

const emodzi = [
	{
		firstName: 'hello',
		source:
			'https://fonoteka.top/uploads/posts/2022-09/1663777799_5-phonoteka-org-p-emodzhi-bez-fona-instagram-13.jpg'
	},
	{
		firstName: 'hello',
		source:
			'https://fonoteka.top/uploads/posts/2022-09/1663777799_5-phonoteka-org-p-emodzhi-bez-fona-instagram-13.jpg'
	},
	{
		firstName: 'hello',
		source:
			'https://fonoteka.top/uploads/posts/2022-09/1663777799_5-phonoteka-org-p-emodzhi-bez-fona-instagram-13.jpg'
	},
	{
		firstName: 'hello',
		source:
			'https://fonoteka.top/uploads/posts/2022-09/1663777799_5-phonoteka-org-p-emodzhi-bez-fona-instagram-13.jpg'
	}
]
