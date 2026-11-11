const enc = s => new TextEncoder().encode(s);

function b64(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

async function sign(data, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    enc(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return b64(await crypto.subtle.sign('HMAC', key, enc(data)));
}

function getCookie(request, name) {
  const cookies = request.headers.get('Cookie') || '';
  const prefix = name + '=';
  const item = cookies.split(';').map(x => x.trim())
    .find(x => x.startsWith(prefix));
  return item ? item.slice(prefix.length) : null;
}

async function verifyCookie(request, env, name) {
  if (!env.SESSION_SECRET) return false;

  const value = getCookie(request, name);
  if (!value) return false;

  const [exp, signature] = value.split('.');
  if (!exp || !signature || !/^\d+$/.test(exp)) return false;
  if (Number(exp) < Date.now()) return false;

  const expected = await sign(exp, env.SESSION_SECRET);
  return signature === expected;
}

export async function makeCookie(env) {
  const exp = String(Date.now() + 8 * 60 * 60 * 1000);
  const sig = await sign(exp, env.SESSION_SECRET);

  return `roka_session=${exp}.${sig}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`;
}

export async function isAdmin(request, env) {
  return verifyCookie(request, env, 'roka_session');
}

export async function makeGuestCookie(env) {
  const exp = String(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const sig = await sign(exp, env.SESSION_SECRET);

  return `roka_guest=${exp}.${sig}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=2592000`;
}

export async function isGuest(request, env) {
  return verifyCookie(request, env, 'roka_guest');
}

export const clearCookie =
  'roka_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0';
