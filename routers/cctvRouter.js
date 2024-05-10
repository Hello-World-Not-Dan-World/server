const express = require("express");
const fs = require("fs");

const cctvRouter = express.Router();

cctvRouter.post("/cctv", (req, res) => {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .replace(/:/g, "-")
    .replace(/\..+/, "");

  const frameData = req.body.img;
  const decodedFrame = Buffer.from(frameData, "base64");
  const filePath = `./cctvData/${req.body.id}/${formattedDate}.jpg`;
  fs.writeFile(filePath, decodedFrame, (err) => {
    if (err) throw err;
    console.log(`'${filePath}' 파일이 성공적으로 저장되었습니다.`);
  });
  fs.readFile("./cctvData/database.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    try {
      // JSON 데이터 파싱
      const jsonData = JSON.parse(data);

      // JSON 데이터 수정
      if (req.body.id == "cctv1") {
        jsonData.cctv1.state = "dirty";
      }
      if (req.body.id == "cctv2") {
        jsonData.cctv2.state = "dirty";
      }
      if (req.body.id == "cctv3") {
        jsonData.cctv3.state = "dirty";
      }
      if (req.body.id == "cctv4") {
        jsonData.cctv4.state = "dirty";
      }
      if (req.body.id == "cctv5") {
        jsonData.cctv5.state = "dirty";
      }
      if (req.body.id == "cctv6") {
        jsonData.cctv6.state = "dirty";
      }

      // 수정된 JSON 데이터를 다시 문자열로 변환
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
  res.send("OK");
});

module.exports = cctvRouter;
