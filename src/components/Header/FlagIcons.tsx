import { FC } from 'react'

interface FlagIconProps {
  className?: string
}

export const USFlag: FC<FlagIconProps> = ({ className }) => (
  <svg className={className} width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="12" fill="#B22234" />
    <rect width="16" height="0.92" y="0" fill="#FFFFFF" />
    <rect width="16" height="0.92" y="1.85" fill="#FFFFFF" />
    <rect width="16" height="0.92" y="3.69" fill="#FFFFFF" />
    <rect width="16" height="0.92" y="5.54" fill="#FFFFFF" />
    <rect width="16" height="0.92" y="7.38" fill="#FFFFFF" />
    <rect width="16" height="0.92" y="9.23" fill="#FFFFFF" />
    <rect width="16" height="0.92" y="11.08" fill="#FFFFFF" />
    <rect width="6.4" height="6.46" fill="#3C3B6E" />
  </svg>
)

export const SAFlag: FC<FlagIconProps> = ({ className }) => (
  <svg className={className} width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="12" fill="#006C35" />
    <g transform="translate(4, 3)">
      <text x="4" y="2.4" fontSize="2.4" fill="white" textAnchor="middle" fontFamily="Arial">
        لا إله إلا الله
      </text>
      <text x="4" y="5.4" fontSize="2.4" fill="white" textAnchor="middle" fontFamily="Arial">
        محمد رسول الله
      </text>
    </g>
  </svg>
)

export const INFlag: FC<FlagIconProps> = ({ className }) => (
  <svg className={className} width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="4" fill="#FF9933" />
    <rect width="16" height="4" y="4" fill="#FFFFFF" />
    <rect width="16" height="4" y="8" fill="#138808" />
    <circle cx="8" cy="6" r="1.6" fill="none" stroke="#000080" strokeWidth="0.15" />
    <circle cx="8" cy="6" r="0.27" fill="#000080" />
  </svg>
)
