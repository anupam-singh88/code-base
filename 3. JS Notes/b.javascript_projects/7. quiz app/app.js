const quesArr = [
  {
    id: 1,
    question: "What is the most used programming <br> language in 2019",
    ops1: "Java",
    ops2: "Javascript",
    ops3: "Pyhton",
    ops4: "PHP",
    ans: "Java",
  },
  {
    id: 2,
    question: "Who is the President of US?",
    ops1: "Narendra Modi",
    ops2: "Rahul Gandhi",
    ops3: "Yogi Adityanath",
    ops4: "Mayawati",
    ans: "Narendra Modi",
  },
  {
    id: 3,
    question: "What is your age",
    ops1: "21",
    ops2: "22",
    ops3: "23",
    ops4: "24",
    ans: "22",
  },
  {
    id: 4,
    question: "What is favourite food",
    ops1: "Chole Bhature",
    ops2: "Biryani",
    ops3: "Pkode",
    ops4: "Chawal Dal",
    ans: "Chole Bhature",
  },
];

let box = document.querySelector(".box");
let id = 0;

document.addEventListener("DOMContentLoaded", populateData());

function populateData() {
  var currId = 0;
  let html = `<h2 style="text-align: center; margin: 30px">
    ${quesArr[currId].question}
    </h2>
    <div class="ops">
    <input type="radio" name="options" id="ops1" value="${quesArr[currId].ops1}" />
    <label for="ops1">${quesArr[currId].ops1}</label> <br />
    <input type="radio" name="options" id="ops2" value="${quesArr[currId].ops2}" />
    <label for="ops2">${quesArr[currId].ops2}</label><br />
  <input type="radio" name="options" id="ops3" value="${quesArr[currId].ops3}" />
  <label for="ops3">${quesArr[currId].ops3}</label><br />
  <input type="radio" name="options" id="ops4" value="${quesArr[currId].ops4}" />
  <label for="ops4">${quesArr[currId].ops4}</label>
  </div>
  <button id="btn">Submit</button>`;
  box.innerHTML = html;
}

function updateData() {
  id++;

  if (id <= 3) {
    let html = `<h2 style="text-align: center; margin: 30px">
  ${quesArr[id].question}
 </h2>
 <div class="ops">
   <input type="radio" name="options" id="ops1" value="${quesArr[id].ops1}" />
   <label for="ops1">${quesArr[id].ops1}</label> <br />
   <input type="radio" name="options" id="ops2" value="${quesArr[id].ops2}" />
   <label for="ops2">${quesArr[id].ops2}</label><br />
   <input type="radio" name="options" id="ops3" value="${quesArr[id].ops3}" />
   <label for="ops3">${quesArr[id].ops3}</label><br />
   <input type="radio" name="options" id="ops4" value="${quesArr[id].ops4}" />
   <label for="ops4">${quesArr[id].ops4}</label>
 </div>
 <button id="btn1">Submit</button>`;
    box.innerHTML = html;
    const btn1 = document.getElementById("btn1");

    btn1.addEventListener("click", () => {
      checkvalue();
    });
  } else {
    // alert("You have completed the quiz!");
    resultData();
  }
}
function resultData() {
  let html = `<h2 style="text-align: center; margin: 30px">
   Your Answers
   </h2>
   `;
  for (let key in data) {
    html += `<p style="font-size: 20px; text-align: left;"> ${+key + 1} : ${
      data[key]
    }</p>`;
  }
  html += ` <button id='btn1'>Check Marks</button>`;
  box.innerHTML = html;
  document.getElementById("btn1").addEventListener("click", () => {
    if (
      data[0] == "Java" &&
      data[1] == "Narendra Modi" &&
      data[2] == 22 &&
      data[3] == "Chole Bhature"
    ) {
      console.log("full marks");
    }
    alert("your marks are " + 4);
  });
}

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  checkvalue();
});
function checkvalue() {
  const ops1 = document.getElementById("ops1").checked;
  const ops2 = document.getElementById("ops2").checked;
  const ops3 = document.getElementById("ops3").checked;
  const ops4 = document.getElementById("ops4").checked;

  if (ops1 || ops2 || ops3 || ops4) {
    saveData();
    updateData();
  } else {
    alert("Kindly Select One Option");
  }
}

const data = [];
function saveData() {
  const ops1 = document.getElementById("ops1").checked;
  const ops2 = document.getElementById("ops2").checked;
  const ops3 = document.getElementById("ops3").checked;
  const ops4 = document.getElementById("ops4").checked;
  if (ops1) {
    data.push(document.getElementById("ops1").value);
  } else if (ops2) {
    data.push(document.getElementById("ops2").value);
  } else if (ops3) {
    data.push(document.getElementById("ops3").value);
  } else if (ops4) {
    data.push(document.getElementById("ops4").value);
  }
}
