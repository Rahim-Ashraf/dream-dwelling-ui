import SignIn from '@/components/SignIn/SignIn'
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("next-auth.session-token")?.value;
  if (token) {
    const decoded = await jwtDecode(token);
    console.log(decoded);
  }


  return (
    <div>
      <SignIn />
    </div>
  )
}
