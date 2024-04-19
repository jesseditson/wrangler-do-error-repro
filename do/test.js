export class TestDO {
  // constructor(state, env) {
  //   this.state = state;
  //   this.env = env;
  // }

  async fetch(request) {
    const url = new URL(request.url);
    console.log(`[TestDO] [${request.method}] ${url.pathname}`);
    switch (url.pathname) {
      case "/hello":
        return new Response("hello!");
    }
    return new Response("Not Found", { status: 404 });
  }
}
