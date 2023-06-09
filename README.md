# react-vite-ts

框架：typescript 、react-router v6 / react+vite、bizchart、threejs，本系统支持动态表单，中英文切换，可视化图表、3D 基础图形，g6 基本使用等等，封装 axios 请求、表单创建、删除等 hook，table 组件封装

## 安装

```sh
npm install
```

### 运行

```sh
1.mock（方式一）
    node server-mock.cjs
    数据是从mock自动生成，登录用户test 密码1234
    登录 用户名test  密码1234
    npm run dev
```

```sh
2.server-mysql（（方式二）
    node server-mysql.cjs
    数据是从mysql，需要安装mysql
    项目中mysql数据库名为test 表位userlist


    表定义
CREATE TABLE IF NOT EXISTS `userlist`(
`id` SMALLINT AUTO_INCREMENT,
`name` VARCHAR(20) NOT NULL,
`age` INT,
`address` VARCHAR(255),
`password` VARCHAR(255),
`description` VARCHAR(255),
`create_time` DATETIME,
PRIMARY KEY(`id`))ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


npm run dev
```

3.方式三
将 main 入口文件中代码 import "@/mock/data"; 放开
npm run dev
登录 用户名 test 密码 1234

### 编译

```sh
npm run build
```
