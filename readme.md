## 资源文件管理系统
---
### 功能：
1. 资源分类管理
2. 资源管理（上传、下载、审核、发布）
3. 资源权限管理
4. 资源使用情况统计
5. 用户注册、导入: 普通用户、系统管理员

---
### 食用方法

#### 1. 启动方法

```bash
git clone https://gitee.com/zijiu7/resource-manager-system.git

cd resource-manager-system
cd resource-manager-system
npm install

# 后端运行命令
npm run start:dev

cd ..
cd resource-manager-system-ui
# 前端运行命令
npm run serve
```

#### 2. 配置数据库

修改`10`行到`13`行为自己的`MySQL`数据库账号、密码、数据库名

![配置数据库](./img/%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E5%BA%93.png)

### 设计原型展示
![登录页面](./img/%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2.jpg)
![首页](./img/%E9%A6%96%E9%A1%B5.jpg)
![上传页面](./img/%E4%B8%8A%E4%BC%A0%E9%A1%B5%E9%9D%A2.jpg)
（原型图仅供参考，以代码实现为准，其他页面不在此展示，自行下载代码学习）
### 数据没有默认超级管理员,如果需要管理员权限请自行修改数据库。
`authority`='超级管理员'

### 其他详情（自行查阅代码）

登录请使用`UID`+`密码`登录
登录需要注册，注册后点跳转会自动把`uid`填写到登录`id`出