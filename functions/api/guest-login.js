import { makeGuestCookie } from '../_lib/auth.js';

export async function onRequestPost({ request, env }) {
  if (!env.GUEST_PASSWORD || !env.SESSION_SECRET) {
    return new Response('Server configuration error', { status: 500 });
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: 'بيانات غير صحيحة' }, { status: 400 });
  }

  if (data.password !== env.GUEST_PASSWORD) {
    return Response.json(
      { error: 'كلمة السر غير صحيحة 💗' },
      { status: 401 }
    );
  }

  return Response.json(
    { ok: true },
    { headers: { 'Set-Cookie': await makeGuestCookie(env) } }
  );
}
