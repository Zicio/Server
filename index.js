const Koa = require('koa');
const router = require('@koa/router')();
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const app = new Koa();
app.use(cors());

app.use(koaBody({
  urlencoded: true
}));

/* data */
const tickets = [
  { id: 1, name: 'AAA' },
  { id: 2, name: 'BBB' },
  { id: 3, name: 'CCC' },
  { id: 4, name: 'DDD' },
  { id: 5, name: 'EEE' }
];

router.get('?method=allTickets', async(ctx, next) => {
  ctx.response.body = tickets;
  // ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 7070;
app.listen(port);
