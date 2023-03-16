import { classNames } from '@/utils/styling';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'red';
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  loading?: boolean;
};

export const Button: React.FC<Props> = ({ loading, variant, children, className, onClick, disabled, ...props }) => (
  <button
    onClick={onClick}
    className={classNames(
      'inline-flex items-center rounded-md border border-transparent bg-primary px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:grayscale-[25%] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
      `w-fit ${loading || disabled ? '!bg-gray-300' : ''}`,
      variant === 'red' ? 'text-grey-900  bg-rose-500 text-gray-500' : '',
      className ?? ''
    )}
    disabled={disabled || loading}
    {...props}
  >
    {children}
  </button>
);
