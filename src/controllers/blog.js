// 博客相关的函数
const {execSQL} = require('../db/mysql');
const getList = (author, keyword) => {
    // 从数据库里拿数据
    let sql = `select * from blogs where 1=1 `;

    if (author) {
        sql += `and author='${author}' `;
    }

    if (keyword) {
        sql += `and title like '%${keyword}%'`;
    }

    // promise方式
    return execSQL(sql);

    // 先返回假数据（格式是正确的）
    // return [
    //     {
    //         id: 1,
    //         title: '标题1',
    //         content: '内容1',
    //         author: 'zhangsan',
    //         createdAt: 1610555518935
    //     },
    //     {
    //         id: 2,
    //         title: '标题2',
    //         content: '内容2',
    //         author: 'lisi',
    //         createdAt: 1610555518944
    //     },
    // ]
}

// 获取博客详情数据
const getDetail = (id) => {
    // 先返回假数据
    return {
        id: 5,
        title: '标题1',
        content: '内容1',
        author: 'zhangsan',
        createdAt: 1610555518935
    };
}

// 创建一篇新的博客
const createNewBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content 属性
    console.log('blogData', blogData);
    return {
        id: 3 // 表示新建博客，插入到数据表里的id
    }
}

// 此处给bigData一个默认值（空对象），防止没有传入blogData时报错
const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的id
    // blogData 是一个博客对象，包含 title content 属性
    console.log('id', id);
    console.log('blogData', blogData);
    return true;
}

const deleteBlog = (id) => {
    // id 就是要删除博客的id
    console.log('id', id);
    return true;
}

module.exports = {
    getList,
    getDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
}