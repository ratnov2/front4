//ts-nocheck
import React from 'react'
// import * as Settings from 'expo-settings'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Inside } from './Inside'
export default function Home() {
	return (
		<SafeAreaProvider>
			<Inside />
		</SafeAreaProvider>
	)
}
