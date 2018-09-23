import express from "express";
import staticFileHandler from "./server/routes/staticFileRoute";
import proxy from "express-http-proxy";

const app = express();
app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator: function(proxyReqOpts) {
      proxyReqOpts.headers["x-forwarded-host"] = "localhost:3000";
      return proxyReqOpts;
    }
  })
);

staticFileHandler(app);

if (module.hot) {
  module.hot.accept();
}

export default app;
