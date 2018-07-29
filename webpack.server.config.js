'use strict';
const path = require('path');
const webpack = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode !== 'production';
  const targetPath = path.join(__dirname, 'dist');
  const config = {
    stats: { modules: false, performance: false },
    target: "node",
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        models: path.resolve(__dirname, 'src/client/models/'),
        enums: path.resolve(__dirname, 'src/client/enums/'),
        utils: path.resolve(__dirname, 'src/client/utils/'),
        UI: path.resolve(__dirname, 'src/client/UI/'),
        shared: path.resolve(__dirname, 'src/client/shared/'),
        store: path.resolve(__dirname, 'src/client/store'),
        client: path.resolve(__dirname, 'src/client/'),
        sharedUtils: path.resolve(__dirname, 'src/shared/utils/')
      }
    },
    entry: {
      app: './src/server/app.ts',
      aws: './src/server/app-base.ts'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, include: /src/, use: 'awesome-typescript-loader?silent=true'
        },
        {
          type: 'javascript/auto',
          test: /\.mjs$/,
          use: []
        }
      ]
    },
    devtool: "source-map",
    output: {
      filename: '[name].js',
      path: targetPath,
      libraryTarget: 'commonjs2'
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop'))
    ],
    externals: ['express']
  };

  if (isDev) {
    config.entry = {
      app: './src/server/app.ts'
    };
    config.plugins.push(
      new NodemonPlugin({
        watch: path.resolve('./dist'),
        exec: 'npm run debug --prefix dist'
      })
    );
  }

  return config;
};
