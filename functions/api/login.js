import { makeCookie } from '../_lib/auth.js';

export async function onRequestPost({ request, env }) {
  try {
    if (!env.ADMIN_PASSWORD || !env.SESSION_SECRET) {
      return new Response('Server configuration error', { status: 500 });
    }

    const { password } = await request.json();

    if (password !== env.ADMIN_PASSWORD) {
      return new Response('Unauthorized', { status: 401 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': await makeCookie(env)
      }
    });
  } catch {
    return new Response('Bad request', { status: 400 });
  }
}
