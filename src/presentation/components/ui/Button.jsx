export function Button({ 
  children, 
  icon: Icon, 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500',
    outline: 'border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 focus:ring-slate-400',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
      {children}
    </button>
  );
}
