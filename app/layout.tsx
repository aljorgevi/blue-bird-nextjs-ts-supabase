import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Blue bird',
	description: 'A twitter clone'
}

export const dynamic = 'force-dynamic'

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className='bg-gray-900 min-h-screen flex text-white'>{children}</body>
		</html>
	)
}
