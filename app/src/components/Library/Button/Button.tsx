interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'cta' | 'outline'
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'cta',
  className = '',
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded-md text-sm whitespace-nowrap'

  const variantClasses = {
    cta: 'bg-cta-base hover:bg-cta-hover text-cta-text',
    outline: 'border border-panel-border hover:bg-input-active text-text-1',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
