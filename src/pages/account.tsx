import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { Account } from '@/components/account/Account';
import { Support } from '@/components/account/Support';
import { Wrapper } from '@/components/Wrapper';
import { getLocaleProps } from '@/utils/locales';

const Settings: NextPage = () => {
  const t = useTranslations();

  return (
    <Wrapper title={t('navigation.settings')}>
      <div className="space-y-6">
        <Account />
        <Support />
      </div>
    </Wrapper>
  );
};

export const getServerSideProps = getLocaleProps;

export default Settings;
