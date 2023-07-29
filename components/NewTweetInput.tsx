import { User, createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { cookies } from 'next/headers'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default function NewTweet({ user }: { user: User }) {
	async function handleSubmit(formData: FormData) {
		'use server'
		const title = String(formData.get('title'))
		const supabase = createServerActionClient<Database>({ cookies })
		const {
			data: { user }
		} = await supabase.auth.getUser()
		if (user) {
			await supabase.from('tweets').insert({ title, user_id: user.id })
			// refresh home
		}
	}

	return (
		<form action={handleSubmit} className='border border-gray-800 border-t-0'>
			<div className='flex py-8 px-4'>
				<div className='h-12 w-12'>
					<Image
						src={user.user_metadata.avatar_url}
						alt='user avatar'
						width={48}
						height={48}
						className='rounded-full'
					/>
				</div>
				<input
					name='title'
					className='bg-inherit flex-1 ml-2 text-2xl leading-loose placeholder-gray-500 px-2'
					placeholder='What is happening?!'
				/>
			</div>
		</form>
	)
}
