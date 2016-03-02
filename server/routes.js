let routes = (app) => {
  app.use('/', (req, res) => res.send("hello world"));
};

export default routes;