const express = require("express");
const app = express();
const port = 5000;

//绑定并监听指定主机和端口上的连接。此方法与 Node 的http.Server.listen()相同。
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//处理body
app.use(express.json());
app.get("/userinfo", (req, res) => {
  const data = [];
  data.length = 10000;
  res.send(data.fill(10000));
});
