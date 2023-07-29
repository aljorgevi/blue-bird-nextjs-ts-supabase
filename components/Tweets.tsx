'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Likes } from './Likes'
import { useEffect, experimental_useOptimistic as useOptimistic } from 'react'
import { useRouter } from 'next/navigation'
import { useRealTimeTweets } from '@/hooks/useRealTimeTweets'
import Image from 'next/image'

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
	useRealTimeTweets()
	const router = useRouter()
	const [optimisticTweets, addOptimisticTweet] = useOptimistic<TweetWithAuthor[], TweetWithAuthor>(
		tweets,
		(currentOptimisticTweets, newTweet) => {
			const newOptimisticTweets = [...currentOptimisticTweets]
			const index = newOptimisticTweets.findIndex(tweet => tweet.id === newTweet.id)

			newOptimisticTweets[index] = newTweet

			return newOptimisticTweets
		}
	)

	return optimisticTweets.map(tweet => (
		<div key={tweet.id} className='border border-gray-800 border-t-0 px-4 py-8 flex'>
			{/* <div className='my-2'>{tweet.title}</div>
			<div className='my-2'>
				{tweet.author.name} {tweet.author.username}
			</div>

			<Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} /> */}
			<div className='h-12 w-12'>
				<Image
					className='rounded-full'
					src={tweet.author.avatar_url}
					alt='tweet user avatar'
					width={48}
					height={48}
				/>
			</div>
			<div className='ml-4'>
				<p>
					<span className='font-bold'>{tweet.author.name}</span>
					<span className='text-sm ml-2 text-gray-400'>{tweet.author.username}</span>
				</p>
				<p>{tweet.title}</p>
				<Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
			</div>
		</div>
	))
}
