import Link from 'next/link'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const socials = [
  {
    name: 'Login with Google',
    href: '/auth/google', // Replace with your actual OAuth URL
    icon: (props: React.SVGProps<SVGSVGElement>) => <FcGoogle {...props} />,
  },
  {
    name: 'Login with Facebook',
    href: '/auth/facebook', // Replace with your actual OAuth URL
    icon: () => (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2]">
        <FaFacebookF size={12} color="white" />
      </span>
    ),
  },
]

interface SocialLoginProps {
  className?: string
}

export default function SocialLogin({ className = '' }: SocialLoginProps) {
  return (
    <>
      {/* OR divider */}
      <div className="relative text-center">
        <span className="relative z-10 inline-block bg-white px-4 text-sm font-medium dark:bg-[#000000] dark:text-neutral-400">
          OR
        </span>
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 transform border border-neutral-100 dark:border-neutral-800"></div>
      </div>

      {/* Social buttons */}
      <div className="grid gap-3 lg:grid-cols-2">
        {socials.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex w-full items-center rounded-full border border-[#E2E2E2] bg-white px-4 py-3 transition-transform hover:translate-y-0.5 dark:border-[#363636] dark:bg-[#000000]"
          >
            <item.icon className="size-5 shrink-0" />
            <span className="ml-3 flex-1 text-center text-sm font-medium whitespace-nowrap text-[#404040] dark:text-white">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
