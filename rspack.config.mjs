import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: false,
  entry: {
    main: "./src/index",
  },
  plugins: [new HtmlWebpackPlugin()],
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /lame\.min\.js/,
        use: [
          {
            loader: 'expose-loader',
            options: {
              exposes: 'lamejs',
            },
          },
          // exports-loader with options works in both webpack and rspack
          // {
          //   loader: 'exports-loader',
          //   options: {
          //     type: 'commonjs',
          //     exports: 'single|lamejs',
          //   }
          // },

          // exports-loader with inline-style options DO NOT work in rspack
          {
            loader: 'exports-loader?type=commonjs&exports=single|lamejs',
          }
        ],
      },
    ]
  }
};

export default config;
