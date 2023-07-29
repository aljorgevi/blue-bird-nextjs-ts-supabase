import { AuthButton } from '@/components/auth-button'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import GitHubButton from './GitHubButton'

export default async function Login() {
	const supabase = createServerComponentClient<Database>({ cookies })
	const {
		data: { session }
	} = await supabase.auth.getSession()

	if (session) {
		redirect('/')
	}

	return (
		<div
			className='
				flex
				flex-col
				items-center
				justify-center
				min-h-screen
				py-2
			'
		>
			<div className='my-2'>
				{/* <AuthButton session={session} /> */}
				<GitHubButton />
			</div>
		</div>
	)
}
