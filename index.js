const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const app = new Koa();
app.use(cors());

app.use(koaBody({
  urlencoded: true
}));

/* data */
const tickets = [
  { id: 1, name: 'AAA', status: true, created: '10.03.19 08:40' },
  { id: 2, name: 'BBB', status: true, created: '10.03.19 08:57' },
  { id: 3, name: 'CCC', status: false, created: '10.03.19 08:20' },
  { id: 4, name: 'DDD', status: true, created: '10.03.19 08:37' },
  { id: 5, name: 'EEE', status: false, created: '10.03.19 08:58' }
];

app.use(async ctx => {
  /* query information */
  const method = ctx.request.method;
  console.log('method=', method);
  const route = ctx.request.query.method;
  console.log('route=', route);
  const qry = ctx.request.query;
  console.log('query=', qry);

  /* handlers */
  switch (route) {
    // ---------------------
    case 'allTickets':
      if (method === 'GET') {
        ctx.response.body = tickets;
        ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
        return;
      }
    // ---------------------
    case 'ticketById':
      if (method === 'GET') {
        const paramID = qry.id;
        // console.log('id=', paramID);
        const filteredTickets = tickets.filter(item => {
          if (item.id === Number(paramID)) {
            return true;
          }
        });
        // console.log('filteredTickets=', filteredTickets);
        ctx.response.body = filteredTickets;
        ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
        return;
      }
    // ---------------------
    // case 'createTicket':
    //   if (method === 'POST') {
    //     const body = ctx.request.body;
    //     console.log('post body=', body);
    //     const newID = backend.getNewID(tickets);
    //     const newTicket = { id: newID, name: body.name };
    //     console.log('newTicket=', newTicket);
    //     tickets.push(newTicket);
    //   }
    //   ctx.response.body = 'OK';
    //   ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
    //   return;
    // // ---------------------
    default:
      ctx.response.status = 404;
      ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
  }
});

const port = process.env.PORT || 7070;
app.listen(port);
