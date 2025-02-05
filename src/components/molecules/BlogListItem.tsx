import { CleanUserType } from '@/utils/api/usersApi';
import { Badge } from '../shadcn/badge';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SquareArrowOutUpRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '../shadcn/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '../shadcn/tooltip';
import LazyLoadImage from '@/components/atoms/LazyLoadImage';
import { ICONS_SIZES } from '@/utils/constants';
import { cn } from '@/utils/functions';
import { routes, navigation } from '/src/navigation';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

const NO_IMAGE = '/assets/images/no_image.jpg';

type BlogListItem = {
  title: string;
  content: string;
  author: string;
  image: string;
  createdAt: {
    date: Date | string;
    timezone_type: number;
    timezone: string;
  };
  id: number;
};

interface BlogListItemProps extends IGenericProps, BlogListItem {}

export default function BlogListItem({ id, className, title, content, author, image }: BlogListItemProps) {
  const t = useTranslations('home');

  return (
    <Card htmlTag="article" className={cn('blog-list-item__c relative', className)}>
      <div className="image-wrapper">
        <LazyLoadImage width={100} height={100} layout="responsive" src={image ?? NO_IMAGE} alt="BlogPost Image" />
      </div>
      <div className="blog-list-item__content card-content">
        <Tooltip>
          <TooltipTrigger aria-label="visit user profile">
            <Link href={`${routes.posts.id.replace('{$id}', id)}`}>
              <CardHeader>
                <p className="blog-list-item__author">{author}</p>
                <CardTitle className="blog-list-item__title">{title}</CardTitle>
              </CardHeader>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('visit_blog_post', { author })}</p>
          </TooltipContent>
        </Tooltip>
        <CardContent htmlTag="p" className="">
          {content}
        </CardContent>
      </div>
    </Card>
  );
}
