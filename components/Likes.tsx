'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export function Likes({
	tweet,
	addOptimisticTweet
}: {
	tweet: TweetWithAuthor
	addOptimisticTweet: (newTweet: TweetWithAuthor) => void
}) {
	const router = useRouter()

	async function handleLikes() {
		const supabase = createClientComponentClient<Database>()
		const {
			data: { user }
		} = await supabase.auth.getUser()

		if (user) {
			if (tweet.userHasLikedTweet) {
				addOptimisticTweet({
					...tweet,
					likes: tweet.likes - 1,
					userHasLikedTweet: !tweet.userHasLikedTweet
				})

				await supabase.from('likes').delete().match({ user_id: user?.id, tweet_id: tweet.id })
			} else {
				addOptimisticTweet({
					...tweet,
					likes: tweet.likes + 1,
					userHasLikedTweet: !tweet.userHasLikedTweet
				})

				const { data, error } = await supabase
					.from('likes')
					.insert({ user_id: user?.id, tweet_id: tweet.id })

				console.log('* inserting like', {
					data,
					error
				})
			}
		}

		router.refresh()
	}

	return <button onClick={handleLikes}>{tweet.likes} likes</button>
}
