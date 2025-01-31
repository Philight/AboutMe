'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Languages, Moon, Sun } from 'lucide-react';

import { AVAILABLE_LOCALES, ICONS_SIZES } from '@/utils/constants';
import { setUserLocale } from '@/utils/server/functions/locale';

import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '../shadcn/menubar';
import Icon from '@/atoms/Icon';
import type { IGenericProps, IGenericComponent } from '@/types/generic-types';

// ================================================================

export default function Header() {
  const t = useTranslations('navigation');
  // const { status } = useSession();
  // const { setTheme, theme } = useTheme();
  // const [mounted, setMounted] = useState(false);

  return (
    <header className="flex justify-between w-full p-4 sticky top-0 left-0 right-0 z-[97]">
      <Icon.Q2Logo className="" />

      <nav className="flex items-center">
        <li>
          <Link href="/">{t('blog').toUpperCase()}</Link>
        </li>
        <li>
          <Link href="/">{t('create_post')}</Link>
        </li>
      </nav>

      <FloatingMenu />
    </header>
  );
}

interface FloatingMenuProps extends IGenericProps {}

function FloatingMenu({ className }: FloatingMenuProps) {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('navigation');

  const { status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Menubar className="fixed z-[101] left-1/2 -translate-x-1/2">
      <MenubarMenu key="theme">
        <MenubarTrigger aria-label="theme" onClick={() => setTheme(!mounted || theme === 'light' ? 'dark' : 'light')}>
          {!mounted || theme === 'light' ? <Moon size={ICONS_SIZES.sm} /> : <Sun size={ICONS_SIZES.sm} />}
        </MenubarTrigger>
      </MenubarMenu>
      {/*
      <MenubarMenu key="home">
        <MenubarTrigger>
          <Link href="/">{t('home').toUpperCase()}</Link>
        </MenubarTrigger>
      </MenubarMenu>*/}

      {/*        {!status || status === 'authenticated' ? (
          <>
            <MenubarMenu key="profile">
              <MenubarTrigger>
                <Link href="/profile">{t('profile').toUpperCase()}</Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu key="logout">
              <MenubarTrigger onClick={() => signOut()}>
                <p>{t('logout').toUpperCase()}</p>
              </MenubarTrigger>
            </MenubarMenu>
          </>
        ) : (
          <>
            <MenubarMenu key="signup">
              <MenubarTrigger>
                <Link href={'/signup'}>{t('signup').toUpperCase()}</Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu key="login">
              <MenubarTrigger>
                <Link href={'/login'}>{t('login').toUpperCase()}</Link>
              </MenubarTrigger>
            </MenubarMenu>
          </>
        )}*/}

      <MenubarMenu key={'lang'}>
        <MenubarTrigger aria-label="translate">
          <Languages size={ICONS_SIZES.sm} />
        </MenubarTrigger>
        <MenubarContent>
          {AVAILABLE_LOCALES.map((locale) => (
            <MenubarItem key={`locale_${locale.tag}`} onClick={() => setUserLocale(locale.tag)}>
              {locale.label}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
