export const isArray = Array.isArray;


const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val, key) => hasOwnProperty.call(val, key);

export const objectToString = Object.prototype.toString;

export const toTypeString = (value) => objectToString.call(value);

export const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
};

export const isPlainObject = (val) => toTypeString(val) === "[object Object]";

/* 
    { m : 12 } => [{ label : m, value : 12, disable : false }]
    ['北京市','重庆市'] => [{ label : '北京市', value : '北京市', disable : false },{ label : '重庆市', value : '重庆市', disable : false }]
    ['北京市',{ city : '重庆市' }] = > [{ label : '北京市', value : '北京市', disable : false },{ label : 'city', value : '重庆市', disable : false }]

    转换后格式
    [{ label : 'label', value : 'value', disable : false }]
 */
export const convertFormatData = (data, labelKey = "label", valueKey = "value") => {
    let res = [];
    if (isArray(data)) {
        // 数组
        data.forEach((item, index) => {
            res = [].concat(res, convertFormatData(item, labelKey, valueKey));
        });
    } else if (isPlainObject(data)) {
        // 普通key-value对象
        // hasOwn
        if (hasOwn(data, labelKey) && hasOwn(data, valueKey)) {
            // is format object
            data.disable = data.disable || false;
            res.push(data);
        } else {
            res = [].concat(res,
                Object.keys(data).map((key) => {
                    return {
                        [valueKey]: key,
                        [labelKey]: data[key],
                        disable: false,
                    };
                })
            );
        }
    } else if(isString(data) || isNumber(data)){
        // Number、String
        res.push({
            [valueKey]: data,
            [labelKey]: data,
            disable: false,
        });
    }
    return res;
};

/* 
console.log(">>>", convertFormatData(["重庆市"]));
console.log(">>>", convertFormatData({ city: "重庆市" }));
console.log(">>>", convertFormatData({ label: "重庆市", value:"50000" }));
console.log(">>>", convertFormatData(["重庆市", { city: "重庆市" }]));
 */