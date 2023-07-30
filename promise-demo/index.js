const fs = require('fs');
const path = require('path');

// 读取文件内容
// function getFileContent(fileName, callback) {
//     // __dirname是index.js所在的目录
//     // 数据文件的绝对路径
//     const fullFileName = path.resolve(__dirname, 'data', fileName);

//     // data是我们读取近来的数据
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         callback(
//             // 将二进制data转换为字符串
//             JSON.parse(data.toString())
//             );
//     })
//     }

    // 回调地狱：套了很多层，不推荐
    // 解决方案：promise
    // getFileContent('a.json', (aData) => {
    //     console.log('aData', aData);
    //     getFileContent(aData.next, (bData) => {
    //         console.log('bData', bData);
    //         getFileContent(bData.next, (cData) => {
    //             console.log('cData', cData);
    //         })
    //     })
    // });

    // promise实现，以读取文件
    function getFileContent(fileName) {
        const promise = new Promise((resolve, reject) => {
                // 数据文件的绝对路径
            const fullFileName = path.resolve(__dirname, 'data', fileName);

            // data是我们读取近来的数据
            fs.readFile(fullFileName, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(
                    // 将二进制data转换为字符串
                    JSON.parse(data.toString())
                );
            })
        });
        return promise;
    }

    getFileContent('a.json').then(aData => {
        console.log('aData', aData);
        return getFileContent(aData.next);
    }).then(bData => {
        console.log('bData', bData);
        return getFileContent(bData.next);
    }).then(cData => {
        console.log('cData', cData);
    });

    // 异步代码处理：promise + then 以避免回调地狱（嵌套）