const Mock = require('./mock');
module.exports = {
    devServer: {
        // 主要用于mock数据的静态资源目录-从多个目录提供内容
        // contentBase: [path.join(__dirname, './static')],
        hot: true,
        host: '0.0.0.0',
        useLocalIp: true,
        port: 18080,
        compress: true,
        before(app) {
            // MOCK数据
            if (!!1) {
                Mock(app);
            }
        }
    }
};
