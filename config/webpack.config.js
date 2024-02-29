const path = require('path');
const Dotenv = require('dotenv-webpack');
const Env = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

Env.config({ path: `.env.local`, override: true });

module.exports = (env) => {
    return {
        mode: (env.production) ? 'production' : 'development',
        devtool: (env.production) ? 'nosources-source-map' : 'inline-source-map',
        stats: 'normal',
        devServer: {
            compress: true,
            port: 9000,
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                react: path.resolve('node_modules', 'react'),
                '@': path.resolve(__dirname, './../src'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    exclude: /node_modules/,
                    use: [
                        env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'local',
                                    localIdentName: '[local]',
                                    namedExport: true,
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: path.resolve(__dirname, './../src/scss/base.scss'),
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    exclude: /node_modules/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.(png|jpe?g|gif|jp2|webp)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[name][ext]'
                    }
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext]'
                    }
                }
            ],
        },
        plugins: [
            new Dotenv({
                path: `./.env.${process.env.NODE_ENV}`,
                safe: true,
                systemvars: true,
                silent: true,
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                filename: 'index.html',
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                },
                inject: 'body',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, './../public'),
                        to: path.resolve(__dirname, './../dist'),
                        globOptions: {
                            ignore: ['**/index.html']
                        }
                    }
                ]
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                    terserOptions: {
                        compress: {
                            drop_console: env.production,
                        },
                    },
                }),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        test: /[\\/](vendor|node_modules)[\\/](?=.*\.js$)/,
                        name(module) {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `vendors.${packageName.replace('@', '')}`;
                        },
                    },
                },
            },
        },
        output: {
            path: path.resolve(__dirname, './../dist'),
            filename: '[name].[contenthash].js',
            publicPath: '',
        },
    }
};
