const http = require('http');
const Koa = require('koa');
const app = new Koa();

const tickets = [];

// app.use(async(ctx, next) => {
// const origin = ctx.request.get('Origin');
// const { method } = ctx.request.querystring;
// if (!origin) {
//   return await next();
// }
// const headers = { 'Access-Control-Allow-Origin': '*' };
// if (ctx.request.method !== 'OPTIONS') {
//   ctx.response.set({ ...headers });
//   try {
//     return await next();
//   } catch (e) {
//     e.headers = { ...e.headers, ...headers };
//     throw e;
//   }
// }
// if (ctx.request.get('Access-Control-Request-Method')) {
//   ctx.response.set({
//     ...headers,
//     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH'
//   });
//   if (ctx.request.get('Access-Control-Request-Headers')) {
//     ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Allow-Request-Headers'));
//   }

//     switch (method) {
//       case 'allTickets':
//         ctx.response.body = tickets;
//         return;
//         // TODO: обработка остальных методов
//       default:
//         ctx.response.status = 404;
//     }

//     ctx.response.status = 204; // No content
//   }
// });

app.use(async ctx => {
  const { method } = ctx.request.querystring;

  ctx.response.set({
    'Access-Control-Allow-Origin': '*'
  });

  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets;
      return;
      // TODO: обработка остальных методов
    default:
      ctx.response.status = 404;
  }
});

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback()).listen(port);
