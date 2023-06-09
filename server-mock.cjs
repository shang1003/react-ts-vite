const express = require("express");
const app = express();
const port = 9000;
const Mock = require("mockjs");

// // 使用 Mock.js 定义模拟用户列表数据
let { userList } = Mock.mock({
  "userList|4": [
    {
      "id|+1": 1,
      name: "@cname",
      "age|18-60": 1,
      address: "@region",
      description: "我是接口请求",
    },
  ],
});

//绑定并监听指定主机和端口上的连接。此方法与 Node 的http.Server.listen()相同。
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//处理body
app.use(express.json());

//前端整体页面刷新时，测试cookie是否失效，失效则退出登录
app.get("/userinfo", (req, res) => {
  const headers = req.headers;
  const cookieHeader = headers.cookie;
  const cookies = {};
  if (cookieHeader) {
    const cookieArr = cookieHeader.split(";");
    for (const cookie of cookieArr) {
      const [name, value] = cookie.split("=");
      cookies[name.trim()] = decodeURIComponent(value);
    }
    if (cookies["access_token"]) {
      res.send({
        username: "test",
      });
    } else {
      res.status(401);
      res.send("权限错误");
    }
  } else {
    res.status(401);
    res.send("权限错误");
  }
});
//退出登录，清除cookie
app.get("/logout", (req, res) => {
  res.setHeader("Set-Cookie", "access_token=;");
  res.end();
});

//登录测试
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "test" && password === "1234") {
    res.setHeader(
      "Set-Cookie",
      "access_token=12345678; expires=" +
        new Date(new Date().getTime() + 30 * 60 * 1000).toUTCString() //30分钟access_token过期
    );
    res.send({
      username,
    });
  } else {
    res.status(400);
    res.send("用户名或密码错误");
  }
});

//动态表单测试
app.post("/dynamic-form", (req, res) => {
  const { error } = req.body;
  if (error) {
    res.status(400);
    res.send({ message: "表单数据不正确" });
  }
  res.status(200);
  res.send(req.body);
});

//测试列表
app.get("/user-list", (req, res) => {
  setTimeout(() => {
    res.send({
      userList: userList,
    });
  }, 1000);
});

//列表详情
app.get("/user-detail", (req, res) => {
  const { id } = req.query;
  const data = userList.find((item) => item.id == id);
  if (!data) {
    res.status(400);
    res.send({ message: "id不存在" });
    return;
  }
  setTimeout(() => {
    res.send({
      ...data,
    });
  }, 1000);
});
//创建用户
app.post("/user-create", (req, res) => {
  const id = userList.length + 1;
  userList.unshift({
    id,
    ...req.body,
  });
  res.status(200);
  res.send(req.body);
});

//删除用户
app.delete("/user-delete", (req, res) => {
  const id = req.body.id;
  let num = -1;
  const isHave = userList.some((item, index) => {
    if (item.id == id) {
      num = index;
      return true;
    }
  });
  if (num > -1) userList.splice(num, 1);
  if (!isHave) {
    res.status(400);
    res.send("删除失败");
  } else {
    res.status(200);
    res.send(req.body);
  }
});

//编辑用户
app.post("/user-edit", (req, res) => {
  const data = req.body;
  userList = userList.map((item) => {
    if (item.id == data.id) {
      return { ...data };
    } else {
      return { ...item };
    }
  });
  res.status(200);
  res.send(req.body);
});

//获取用户每天注册数量
app.get("/user-count", (req, res) => {
  res.send([
    { registration_date: "2022-8-12", registration_count: 12 },
    { registration_date: "2022-8-23", registration_count: 30 },
    { registration_date: "2022-8-26", registration_count: 2 },
    { registration_date: "2022-8-30", registration_count: 23 },
  ]);
});
