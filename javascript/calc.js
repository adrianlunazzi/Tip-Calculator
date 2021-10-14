const billAmount = document.getElementById("amount");
const btnDiscount = document.querySelectorAll(".tips");
const customDiscount = document.getElementById("custom-discount");
const people = document.getElementById("people");
const errorMsg = document.querySelector(".msg-error");
const results = document.querySelectorAll(".result");
const resetBtn = document.querySelector(".reset");

/*Events*/
billAmount.addEventListener("input", setBillAmountValue);
btnDiscount.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
customDiscount.addEventListener("input", setCustomDiscountValue);
people.addEventListener("input", setPeopleValue);
resetBtn.addEventListener("click", reset);

/*Initial values*/
let billAmountValue = 0.0; //valor inicial
let tipValue = 0.15; // valor por default (active)
let peopleValue = 1;

function validateFloat(s) {
  let rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}
function validateInt(s) {
  let rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

function setBillAmountValue() {
  if (billAmount.value.includes(",")) {
    billAmount.value = billAmount.value.replace(",", ".");
  }
  if (!validateFloat(billAmount.value)) {
    billAmount.value = billAmount.value.substring(
      0,
      billAmount.value.length - 1
    );
    billAmount.value;
  }

  billAmountValue = parseFloat(billAmount.value);
  calculateTip();
}

function handleClick(event) {
  btnDiscount.forEach((btn) => {
    btn.classList.remove("active");

    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add("active");
      tipValue = parseFloat(btn.innerHTML) / 100;
    }
  });
  customDiscount.value = "";
  calculateTip();
}

function setCustomDiscountValue() {
  if (!validateInt(customDiscount.value)) {
    customDiscount.value = customDiscount.value.substring(
      0,
      customDiscount.value.length - 1
    );
  }
  customDiscountValue = parseFloat(customDiscount.value / 100);
  console.log(customDiscountValue);

  btnDiscount.forEach((btn) => {
    btn.classList.remove("active");
  });
  if (customDiscountValue !== "") {
    calculateTip();
  }
}
function setPeopleValue() {
  if (!validateInt(people.value)) {
    people.value = people.value.substring(0, people.value.length - 1);
  }

  if (people.value <= 0) {
    errorMsg.classList.add("show-error-msg");
    setTimeout(function () {
      errorMsg.classList.remove("show-error-msg");
    }, 2000);
  }
  peopleValue = parseFloat(people.value);
  calculateTip();
}

/*Calculos*/
function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billAmountValue * tipValue) / peopleValue;
    let total = (billAmountValue * (tipValue + 1)) / peopleValue;
    results[0].innerHTML = "$" + tipAmount.toFixed(2);
    results[1].innerHTML = "$" + total.toFixed(2);
  }
}

function reset() {
  billAmount.value = "0";
  setBillAmountValue();
  btnDiscount[2].click();
  people.value = "1";
  setPeopleValue();
}
