import jsonServer from 'json-server';
import queryString from 'query-string';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updateAt = Date.now();
  } else if (req.method === 'PATCH') {
    req.body.updateAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  // To get pagination
  const headers = res.getHeaders();
  const totalRowCount = headers['x-total-count'];

  if (req.method === 'GET' && totalRowCount) {
    const params = queryString.parse(req._parsedUrl.query);

    const dataJSON = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(params._page) || 1,
        _limit: Number.parseInt(params._page) || 12,
        _totalRows: Number.parseInt(totalRowCount),
      },
    };

    return res.jsonp(dataJSON);
  }

  return res.jsonp(res.locals.data);
};

// Use default router
server.use('/api', router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('JSON Server is running');
});
