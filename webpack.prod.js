const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin({
                extractComments: false,
            }),
            new HtmlWebpackPlugin({
                inject: false,
                template: path.resolve(process.cwd(), 'template.xml'),
                filename: 'index.xml',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                }
            })
        ]
    }
});
