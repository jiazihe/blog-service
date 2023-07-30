// 想要返回数据的格式更加规范
// 定义响应数据的模型
// 创建一个基类

class BaseModel {
    // 以下是构造器
  constructor(data, message) {
    if (typeof data === 'string') {
        this.message = data
        data = null
        message = null
    }
    
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

// 创建成功的模型
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = 0
    }
    }

// 创建失败的模型
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = -1
    }
}


module.exports = {
    SuccessModel,
    ErrorModel
}
