const express = require("express");
const fs = require("fs");

const cctvRouter = express.Router();

cctvRouter.post("/", (req, res) => {
  const frameData = req.body.img;
  const decodedFrame = Buffer.from(frameData, "base64");
  const filePath = `./cctvData/cctv1/${req.body.photonum}.jpg`;
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
      var numberList = req.body.location.map(function (str) {
        return parseFloat(str, 10); // parseInt() 함수를 사용하여 문자열을 숫자로 변환합니다.
      });
      jsonData.mission.push({
        location: numberList,
        price: 1000,
        incentive: 0,
        photonum: parseInt(req.body.photonum, 10),
      });
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
