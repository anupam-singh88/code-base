let arr = [
  {
    id: 1,
    qus: "what is the name of your country?",
    opt1: "india",
    opt2: "pakistan",
    opt3: "china",
  },
  {
    id: 2,
    qus: "what is the reiligion of your country?",
    opt1: "Hindu",
    opt2: "Muslim",
    opt3: "Budheses",
  },
  {
    id: 3,
    qus: "what is your language?",
    opt1: "Hindi",
    opt2: "Urdu",
    opt3: "Chinese",
  },
];
//setting the values
let counter = 0;
let resArr = [];
let submit = document.getElementById("btn");
let html = "";

window.addEventListener("DOMContentLoaded", onload);
function onload(params) {
  let cNum = 0;
  let dom = arr[cNum];

  html += `<p>Q .<span >${dom.id}</span> ${dom.qus}</p>
    <input type="radio" name="1" value="${dom.opt1}" id="radio1" />${dom.opt1} <br />
    <input type="radio" name="1" value="${dom.opt2}" id="radio2" />${dom.opt2} <br />
    <input type="radio" name="1" value="${dom.opt3}" id="radio3" />${dom.opt3} <br />
    <br />`;
  document.getElementById("con").innerHTML = html;
  submit.addEventListener("click", function () {
    let radio1 = document.getElementById("radio1");
    let radio2 = document.getElementById("radio2");
    let radio3 = document.getElementById("radio3");

    if (
      radio1.checked == true ||
      radio2.checked == true ||
      radio3.checked == true
    ) {
      inc();
    } else {
      alert("Please Select One Option");
    }

    if (radio1.checked == true) {
      resArr.push(radio1.value);
      // console.log(radio1.value);
    }
    if (radio2.checked == true) {
      resArr.push(radio2.value);
      // console.log(resArr);
      // console.log(radio2.value);
    }
    if (radio3.checked == true) {
      // console.log(radio3.value);
      resArr.push(radio3.value);
    }
  });
}
function inc() {
  let a = ++counter;
  if (a === 3) {
    responseadd();
  }
  while (a <= 2) {
    let itm = arr[counter];

    html = "";
    html += `<p>Q .<span >${itm.id}</span> ${itm.qus}</p>
      <input type="radio" name="1" value="${itm.opt1}" id="radio1" />${itm.opt1} <br />
      <input type="radio" name="1" value="${itm.opt2}" id="radio2" />${itm.opt2} <br />
      <input type="radio" name="1" value="${itm.opt3}" id="radio3" />${itm.opt3} <br />
      <br />`;
    document.getElementById("con").innerHTML = html;
    a++;
  }
}

function responseadd() {
  let html = "";
  html += `<p id="result">Your response has been succesfully added. To view the response click the show result button.</p>
    <button id="btn2">Show Result</button>`;

  document.getElementById("con").innerHTML = html;
  let btn2 = document.getElementById("btn2");
  btn2.addEventListener("click", function () {
    resArr.forEach(function (elm) {
      html += `<p id="result">${elm}</p><br/>`;
    });
    document.getElementById("con").innerHTML = html;

    console.log(resArr);
  });
  submit.style.display = "none";
}
