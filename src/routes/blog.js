// 处理博客相关的路由
const {SuccessModel, ErrorModel} = require('../model/responseModel');
const {getList, getDetail, createNewBlog, updateBlog, deleteBlog} = require('../controllers/blog');


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
        
        const detailData = getDetail(id);

        return new SuccessModel(detailData);
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        
        const newBlogData = createNewBlog(req.body);
        
        return new SuccessModel(newBlogData);
    }
    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        console.log('req.body', req.body);
        const updatedBlogData = updateBlog(id, blogData);

        if (updatedBlogData) {
            return new SuccessModel('更新博客成功');
        } else {
            return new ErrorModel('更新博客失败');
        
    }
    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const deleteBlogData = deleteBlog(id);

        if (deleteBlogData) {
            return new SuccessModel('删除博客成功');
        } else {
            return new ErrorModel('删除博客失败');
        }    
    }

}

module.exports = handleBlogRouter;