This repo reproduces an error I have experienced locally that I cannot yet explain.

### The issue

The behavior I expect is:

- I can bind a durable object that runs under one worker (worker A) to another worker (worker B)
- From worker B, I can create a durable object stub and perform a request on worker A's DO.

Instead, when I make a request from worker B, the request does not reach the DO class, and instead I see an exception:

```
SyntaxError: "undefined" is not valid JSON
    at async Object.fetch (file:///Users/jesseditson/Desktop/cloudflare-test/node_modules/miniflare/dist/src/workers/core/entry.worker.js:954:22)
```

### Repro

To set it up, clone the repo then run `npm install`.

To reproduce the issue, run (in two seperate terminals)

`npm run do`
`npm run api`

Then visit `http://localhost:8777/test` in a browser or run `curl http://localhost:8777/test`

### Investigation

Looking at the actual entry.worker.js, it looks like some headers are auto-injected - when I log the request path and headers, the offending call has:

```
path: /__WRANGLER_EXTERNAL_DURABLE_OBJECTS_WORKER

Headers(6) {
  'accept-encoding' => 'br, gzip',
  'host' => 'localhost:8787',
  'x-miniflare-durable-object-cf-blob' => 'undefined',
  'x-miniflare-durable-object-id' => '899153785ebdad0ee7fe9208aae7ed48307ff327588dddf7e767a75daee36277',
  'x-miniflare-durable-object-name' => 'TestDO',
  'x-miniflare-durable-object-url' => 'http://do/hello',
  [immutable]: false
}
```

The `x-miniflare-durable-object-cf-blob` appears to be the issue, and sure enough when I add a line before the request:

`request.headers.delete("x-miniflare-durable-object-cf-blob")`

things work as expected.

### Next

Not sure what
