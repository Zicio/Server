const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const uuid = require('uuid');

const app = new Koa();
app.use(cors());

app.use(koaBody({
  urlencoded: true,
  multipart: true
}));

/* data */
const tickets = [
  { id: '1', name: 'AAA', description: 'Подробное описание', status: true, created: '10.03.19 08:40' },
  { id: '2', name: 'BBB', description: 'Подробное описание', status: true, created: '10.03.19 08:57' },
  { id: '3', name: 'CCC', description: 'Подробное описание', status: false, created: '10.03.19 08:20' },
  { id: '4', name: 'DDD', description: 'Подробное описание', status: true, created: '10.03.19 08:37' },
  { id: '5', name: 'EEE', description: 'Подробное описание', status: false, created: '10.03.19 08:58' }
];

const format = date => {
  if (date < 10) {
    date = '0' + date;
  }
  return date;
};

const getDate = () => {
  const date = new Date();
  const month = format(date.getMonth() + 1);
  const day = format(date.getDate());
  let hour = format(date.getHours() + 4);
  if (hour === 24) {
    hour = 0;
  }
  const minute = format(date.getMinutes());
  const year = +date.getFullYear().toString().slice(2);
  return {
    month,
    day,
    hour,
    minute,
    year
  };
};

app.use(async ctx => {
  const method = ctx.request.method;
  const route = ctx.request.query.method;
  const qry = ctx.request.query;

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
        const filteredTickets = tickets.filter(item => {
          if (item.id === paramID) {
            return true;
          }
        });
        ctx.response.body = filteredTickets;
        ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
        return;
      }
    // ---------------------
    case 'createTicket':
      if (method === 'POST') {
        const body = ctx.request.body;
        const { v4: uuidv4 } = require('uuid');
        const newID = uuidv4();
        const newTicket = { id: newID, name: body.name, description: body.description, status: false, created: `${getDate().day}.${getDate().month}.${getDate().year} ${getDate().hour}:${getDate().minute}` };
        console.log('newTicket=', newTicket);
        tickets.push(newTicket);
      }
      ctx.response.body = 'OK';
      ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
      return;
    // ---------------------
    case 'deleteTicket':
      if (method === 'GET') {
        const paramID = qry.id;
        const deletedTicketIndex = tickets.findIndex(item => item.id === paramID);
        tickets.splice(deletedTicketIndex, 1);
        ctx.response.body = 'OK';
        ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
        return;
      }
    // ---------------------
    case 'changeTicket':
      if (method === 'POST') {
        const body = ctx.request.body;
        const paramID = qry.id;
        const changedTicketIndex = tickets.findIndex(item => item.id === paramID);
        tickets[changedTicketIndex].name = body.name;
        tickets[changedTicketIndex].description = body.description;
        tickets[changedTicketIndex].created = `${getDate().day}.${getDate().month}.${getDate().year} ${getDate().hour}:${getDate().minute}`;
        ctx.response.body = 'OK';
        ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
        return;
      }
      if (method === 'GET') {
        const paramID = qry.id;
        const changedTicketIndex = tickets.findIndex(item => item.id === paramID);
        tickets[changedTicketIndex].status = !tickets[changedTicketIndex].status;
        ctx.response.body = 'OK';
        ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
        return;
      }
    // ---------------------
    default:
      ctx.response.status = 404;
      ctx.response.set({ 'Access-Control-Allow-Origin': '*' });
  }
});

const port = process.env.PORT || 7070;
app.listen(port);
