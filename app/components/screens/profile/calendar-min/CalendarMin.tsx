import { ProfileService } from '@/services/profile/profile.service'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import clsx from 'clsx'
declare global {
	interface Date {
		daysInMonth(): number
	}
} //@TASK
export const CalendarMin: FC = () => {
	const minDate = new Date()
	const addDate = new Date()
	let month = minDate.getMonth()

	Date.prototype.daysInMonth = function () {
		return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate()
	}
	addDate.setDate(addDate.getDate() - 7)
	const arrayDate = Array.from({ length: 14 }, (_, i) => {
		addDate.setDate(addDate.getDate() + 1)
		let curDate = addDate.getDate()
		return curDate
	})
	return (
		<View className='bg-gray-700 rounded-xl p-4 mt-5'>
			<Text className='text-white mb-4 text-2xl font-bold'>Last 14 days</Text>

			<View className='text-white flex-row w-full mx-2 flex-wrap '>
				{arrayDate.map(el => (
					<View
						key={el}
						className={clsx(
							'w-10 rounded-lg items-center mb-5',
							el === minDate.getDate() && 'bg-white text-black'
						)}
					>
						<Text
							className={clsx(
								'text-white text-xl',
								el === minDate.getDate() && ' text-black'
							)}
						>
							{el}
						</Text>
					</View>
				))}
			</View>
			<View>
				<Pressable className='p-3 mx-auto my-5 rounded-2xl border-2 border-white'>
					<Text className='text-white text-xl'>View all my memories</Text>
				</Pressable>
			</View>
		</View>
	)
}
