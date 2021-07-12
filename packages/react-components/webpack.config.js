'use strict';

const webpack = require('webpack');

const coverageRule = {
  test: /\.(ts|tsx)$/,
  exclude: /node_modules|\.test.(ts|tsx)|tasks.ts|test-utils.ts$/,
  use: ['@jsdevtools/coverage-istanbul-loader'],
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = (options) => {
  return {
    mode: options.env,
    devtool: 'inline-source-map',

    /**
     * Options affecting the resolving of modules.
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      /**
       * An array of extensions that should be used to resolve modules.
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    /**
     * Options affecting the normal modules.
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {
      rules: [
        options.coverage ? coverageRule : {},
        {
          test: /\.(tsx|ts)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            compilerOptions: {
              sourceMap: true,
              declaration: false,
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
    },

    // https://stackoverflow.com/questions/65018431/webpack-5-uncaught-referenceerror-process-is-not-defined
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],

    externals: {
      jsdom: 'window',
      cheerio: 'window',
      'react/lib/ExecutionEnvironment': 'true',
      'react/addons': 'true',
      'react/lib/ReactContext': 'window',
    },
  };
};
