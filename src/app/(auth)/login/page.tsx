import { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account and access our blog magazine community',
}

export default function LoginPage() {
  return <LoginClient />
}
