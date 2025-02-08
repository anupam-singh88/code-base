const tokens = ["token1", "token2"];

const request = [
  [
    "GET",
    "http://localhost:3000?token=token1&name=pradeep&age=25&department=node",
  ],
  ["POST", "http://localhost:3000?token=token1&password=pass@12345&name=amit"],
  ["GET", "http://localhost:3000?token=token3&name=akash&age=40"],
  ["GET", "http://localhost:3000?xyz=muskan"],
  ["POST", "http://localhost:3000?password=pa5&name=arjun"],
  ["POST", "http://localhost:3000?token=token1&password=pa5&name=kaveri"],
  ["POST", "http://localhost:3000?token=random&password=pa5&name=sanyukta"],
];

let result = [
  {
    method: "GET",
    url: "http://localhost:3000",
    isValid: true,
    name: "pradeep",
    age: 25,
    department: "node",
  },
  {
    method: "POST",
    url: "http://localhost:3000",
    isValid: true,
    name: "amit",
  },
  {
    method: "GET",
    url: "http://localhost:3000",
    isValid: false,
    name: "akash",
    age: 40,
    message: "Invalid token",
  },
  {
    method: "GET",
    url: "http://localhost:3000",
    isValid: false,
    xyz: "muskan",
    message: "Invalid token",
  },
  {
    method: "POST",
    url: "http://localhost:3000",
    isValid: false,
    name: "arjun",
    message: "Invalid token",
  },
  {
    method: "POST",
    url: "http://localhost:3000",
    isValid: false,
    name: "kaveri",
    message: "Invalid password",
  },
  {
    method: "POST",
    url: "http://localhost:3000",
    isValid: false,
    name: "sanyukta",
    message: "Invalid token",
  },
];

const resultArr = [];

function generateResponse(requestArr) {
  requestArr.forEach(([method, urlP]) => {
    const urlParams = new URLSearchParams(urlP);
    const host = urlP.split("?")[0];

    const token = urlParams.get("token");

    const name = urlParams.get("name");
    const age = urlParams.get("age");
    const department = urlParams.get("department");
    const password = urlParams.get("password");

    const newObj = {
      url: host,
      method,
      name,
      age,
      department,
      isValid: tokens.includes(token),
    };
    resultArr.push(newObj);
  });
}

generateResponse(request);

console.log("🚀 ~ resultArr:", resultArr);
