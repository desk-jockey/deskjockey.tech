import { define } from "../../utils.ts";

export const handler = define.handlers({
  GET(ctx) {
    return new Response(
      `Hello, from ${ctx.url}!`,
    );
  },
});
