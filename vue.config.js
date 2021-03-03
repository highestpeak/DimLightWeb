// vue.config.js
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/production-sub-path/' : '/',
    devServer: {
        port: 9090,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:9091/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }, // 设置代理
        before: app => { }
    },
}