import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

import { locales, pathnames, localePrefix } from './config-global';

export const { Link, getPathname, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
  localePrefix,
});

const ROOTS = {
  HOME: '/',
  BLOG: '/blog',
  POSTS: '/posts',
  LEGAL: '/legal',
};

export const routes = {
  home: '/',
  landing: {
    root: ROOTS.HOME,
  },
  // BLOG
  blog: {
    root: ROOTS.BLOG,
  },
  posts: {
    root: ROOTS.POSTS,
    id: `${ROOTS.POSTS}/{$id}`,
    create: `${ROOTS.POSTS}/create`,
  },
  // LEGAL
  legal: {
    termsConditions: `${ROOTS.LEGAL}/terms-and-conditions`,
    privacyPolicy: `${ROOTS.LEGAL}/privacy-policy`,
  },
};
