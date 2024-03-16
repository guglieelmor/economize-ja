
import { cookies } from 'next/headers';

export default async function apiServer(
  endpoint: string,
  method = 'GET',
  data?: any
) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const headers:HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token.value}` as const;
  }
  const options: RequestInit = {
    method: method,
    cache: 'no-store',
    mode: 'cors',
    headers
  };

  if (data) {
    options.body = JSON.stringify({
      date: data
    });
  }

  const url = 'http://127.0.0.1:3000/api/' + endpoint;
  return fetch(url, options);
}
