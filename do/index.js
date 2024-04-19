export { TestDO } from "./test";

export default {
  async fetch(request, env, ctx) {
    throw new Error("Invalid Request");
    return new Response("Not Found", { status: 404 });
  },
};
