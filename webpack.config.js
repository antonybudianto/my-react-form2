const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let webpackConfigs = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|dist)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components|dist)/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [],
};

if (process.env.NODE_ENV === 'dev') {
  webpackConfigs.mode = 'development';
  webpackConfigs.entry = './src/example/index.js';

  webpackConfigs.plugins.push(
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/example/index.html'),
      filename: './index.html',
    }),
  );

  webpackConfigs.resolve = {
    extensions: ['.js', '.jsx'],
  };

  webpackConfigs.devServer = {
    port: 3001,
  };
} else if (process.env.NODE_ENV === 'demo') {
  webpackConfigs.target = 'web';
  webpackConfigs.mode = 'development';
  webpackConfigs.entry = './src/example/index.js';

  webpackConfigs.output = {
    path: path.resolve(__dirname, 'docs'),
    filename: 'index.js',
    // libraryTarget: 'commonjs2'
  };

  webpackConfigs.plugins.push(
    new HtmlWebpackPlugin({
      // hash: true,
      template: path.join(__dirname, 'src/example/index.html'),
      filename: 'index.html',
    }),
  );
} else {
  webpackConfigs.mode = 'production';
  webpackConfigs.entry = './src/index.js';

  console.log('prod');

  webpackConfigs.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  };

  webpackConfigs.externals = [
    {
      react: 'commonjs react',
      'immutability-helper': 'commonjs immutability-helper',
      '@material-ui/core/CssBaseline': 'commonjs @material-ui/core/CssBaseline',
      smoothscroll: 'commonjs smoothscroll',
    },
    /^@material-ui\/.*$/,
  ];
}

module.exports = webpackConfigs;
