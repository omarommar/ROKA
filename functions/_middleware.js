import { isGuest } from './_lib/auth.js';

export async function onRequest({ request, env, next }) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  const protectedPage =
    path === '/' ||
    path === '/index.html';

  const protectedResource =
    path === '/app.js' ||
    (path === '/api/content' && method === 'GET') ||
    (path === '/api/media' && method === 'GET');

  if (!protectedPage && !protectedResource) {
    return next();
  }

  if (await isGuest(request, env)) {
    return next();
  }

  if (protectedPage) {
    return Response.redirect(
      new URL('/access.html', request.url).toString(),
      302
    );
  }

  return new Response('Unauthorized', { status: 401 });
}
