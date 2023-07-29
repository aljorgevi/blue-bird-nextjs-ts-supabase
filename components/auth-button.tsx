'use client'

import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

export function AuthButton({ session }: { session: Session | null }) {
	const supabase = createClientComponentClient()
	const router = useRouter()

	async function handleSinIn() {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `${location.origin}/auth/callback`
			}
		})
	}

	async function handleLogout() {
		await supabase.auth.signOut()
		router.refresh()
	}

	return session ? (
		<Button onClick={handleLogout}>Logout</Button>
	) : (
		<Button onClick={handleSinIn}>Login</Button>
	)
}
