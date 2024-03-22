import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { normalDate } from '../../comments/CommentElement'
import { Animated } from 'react-native'

interface IElementHeaderForCamera {
	cron: string
}

export const ElementHeaderForCamera: FC<IElementHeaderForCamera> = ({
	cron
}) => {
	const insets = useSafeAreaInsets()

	return (
		<View
			className={`bg-black justify-center`}
			style={{ marginTop: insets.top, paddingTop: 6, paddingBottom: 6 }}
		>
			<Text className='text-white text-2xl font-bold text-center justify-center '>
				My BePrime
			</Text>
			<Text className='text-white text-2xl font-bold text-center justify-center '>
				<TimerComponent receivedTime={new Date(cron)} />
			</Text>
		</View>
	)
}

const normalDate2 = (cron: string) => {
	const date = new Date()
	const ff = new Date()
	ff.setMinutes(date.getMinutes() - 2)
	// const standart = new Date()
	// standart.setMinutes(date.getMinutes() - 5)
	// if (date.getTime() - ff.getTime() < 1000 * 60 * 5) {
	// 	return `${
	// 		5 - (date.getTime() -
	// 			standart.getTime() -
	// 			(ff.getTime() - standart.getTime())) /
	// 		1000 /
	// 		60
	// 	}`
	// }
	const currentTime = new Date()
}
const TimerComponent = ({ receivedTime }: { receivedTime: Date }) => {
	const [timer, setTimer] = useState<string | null>(null)
	const standartMinutes = 5
	useEffect(() => {
		const updateTimer = () => {
			const currentTime = new Date()
			let differenceInSeconds =
				(currentTime.getTime() - receivedTime.getTime()) / 1000
			// Если разница меньше 5 минут
			if (differenceInSeconds < standartMinutes * 60) {
				const remainingSeconds = standartMinutes * 60 - differenceInSeconds
				const minutes = Math.floor(remainingSeconds / 60)
				const seconds = Math.floor(remainingSeconds % 60)
				setTimer(`0${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`)
			} else {
				differenceInSeconds = differenceInSeconds - standartMinutes * 60
				const hours = Math.floor(differenceInSeconds / 3600)
				const minutes = Math.floor(differenceInSeconds / 60 - hours * 60)
				const seconds = Math.floor(differenceInSeconds % 60)
				setTimer(
					`${hours < 10 ? `0${hours}` : hours} : ${
						minutes < 10 ? `0${minutes}` : minutes
					} : ${seconds < 10 ? `0${seconds}` : seconds}`
				)
			}
		}

		updateTimer() // Сначала обновляем таймер сразу после рендера

		// Обновляем таймер каждую секунду
		const timerInterval = setInterval(() => {
			updateTimer()
		}, 1000)

		// Очищаем интервал при размонтировании компонента
		return () => {
			clearInterval(timerInterval)
		}
	}, [receivedTime])

	return <Text>{timer}</Text>
}
