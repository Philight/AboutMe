import { twMerge } from 'tailwind-merge';
import { ExternalToast, toast } from 'sonner';
import { ReactNode } from 'react';
import { type ClassValue, clsx } from 'clsx';
export { cva, type VariantProps } from 'class-variance-authority';
import axios from 'axios';

import { IS_SERVER, IS_DEVELOPMENT } from './constants';

// ================================================

const token = process.env.API_TOKEN;

// ================================================

export function getBaseUrlBasedOnServer() {
  // need to include process.env.NEXT_PUBLIC_API_URL if using this function inside a server side component, no need to include it if using the function inside client side component
  const baseUrl = IS_SERVER ? process.env.NEXT_PUBLIC_API_URL : '';

  return baseUrl;
}

export async function fetchApi(urlOrPath: URL | string, options?: any) {
  const { method = 'GET', ...fetchOptions } = options;
  const baseUrl = getBaseUrlBasedOnServer();

  const url = urlOrPath instanceof URL ? urlOrPath.toString() : isValidUrl(urlOrPath) ? new URL(urlOrPath) : `${baseUrl}${urlOrPath}`;
  const res = await fetch(url, {
    method,
    ...fetchOptions,
    // headers: await headers(),
    // next: { tags: ['getPost'] },
    // cache: 'no-store',
  });

  return await res.json();
}

export const api = axios.create({
  // adapter: 'fetch',
  // fetchOptions: { cache: "force-cache" },
  baseURL: getBaseUrlBasedOnServer(),
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Accept-Language':
      typeof navigator !== 'undefined' ? ((navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language) ?? 'cs') : 'cs',
  },
  // withCredentials: true,
});

export async function axiosApi(urlOrPath: URL | string, options?: any) {
  const { method = 'GET', data, ...axiosOptions } = options;

  const baseUrl = getBaseUrlBasedOnServer();
  const url = urlOrPath instanceof URL ? urlOrPath.toString() : urlOrPath.match(VALID_URL) ? new URL(urlOrPath) : `${baseUrl}${urlOrPath}`;

  const res = await api(url, {
    method,
    data: JSON.stringify({
      token,
      ...data,
    }),
    ...axiosOptions,
    // headers: await headers(),
    // next: { tags: ['getPost'] },
    // cache: 'no-store',
  });

  return res.data;
}

// export const transformAxiosResponse = (res) => {
//   return res.data.applications;
// };

export const handleServerError = (error: Error | any) => {
  if (IS_DEVELOPMENT) {
    console.error(error);
  }
  throw error;
};

// ================================================

export const encodeId = (id: string): string => Buffer.from(id).toString('base64');
export const decodeId = (encodedId: string): string => Buffer.from(encodedId, 'base64').toString('utf8');

const VALID_URL = /^((https?:\/\/)|(www\.{1}\w)).*/i; // http | https | www
export const isValidUrl = (url: URL | string) => url.match(VALID_URL);

// ================================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line no-unused-vars
type DebouncedFunction<Args extends unknown[]> = (...args: Args) => void;

export const debounce = <Args extends unknown[]>(
  // eslint-disable-next-line no-unused-vars
  mainFunction: (...args: Args) => void,
  delay: number,
): DebouncedFunction<Args> => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};

// export function showToast(status: number, message: string | ReactNode, options?: ExternalToast) {
export function showToast({ type, status, message, options }: { type?: string; status?: number; message: string | ReactNode; options?: ExternalToast }) {
  if (type) {
    switch (type) {
      case 'SUCCESS':
        return toast.success(message, options);
      case 'INFO':
        return toast.info(message, options);
      case 'WARNING':
        return toast.warning(message, options);
      case 'ERROR':
        return toast.error(message, options);
      default:
        return toast.info('Unexpected type received.', options);
    }
  } else {
    switch (true) {
      case status >= 200 && status < 300:
        return toast.success(message, options);
      case status >= 300 && status < 400:
        return toast.info(message, options);
      case status >= 400 && status < 500:
        return toast.warning(message, options);
      case status >= 500:
        return toast.error(message, options);
      default:
        return toast.info('Unexpected status received.', options);
    }
  }
}
