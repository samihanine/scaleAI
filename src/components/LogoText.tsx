import Image from 'next/image';

import image from 'public/images/logo.svg';

export const LogoText: React.FC<{ className: string }> = (props) => (
  <div className="flex gap-3">
    <Image src={image} width={40} alt="Railtrack logo with text" {...props} />
    <p className="text-xl font-medium">{process.env.NEXT_PUBLIC_APP_NAME}</p>
  </div>
);
