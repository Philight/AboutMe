'use client';

import { useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

import { newPostSchema } from '@/lib/zod/ValidationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/shadcn/button';
import FormProvider, { Field, useForm } from '@/components/molecules/hook-form';

import Container from '@/layouts/Container';
import { cn, showToast } from '@/utils/functions';

import type { IGenericProps } from '@/types/generic-types';

// ============================================================================

export interface CreatePostProps extends IGenericProps {}

export default function CreatePost({ className }: CreatePostProps) {
  const t = useTranslations('posts_create');
  const [isPending, startTransition] = useTransition();

  const methods = useForm<z.infer<typeof newPostSchema>>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: '',
      content: '',
      author: '',
    },
    // mode: 'onChange',
  });

  const {
    // reset,
    formState,
    handleSubmit,
    setError,
    clearErrors,
  } = methods;

  const onSubmit = handleSubmit(async (data: any, event?: React.BaseSyntheticEvent) => {
    startTransition(async () => {
      try {
        event?.preventDefault();
        clearErrors();

        if (IS_DEVELOPMENT) showToast({ type: 'INFO', message: data });

        // TRANSFORM FIELDS & SEND REQUEST

        const { email, password } = data;

        // await logInUser({
        //   email,
        //   password,
        // });

        // RESPONSE OK
        if (state.message && state.message.trim().length !== 0) {
          showToast({ status: state.status, message: state.message });
        }

        // enqueueSnackbar(<Box sx={{ whiteSpace: 'pre-wrap' }}>{t('success.login')}</Box>, {
        //   variant: 'success',
        //   autoHideDuration: 10000,
        // });

        // RESPONSE ERROR
      } catch (error) {
        const errorMsgs = transformErrors(error, setError);
        if (state.message && state.message.trim().length !== 0) {
          showToast({ status: state.status, message: state.message });
        }
      }
    });
  });

  return (
    <Container className={cn('create-post__c', className)}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className={cn('grid grid-cols-1')}>
          <Field field="input" name="title" type="text" label={t('title')} />
          <Field field="textarea" name="content" label={t('content')} />
          <Field field="input" name="author" type="text" label={t('author')} />

          <div className={cn('button__wrapper')}>
            <Button type="submit" disabled={isPending || !formState.isDirty} variant="default">
              {isPending && <Loader2 className="animate-spin" />}
              {t('send')}
            </Button>
          </div>
        </div>
      </FormProvider>
    </Container>
  );
}
