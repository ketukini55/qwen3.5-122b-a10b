import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-xl px-4 py-2 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50',
          'bg-white/7 border border-white/10',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
