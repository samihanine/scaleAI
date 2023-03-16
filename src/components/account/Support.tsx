import { useTranslations } from 'next-intl';
import { Link } from '@/components/Link';

export const Support: React.FC = () => {
  const t = useTranslations('account');

  return (
    <section aria-labelledby="account-heading">
      <div className="mx-auto max-w-3xl shadow sm:overflow-hidden sm:rounded-md">
        <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
          <div>
            <h2 id="account-heading" className="text-lg font-medium leading-6 text-gray-900">
              {t('support')}
            </h2>
          </div>

          <div className="space-y-4">
            <p>
              {t('contact')}: <Link href="mailto:sami.hanine22@gmail.com">sami.hanine22@gmail.com</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
