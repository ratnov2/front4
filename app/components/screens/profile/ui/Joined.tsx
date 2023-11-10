import { Text } from 'react-native'
import { JoinedDate } from '../user-info/UserInfo'

export const Joined = ({ date }: { date: string }) => {
	return <Text className='text-gray-400 text-lg mt-5'>{JoinedDate(date)}</Text>
}
