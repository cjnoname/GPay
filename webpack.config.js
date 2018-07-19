const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
  const isDev = argv.mode !== 'production';
  const targetPath = path.join(__dirname, 'dist', 'static');
  const config = {
    stats: { modules: false, performance: false },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        models: path.resolve(__dirname, 'src/client/models/'),
        enums: path.resolve(__dirname, 'src/client/enums/'),
        utils: path.resolve(__dirname, 'src/client/utils/'),
        UI: path.resolve(__dirname, 'src/client/UI/'),
        shared: path.resolve(__dirname, 'src/client/shared/'),
        store: path.resolve(__dirname, 'src/client/store'),
        sharedUtils: path.resolve(__dirname, 'src/shared/utils')
      }
    },
    entry: {
      client: './src/client/index.tsx'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, include: /src/, use: 'awesome-typescript-loader?silent=true'
        },
        {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
        },
        {
          test: /\.(png|jpe?g|gif|svg|bmp)$/,
          use: {
            loader: 'file-loader',
            options: { name: 'images/[name].[ext]' }
          }
        }
      ]
    },
    output: {
      filename: '[name].js',
      path: targetPath
    },
    plugins: [
      new CheckerPlugin(),
      // new HtmlWebpackPlugin({
      //   template: "./public/index.html",
      //   favicon: "./public/favicon.ico"
      // }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'public/css/global.css'),
          to: path.resolve(__dirname, 'dist/static/css/global.css'),
        },
        {
          from: path.resolve(__dirname, 'public/favicon.ico'),
          to: path.resolve(__dirname, 'dist/static/favicon.ico'),
        }
      ]),
    ],
    devtool: "source-map",
    performance: {
      hints: false
    }
  };

  if (isDev) {
    config.devServer = {
      contentBase: "./public",
      port: 3000,
      historyApiFallback: true,
      proxy: [{
        context: "/api",
        target: "http://localhost:8080"
      }]
    };
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'tslint-loader'
      }
    );
  } else {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /node_modules/,
            name: "vendor",
            chunks: "all"
          }
        }
      }
    };
    config.plugins.push(
      new CleanWebpackPlugin([targetPath])
    );
  }

  return config;
};
