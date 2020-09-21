let bodyParser = require('body-parser');
// 方法增加延时处理
Function.prototype.delay = function(duration = 200) {
    // 压缩简化版
    const fun = this;
    return function() {
        return new Promise((resolve) => setTimeout(() => resolve(fun.apply(this, arguments)), duration));
    };
};

module.exports = (app) => {
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ txtended: false }));
    //parse application/json
    app.use(bodyParser.json());
    // app.use('/mock/', async (req, res, next) => {
    //     console.log(req.query, req.params, req.body, req.url);
    //     // 延迟获取数据
    //     // const data = await t.delay(/*duration : 200*/)(/*Function params*/);

    //     res.json({
    //         code: 0,
    //         data: null,
    //         msg: 'success'
    //     });
    // })
    app.post('/mock/*', async (req, res, next) => {
        // console.log(req.query, req.params, req.body, req.url);
        const { code } = req.body;
        const getAddressByCode = function(code) {
            let json = require('./city/index.json');
            return json[code] || null;
        };
        const data = await getAddressByCode.delay(50 /*duration : 200*/)(code /*Function params*/);
        res.json({
            code: 0,
            data: data,
            msg: 'success'
        });
    });
};
