export default {
  async fetch(request, env, ctx) {
    const u = new URL(request.url);
    if (u.pathname === "/test") {
      const userStub = env.TEST.get(env.TEST.newUniqueId());
      return userStub.fetch("http://do/hello");
    }
    return new Response("not found", { headers, status: 404 });
  },
};
