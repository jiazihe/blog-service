// 博客相关的函数
const {execSQL} = require('../db/mysql');
const getList = (author, keyword) => {
    // 从数据库里拿数据
    let sql = `select * from blogs where 1=1 `; // 1=1 是为了防止author和keyword都没有值，导致sql语句报错
    if (author) {   
        sql += `and author='${author}' `;   
    }

    if (keyword) {  
        sql += `and title like '%${keyword}%'`;
    }

    // promise方式
    return execSQL(sql);    
}

// 获取博客详情数据
const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`; // 注意这里的id要加单引号，因为id是字符串
    return execSQL(sql).then(rows => {  // 这里的rows是一个数组，只有一个元素，所以取rows[0]
        // console.log('rows', rows);  
        return rows[0]; 
    });
}

// 创建一篇新的博客
const createNewBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含 title content 属性
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createdAt = Date.now();

    const sql = `
        insert into blogs (title, content, author, createdAt) values ('${title}', '${content}', '${author}', ${createdAt});
    `;

    return execSQL(sql).then(insertedResult => {
        console.log('insertedResult', insertedResult);
        return{
            id: insertedResult.insertId
        }
    });   
}

// 此处给bigData一个默认值（空对象），防止没有传入blogData时报错
const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的id
    // blogData 是一个博客对象，包含 title content 属性
    const title = blogData.title;
    const content = blogData.content;
    const sql = `update blogs set title='${title}', content='${content}' where id=${id}`;
    return execSQL(sql).then(updateResult => {
        console.log('updateResult', updateResult);  
        if (updateResult.affectedRows > 0) {
            return true;
        }
        return false;
    });
}

const deleteBlog = (id, author) => {
    // id 就是要删除博客的id
    const sql = `delete from blogs where id=${id} and author='${author}'`;
    return execSQL(sql).then(deleteResult => {
        console.log('deleteResult', deleteResult);
        if (deleteResult.affectedRows > 0) {
            return true;
        }  
        return false;
        });
}

module.exports = {
    getList,
    getDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
}