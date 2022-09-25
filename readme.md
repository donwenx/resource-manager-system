## 资源文件管理系统

### 功能

1. 资源分类管理
2. 资源管理（上传、下载、审核、发布）
3. 资源权限管理
4. 资源使用情况统计
5. 用户注册、导入: 普通用户、超级管理员

### 食用方法

#### 1. 启动方法

```bash
git clone https://gitee.com/zijiu7/resource-manager-system.git

# 下载后端依赖
npm install
# 下载前端依赖
cd client
npm install
cd ..
# 启动命令
npm run dev

```

#### 2. 配置数据库

修改`10`行到`13`行,为自己的`MySQL`数据库账号、密码、数据库名

![配置数据库](./img/%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E5%BA%93.png)

### 设计原型展示

![登录页面](./img/%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2.jpg)
![首页](./img/%E9%A6%96%E9%A1%B5.jpg)
![上传页面](./img/%E4%B8%8A%E4%BC%A0%E9%A1%B5%E9%9D%A2.jpg)
![资源列表](./img/%E8%B5%84%E6%BA%90%E5%88%97%E8%A1%A8.png)

**数据没有默认超级管理员,如果需要管理员权限请自行修改数据库。**

`authority`='超级管理员'

### 其他详情（自行查阅代码）

登录请使用`UID`+`密码`登录
登录需要注册，注册后点跳转会自动把`uid`填写到登录`id`处

### 实现细节

- [登录逻辑实现](./docs/%E7%99%BB%E5%BD%95%E9%80%BB%E8%BE%91%E5%AE%9E%E7%8E%B0.md)

- [上传文件逻辑实现](./docs/%E4%B8%8A%E4%BC%A0%E6%96%87%E4%BB%B6%E9%80%BB%E8%BE%91%E5%AE%9E%E7%8E%B0.md)


---

### 前端

功能实现：
- 对象的序列化和反序列化（JSON）
  - JSON.stringify + JSON.parse
- 日期格式化组件（moment）
- axios拦截器
  - 请求拦截器（每次发起请求前处理数据，列如：加上token）
  - 响应拦截器（每次响应后处理数据，列如：code等于1跳登录）
- vue-router的使用
  - 读取路由参数：router.params
  - 路由跳转：router.push('/'),router.push({ name: 'login' })
  - 全局路由的跳转
- element 组件的使用
  - 侧边栏处理
  - 远程搜索类型名称
  - 分页组件使用
  - 消息组件，（全局消息，组件消息）
- localStorage
- proxy跨域处理


### 后端

功能实现:
- 


### 自动生成目录结构

- （nest g resource admin）
https://docs.nestjs.com/cli/overview

生成的目录结构：
admin.controller.spec.ts
admin.controller.ts
admin.module.ts
admin.service.spec.ts
admin.service.ts

```bash
? What transport layer do you use? REST API
? Would you like to generate CRUD entry points? No
CREATE src/admin/admin.controller.ts (210 bytes)
CREATE src/admin/admin.controller.spec.ts (566 bytes)
CREATE src/admin/admin.module.ts (247 bytes)
CREATE src/admin/admin.service.ts (89 bytes)
CREATE src/admin/admin.service.spec.ts (453 bytes)
UPDATE package.json (2256 bytes)
UPDATE src/app.module.ts (1054 bytes)
```