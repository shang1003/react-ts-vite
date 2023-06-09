import Mock from "mockjs";
// 使用 Mock.js 定义模拟数据
const random = Mock.Random;
const data = Mock.mock({
  code: 200,
  message: "成功",
  "userList|100": [
    {
      "id|+1": 1,
      name: "@cname",
      "age|18-60": 1,
      address: random.region(), //@region
      description: "我是mock拦截",
    },
  ],
});
Mock.mock("/api/user-list", "get", data);
//模拟详情请求
Mock.mock(/\/api\/user-detail\?id=/, "get", (options) => {
  // 解析 URL 参数获取 id 值
  console.log(options, "options");

  const id = options.url.split("id=")[1];
  if (id !== null) {
    return {
      ...data.userList.find((it: { id: any }) => it.id == id),
    };
  } else {
    return {
      code: 400,
      message: "参数错误",
    };
  }
});

Mock.mock("/api/user-count", "get", [
  { registration_date: "2022-8-12", registration_count: 12 },
  { registration_date: "2022-8-23", registration_count: 30 },
  { registration_date: "2022-8-26", registration_count: 2 },
  { registration_date: "2022-8-30", registration_count: 23 },
]);
Mock.mock("/api/userinfo", "get", { username: "MOCK" });
Mock.mock("/api/login", "post", (option) => {
  const { body } = option;
  const { username } = JSON.parse(body);
  return { username };
});
