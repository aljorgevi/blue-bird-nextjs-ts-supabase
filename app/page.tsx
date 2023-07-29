import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButton } from '../components/auth-button'
import AuthButtonServer from '@/components/auth-button-server'
import { Textarea } from '@/components/ui/textarea'

import { redirect } from 'next/navigation'
import NewTweetInput from '@/components/NewTweetInput'
import { Likes } from '@/components/Likes'
import Tweets from '@/components/Tweets'

export const dynamic = 'force-dynamic'

export default async function Home() {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { session }
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/login')
	}

	const { data } = await supabase.from('tweets').select('*, author: profiles(*), likes(user_id)')

	const tweets = data?.map(tweet => ({
		...tweet,
		author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
		userHasLikedTweet: tweet.likes.some(like => like.user_id === session?.user.id),
		likes: tweet.likes.length
	}))

	if (!tweets) return null

	return (
		<div className='w-full max-w-xl mx-auto'>
			<div className='flex justify-between px-4 py-6 border border-gray-800 border-t-0'>
				<h1 className='text-xl font-bold'>Home</h1>
				<AuthButtonServer />
			</div>

			<NewTweetInput user={session.user} />

			<Tweets tweets={tweets} />
		</div>
	)
}
