type CardProps = {
  children: React.ReactNode;
};

export const Card = ({ children }: CardProps) => (
  <div className="mx-auto flex max-w-3xl flex-col space-y-4 bg-white px-4 py-6 shadow sm:overflow-hidden sm:rounded-md sm:p-6">
    {children}
  </div>
);
