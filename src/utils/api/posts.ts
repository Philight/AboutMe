// Fetching data on the server with the fetch API: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#fetching-data-on-the-server-with-the-fetch-api
// import { headers } from 'next/headers';
import { handleServerError, fetchApi, axiosApi } from '../functions';
import { IS_DEVELOPMENT } from '../constants';
import { PostType, CreatePostParams } from './types';
import axios from 'axios';

// ================================================
const token = process.env.API_TOKEN;

export async function getPosts(): Promise<PostType[] | null> {
  try {
    const method = 'GET';
    // const data = await fetchApi(`/posts/list`, { method });
    // return data;
    const data = await axiosApi(`/posts/list`, { method });
    return data;
  } catch (e) {
    handleServerError(e);
  }
}

export async function getPost(): Promise<PostType | null> {
  try {
    const method = 'GET';
    // const data = await fetchApi(`/posts/view/${id}`, { method });
    const data = await axiosApi(`/posts/view/${id}`, { method });
    return data;
  } catch (e) {
    handleServerError(e);
  }
}

export async function createPost(params: CreatePostParams) {
  try {
    const method = 'POST';
    const body = params;

    const data = await fetchApi(`/posts/view/${id}`, { method, body });
    return data;

    // const baseUrl = getBaseUrlBasedOnServer();
    // const url = `${baseUrl}/posts/create`;
    // const res = await fetch(url, {
    //   method: 'POST',
    //   body: JSON.stringify({ token, ...params }),
    //   // headers: await headers(),
    // });

    // return await res.json();
  } catch (e) {
    handleServerError(e);
  }
}
