import { Request, Response } from 'express';
import * as React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { SheetsRegistry } from 'jss';
import { JssProvider } from 'react-jss';
import configureStore from 'client/configureStore';
import { createGenerateClassName } from '@material-ui/core/styles';
import { routes } from 'client/routes';
import { InitialState } from 'models/initial';
import { SignInState } from 'models/signIn';
import { SignUpState } from 'models/signUp';
import { ForgotPasswordState } from 'models/forgotPassword';
import { GooglePayState } from 'models/googlePay';

export const renderPage = async (req: Request, res: Response, initialState: InitialState) => {
  const store = configureStore(createMemoryHistory(), {
    initial: new InitialState(initialState),
    forgotPassword: new ForgotPasswordState(),
    signIn: new SignInState(),
    signUp: new SignUpState(),
    googlePay: new GooglePayState()
  });
  const sheetsRegistry = new SheetsRegistry();
  const generateClassName = createGenerateClassName();
  const ui = (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={{}} children={routes} />
        </Provider>
    </JssProvider>
  );
  const html = renderToString(ui);
  const css = sheetsRegistry.toString();

  res.send(renderFullPage(html, css));
};

const renderFullPage = (html: any, css: any) => {
  return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Ticketek</title>
          <base href="/" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <link rel="shortcut icon" href="favicon.ico">
          <link rel="stylesheet" type="text/css" href="css/global.css">
        </head>
        <body>
          <div id="react-app">${html}</div>
          <style id="jss-server-side">${css}</style>
          <script type="text/javascript" src="vendor.js"></script>
          <script type="text/javascript" src="client.js"></script>
        </body>
      </html>
    `;
};
