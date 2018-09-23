import serialize from "serialize-javascript";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

/**
 * @param {string} markup - React DOM created by React.renderToString
 * @param {[string]} bundles - loadable bundled files
 * @param {function} stores - redux store
 * @return {string} HTML - final html markup
 */
const renderer = (markup = "", bundles = [], stores) => {
  return `
    <!doctype html>
    <html lang="">
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ""
        }
        ${
          process.env.NODE_ENV === "production"
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
      </head>
      <body>
        <div id="root">${markup}</div>
        ${bundles
          .map(bundle => {
            return `<script src="${bundle.file}"></script>`;
          })
          .join("\n")}
        <script>
          window.INITIAL_STATE = ${serialize(stores.getState())}
        </script>
      </body>
    </html>
  `;
};

export default renderer;
