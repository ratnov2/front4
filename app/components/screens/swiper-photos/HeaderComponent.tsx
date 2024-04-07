import { ProfileService } from '@/services/profile/profile.service'
import { IProfile } from '@/shared/types/profile.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { BlurView } from 'expo-blur'
import { FC, memo, useRef, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DraggableImg } from '../comments/DraggableImg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Draggable } from '../home/Draggable/Draggable'

interface IHeaderComponent {
	frontPhoto: string
	backPhoto: string
}

export const HeaderComponent: FC<IHeaderComponent> = memo(
	({ backPhoto, frontPhoto }) => {
		const queryClient = useQueryClient()

		const user = useQuery<IProfile>(['get-profile'])

		const { top } = useSafeAreaInsets()

		return (
			<View className='flex-1' style={{ aspectRatio: 9 / 16 }}>
				<View style={{ height: top + 60 }} />
				<ImageBackground
					source={{
						uri: frontPhoto
					}}
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%'
					}}
				/>

				<BlurView
					intensity={60}
					style={{
						...{
							position: 'absolute',
							width: '100%',
							height: '100%'
						}
					}}
				/>
				<View
					className='mx-4 flex-1 rounded-xl overflow-hidden bg-white'
					
				>
					<Draggable
						img1={frontPhoto}
						img2={backPhoto}
						isVisibleElementsPhoto={true}
					/>
				</View>
				<View className='h-20' />
			</View>
		)
	}
)
