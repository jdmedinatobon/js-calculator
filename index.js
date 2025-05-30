var numBtns = document.querySelectorAll(".btn.num");
var opBtns = document.querySelectorAll(".btn.op");
var mainDisplay = document.querySelector(".main-display");
var miniDisplay = document.querySelector(".mini-display");

var userNum = ["", ""];

var activeUser = 0;
var activeUserOp = "add";

var clearMini = false;

for (i = 0; i < numBtns.length; i++) {
  numBtns[i].addEventListener("click", onNumClick);
}

for (i = 0; i < opBtns.length; i++) {
  opBtns[i].addEventListener("click", onOpClick);
}

function onNumClick(event) {
  if (clearMini) {
    updateMiniDisplay("");
    clearMini = false;
  }
  if (userNum[activeUser].length < 12) {
    userNum[activeUser] += event.target.innerText;
    updateMainDisplay(userNum[activeUser]);
  }
}

function onOpClick(event) {
  if (clearMini) {
    updateMiniDisplay("");
    clearMini = false;
  }
  divClicked = event.target.closest("div");
  eventOp = divClicked.id;

  if (eventOp === "CE") {
    userNum[activeUser] = "";
    updateMainDisplay(userNum[activeUser]);
  } else if (eventOp === "C") {
    reset();
    resetMainDisplay();
    resetMiniDisplay();
  } else if (eventOp === "DEL") {
    userNum[activeUser] = userNum[activeUser].slice(
      0,
      userNum[activeUser].length - 1
    );
    updateMainDisplay(userNum[activeUser]);
  } else if (eventOp === "dot") {
    if (!userNum[activeUser].includes(".")) {
      userNum[activeUser] += ".";
      updateMainDisplay(userNum[activeUser]);
    }
  } else if (eventOp !== "equal") {
    if (userNum[activeUser] === "") {
      userNum[activeUser] = "0";
    }
    activeUser = 1;
    activeUserOp = event.target.id;
    updateMiniDisplay(userNum[0] + " " + convertIdToOperator(activeUserOp));
    updateMainDisplay(userNum[1]);
  } else {
    for (var i = 0; i < 2; i++) {
      if (userNum[i] === "") {
        userNum[i] = 0;
      }
    }
    var funcOp = convertOperatorToFunction(activeUserOp);
    var result = calculator(
      parseFloat(userNum[0]),
      parseFloat(userNum[1]),
      window[funcOp]
    );

    result += "";
    result = result.slice(0, 13);

    updateMainDisplay(result);
    updateMiniDisplay(
      userNum[0] +
        " " +
        convertIdToOperator(activeUserOp) +
        " " +
        userNum[1] +
        " ="
    );
    reset();
  }
}

function reset() {
  userNum = ["", ""];
  activeUser = 0;
  activeUserOp = "add";
  clearMini = true;
}

function resetMainDisplay() {
  updateMainDisplay("");
}

function resetMiniDisplay() {
  updateMiniDisplay("");
}

function convertOperatorToFunction(operator) {
  if (operator === "x") {
    return "multiply";
  } else if (operator === "add") {
    return "add";
  } else if (operator === "sub") {
    return "subtract";
  } else if (operator === "mod") {
    return "modulo";
  } else if (operator === "div") {
    return "divide";
  } else if (operator === "pow2") {
    return "pow2";
  } else if (operator === "sqrt") {
    return "sqrt";
  } else {
    console.log(operator);
    return "Error";
  }
}

function convertIdToOperator(operator) {
  if (operator === "x") {
    return "x";
  } else if (operator === "add") {
    return "+";
  } else if (operator === "sub") {
    return "-";
  } else if (operator === "mod") {
    return "%";
  } else if (operator === "div") {
    return "/";
  } else {
    console.log(operator);
    return "Error";
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function modulo(num1, num2) {
  return num1 % num2;
}

function calculator(num1, num2, operator) {
  return operator(num1, num2);
}

function updateMainDisplay(text) {
  mainDisplay.innerHTML = text;
}

function updateMiniDisplay(text) {
  miniDisplay.innerHTML = text;
}
