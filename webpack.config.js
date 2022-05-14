const path = require('path')
const GasPlugin = require('gas-webpack-plugin')

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: './src/main.ts',
  output: {
    path: path.join(__dirname, '.dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  plugins: [new GasPlugin()],
}
