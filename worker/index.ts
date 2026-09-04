interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const isPageRequest = request.method === 'GET' && !/\.[^/]+$/.test(url.pathname);

    if (isPageRequest) {
      const appShellUrl = new URL('/', request.url);
      return env.ASSETS.fetch(new Request(appShellUrl, request));
    }

    return env.ASSETS.fetch(request);
  },
};
