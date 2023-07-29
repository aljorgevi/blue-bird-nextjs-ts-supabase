'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const useRealTimeTweets = () => {
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()

	useEffect(() => {
		const channel = supabase
			.channel('realtime-tweets')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'tweets'
				},
				payload => {
					console.log('* payload', payload)
					router.refresh()
					// if (payload.type === 'INSERT') {
					// addOptimisticTweet(payload.new)
					// }
				}
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [supabase, router])

	return null
}
