/**
 * Cloudflare Workers 入口：以 Workers Static Assets 方式托管 Next.js 静态导出（out/ 目录）。
 * - 通过 ASSETS binding 提供全部静态文件
 * - 对 /_next/static/* 这类带内容哈希的不可变资源设置一年强缓存
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const response = await env.ASSETS.fetch(request);

    if (url.pathname.startsWith('/_next/static/')) {
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    return response;
  },
};
