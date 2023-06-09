const express = require("express");
const util = require("util");
const jwt = require("jsonwebtoken");
const secretKey = "secret_key";
const { connectDatabase } = require("./connect-database");
const getToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "30m" });
};

const decoded = (token) => {
  return jwt.verify(token, secretKey);
};
const app = express();
const port = 9000;

//连接数据库
const pool = connectDatabase;

// 转换为返回 Promise 的函数
const getConnection = util.promisify(pool.getConnection).bind(pool);

// 执行查询
async function executeQuery(query, values) {
  let connection;
  try {
    connection = await getConnection();
    const queryAsync = util.promisify(connection.query).bind(connection);
    const results = await queryAsync(query, values);
    return results;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

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
      try {
        const { username } = decoded(cookies["access_token"]);
        res.send({ username });
      } catch (error) {
        res.status(401);
        res.send({ message: "access_token过期" });
      }
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
  executeQuery("SELECT * FROM userlist WHERE name = ? AND password=?", [
    username,
    password,
  ])
    .then((results) => {
      if (results.length === 1) {
        res.setHeader(
          "Set-Cookie",
          `access_token=${getToken({ username })}; expires=` +
            new Date(new Date().getTime() + 30 * 60 * 1000).toUTCString() //30分钟access_token过期
        );
        res.send(req.body);
        userinfo = req.body;
      } else if (results.length === 0) {
        res.status(400);
        res.send("用户名或密码错误");
        res.end();
      }
    })
    .catch(() => {
      res.status(400);
      res.send("数据库连接出错");
      res.end();
    });
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

//列表
app.get("/user-list", async (req, res) => {
  try {
    const results = await executeQuery(
      "SELECT id,name,age,address,description,create_time FROM userlist order by create_time desc"
    );
    res.send({
      userList: results,
    });
  } catch (error) {
    res.status(400);
    res.send({ message: error });
  }
});

//列表详情

app.get("/user-detail", (req, res) => {
  const { id } = req.query;
  executeQuery(
    "SELECT id,name,age,address,description,create_time FROM userlist WHERE id = ?",
    [id]
  )
    .then((results) => {
      res.send({
        ...results[0],
      });
    })
    .catch(() => {
      res.status(400);
      res.send({ message: "查询出错" });
      res.end();
    });
});

//注册用户
app.post("/user-create", async (req, res) => {
  const checkQuery = `SELECT * FROM userlist WHERE name = ?`;
  const insertQuery = `INSERT INTO userlist SET ?`;
  try {
    const user = await executeQuery(checkQuery, [req.body.name]);
    if (user.length > 0) {
      res.status(400);
      res.send({ message: "用户名已存在" });
      res.end();
      return;
    }

    const insertUser = await executeQuery(insertQuery, {
      ...req.body,
      create_time: new Date(),
    });
    res.send(insertUser);
  } catch (error) {
    res.status(400);
    res.send({ message: error });
    res.end();
  }
});

//删除用户
app.delete("/user-delete", async (req, res) => {
  const id = req.body.id;
  try {
    await executeQuery("DELETE FROM userlist WHERE id = ?", id);
    res.send("删除成功");
  } catch (error) {
    res.status(400);
    res.send({ message: err });
  }
});

//编辑用户
app.post("/user-edit", (req, res) => {
  const data = req.body;
  executeQuery("UPDATE userlist SET ? WHERE id = ?", [data, data.id])
    .then(() => {
      res.send("编辑成功");
    })
    .catch(() => {
      res.status(400);
      res.send({ message: error });
      res.end();
    });
});
//获取用户每天注册数量
app.get("/user-count", async (req, res) => {
  const query = `SELECT DATE(create_time) as registration_date, COUNT(*) as registration_count 
               FROM userlist 
               GROUP BY DATE(create_time)`;
  try {
    const result = await executeQuery(query);
    const data = result.map(({ registration_date, registration_count }) => ({
      registration_date: registration_date.toISOString().split("T")[0],
      registration_count,
    }));

    res.send(data);
  } catch (error) {
    res.status(400);
    res.send({ message: error });
    res.end();
  }
});
