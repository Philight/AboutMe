import { getTranslations } from 'next-intl/server';

import Hero from '@/components/organisms/Hero';
import Users from '@/components/organisms/Users';
import Main from '@/components/layouts/Main';
import { getUsersWithPaginationAndFilter } from '@/utils/api/usersApi';

// ===============================================================

export default async function Home() {
  const t = await getTranslations('home');
  const usersAndPagination = await getUsersWithPaginationAndFilter();

  return (
    <Main>
      <Hero title={t('hero_title')} />
      <Users usersAndPagination={usersAndPagination} />
    </Main>
  );
}
