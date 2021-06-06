const pizzaName = document.querySelector("#name");
const pizzaPrice = document.querySelector("#price");
const pizzaHeat = document.querySelector("#heat");
const option1 = document.querySelector("#option-1"); //toppings option 1
const option2 = document.querySelector("#option-2"); //toppings option 2
const pizzaForm = document.querySelector(".pizza-form");
const pizzaBtn = document.querySelector("#add-pizza");
const pizzaRadioBtn = document.querySelectorAll("#image");
const menuSection = document.querySelector(".menu-section");
const pizzaAlert = document.querySelector(".alert");
let pizzaToppings;
let pizzaStorage = window.sessionStorage;
let pizzas = [];
let imageBtnValue = "";

pizzaForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

pizzaForm.addEventListener("submit", addPizza);
//when radio button is clicked image name is saved
pizzaRadioBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    imageBtnValue = btn.value;
  });
});

// pizzaStorage.clear();
function addPizza() {
  pizzaToppings = [];
  pizzaToppings.push(option1.value);
  pizzaToppings.push(option2.value);
  //main pizza object
  let pizza = {
    pName: pizzaName.value,
    pPrice: pizzaPrice.value,
    pHeat: pizzaHeat.value,
    toppings: pizzaToppings,
    pPhoto: imageBtnValue,
  };
  pizzas.push(pizza);
  pizzaStorage.setItem("pizza", JSON.stringify(pizzas)); //add pizzas array to sessionStorage
  pizzaAlert.style.opacity = "1"; //pizza added alert
  setTimeout(function () {
    pizzaAlert.style.opacity = "0";
  }, 1000);
  // console.log(pizzas);
  //Form clean up
  pizzaName.value = "";
  pizzaPrice.value = "";
  pizzaHeat.value = "";
  option1.value = "First topping";
  option2.value = "Second topping";
  imageBtnValue.value = "";
  pizzaRadioBtn.forEach((btn) => {
    if (btn.checked) {
      btn.checked = false;
    }
  });
}
