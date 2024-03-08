const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const entryConfig = {
  mode: 'development',
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry: {
    entry: './entry.js',
  },

  output: {
    path: path.resolve(__dirname, './build/'),
    publicPath: '/build/',
    filename: 'js/[name].js',
    libraryTarget: 'var',
    library: 'Entry',
  },

  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        use: [
          {
            loader: 'file-loader?name=[path][name].[ext]',
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['autoprefixer', { overrideBrowserslist: ['last 2 versions'] }]],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, ''),
      },
    ],
    client: {
      logging: 'warn',
    },
    open: ['/build/'],
    port: 3000,
    hot: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: 'css/[id].css',
    }),

    new CopyPlugin({
      patterns: [
        { from: './assets/images', to: 'images', noErrorOnMissing: true }
      ],
    }),
  ],
};

module.exports = [
  entryConfig,
];
