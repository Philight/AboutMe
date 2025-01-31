import Hero from '@/components/organisms/Hero';
import { getTranslations } from 'next-intl/server';
import { getUsersWithPaginationAndFilter } from '@/utils/api/usersApi';
import Users from '@/components/organisms/Users';
import Main from '@/components/layouts/Main';

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
