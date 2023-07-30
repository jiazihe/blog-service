// 写服务器业务代码
// 回调函数名称：serverHandler

const querystring = require('querystring');

const handleBlogRouter = require('./src/routes/blog');
const { get } = require('http');

// 用于处理post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // 如果不是post请求，直接返回空
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        // 如果不是json格式，直接返回空
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }

        // 接收数据
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });

        req.on('end', () => {
            // 如果没有数据，直接返回空
            if (!postData) {
                resolve({});
                return;
            }
            // 将字符串转换为对象
            resolve(
                JSON.parse(postData)
            );
        });
    });
    return promise;
}


const serverHandler = (req, res) => {
    // 返回数据是字符串，字符串类型是json格式
    res.setHeader('Content-type', 'application/json');

    // 获取path
    const url = req.url;
    // 技巧：增加path属性，使所有有req的地方都可以使用path属性
    req.path = url.split('?')[0];

    // 解析 query
    req.query = querystring.parse(url.split('?')[1]);

    // 处理post data
    getPostData(req).then(postData => {
        req.body = postData;        
        // 博客相关的路由
        const blogDataPromise = handleBlogRouter(req, res);

        if (blogDataPromise){
            blogDataPromise.then( (blogData) => {
                res.end(JSON.stringify(blogData));
        });
            return;
        }
        // 未命中路由，返回404
        // text/plain 是纯文本格式
        res.writeHead(404, {"Content-type": "text/plain"});
        res.write("404 Not Found\n");
        // 响应终止
        res.end();
    });
}

module.exports = serverHandler;