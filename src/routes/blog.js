// 处理博客相关的路由
const {SuccessModel, ErrorModel} = require('../model/responseModel');
const {getList, getDetail, createNewBlog, updateBlog, deleteBlog} = require('../controllers/blog');
const { execSQL } = require('../db/mysql');

const handleBlogRouter = (req, res) => {
    // 定义处理路由的逻辑
    const method = req.method; // GET POST
    // const url = req.url;
    // const path = url.split('?')[0];
    const id = req.query.id;
    const blogData = req.body;

    if (method === 'GET' && req.path === '/api/blog/list') {
        // 获取博客列表
        const author = req.query.author || '';
        const keyword = req.query.keyword || '';
        const listDataPromise = getList(author, keyword);
        return listDataPromise.then(listData => {
            return new SuccessModel(listData);
        });
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const detailDataPromise = getDetail(id);
        return detailDataPromise.then(detailData => {
            return new SuccessModel(detailData);
        }
        );
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const author = 'zhangsan'; // 假数据，待开发登录时再改成真实数据
        req.body.author = author;
        const newBlogDataPromise = createNewBlog(blogData);
        return newBlogDataPromise.then(newBlogData => {
            return new SuccessModel(newBlogData);
        })
    }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const updatedBlogDataPromise = updateBlog(id, blogData);
        return updatedBlogDataPromise.then(updatedBlogData => {
            if (updatedBlogData) {
                return new SuccessModel('更新博客成功');
            } else {
                return new ErrorModel('更新博客失败');
            }
        });        
    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const author = 'zhangsan'; // 假数据，待开发登录时再改成真实数据
        const deleteBlogDataPromise = deleteBlog(id, author);
        return deleteBlogDataPromise.then(deleteBlogData => {
            if (deleteBlogData) {
                return new SuccessModel('删除博客成功');
            } else {
                return new ErrorModel('删除博客失败');
            }
        });
    }};

module.exports = handleBlogRouter;