const express = require("express");

const loginRouter = express.Router();

let credit = { user: 5000, hunter: 0 };

loginRouter.post("/login", (req, res) => {
  if (req.body.id == "user") {
    res.send(credit.user);
  } else if (req.body.id == "hunter") {
    res.send(credit.hunter);
  }
});

loginRouter.post("/pay", (req, res) => {
  credit.user = credit.user - req.body.amount;
  fs.readFile("./cctvData/database.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      // JSON 데이터 파싱
      const jsonData = JSON.parse(data);

      jsonData.mission[req.body.num] =
        jsonData.mission[req.body.num] + req.body.amount;
      const modifiedJsonData = JSON.stringify(jsonData, null, 2);

      // 수정된 JSON 데이터를 파일에 쓰기
      fs.writeFile(
        "./cctvData/database.json",
        modifiedJsonData,
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return;
          }
          console.log("JSON 파일이 성공적으로 수정되었습니다.");
        }
      );
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  });
  console.log(credit);
  res.send("OK");
});

loginRouter.post("/reward", (req, res) => {
  fs.readFile("./cctvData/database.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      // JSON 데이터 파싱
      const jsonData = JSON.parse(data);

      credit.hunter =
        jsonData.mission[req.body.num].price +
        jsonData.mission[req.body.num].incentive;

      delete jsonData.mission(req.body.num);
      const modifiedJsonData = JSON.stringify(jsonData, null, 2);

      // 수정된 JSON 데이터를 파일에 쓰기
      fs.writeFile(
        "./cctvData/database.json",
        modifiedJsonData,
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return;
          }
          console.log("JSON 파일이 성공적으로 수정되었습니다.");
        }
      );
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  });
  console.log(credit);
  res.send("OK");
});

module.exports = loginRouter;
