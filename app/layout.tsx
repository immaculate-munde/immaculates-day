import type { Metadata } from 'next'
import { Dancing_Script, Lato } from 'next/font/google'
import './globals.css'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Immaculate's Day! 🎀",
  description: "Leave a birthday wish for the birthday girl 🌸",
  icons: {
    icon: '/immaculate.png',
    shortcut: '/immaculate.png',
    apple: '/immaculate.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${lato.variable}`}>
      <body className="min-h-screen hearts-bg">{children}</body>
    </html>
  )
}
