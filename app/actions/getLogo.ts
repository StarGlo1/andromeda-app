// app/actions/getLogo.ts

import { cookies } from 'next/headers';

export async function getLogo(): Promise<string | null> {
  const cookieStore = cookies();
  const logoCookie = cookieStore.get('andromedaLogo');
  
  if (logoCookie) {
    return decodeURIComponent(logoCookie.value);
  }
  
  return null;
}