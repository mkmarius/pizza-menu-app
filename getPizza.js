const menuSection = document.querySelector(".menu-section");
let pizzaStorage = window.sessionStorage;
// pizzaStorage.clear();
const sortSelect = document.querySelector("#sort"); //select tag with sorting options
let sortingKey;
let pizzas = [];

function sortByName(a, b) {
  if (a.pName > b.pName) {
    return 1;
  } else if (a.pName < b.pName) {
    return -1;
  }
}
function sortByPrice(a, b) {
  if (a.pPrice > b.pPrice) {
    return 1;
  } else if (a.pPrice < b.pPrice) {
    return -1;
  }
}
function sortByHeat(a, b) {
  if (a.pHeat > b.pHeat) {
    return 1;
  } else if (a.pHeat < b.pHeat) {
    return -1;
  }
}

function initPizza() {
  //loads up pizzas from sessionStorage by default and after sorting
  if (pizzaStorage.getItem("pizza") === null) {
    pizzas = [];
  } else {
    pizzas = JSON.parse(pizzaStorage.getItem("pizza"));
    //when sorting option is selected the pizzas are sorted accordingly
    sortSelect.addEventListener("change", () => {
      sortingKey = sortSelect.value;
      menuSection.innerText = ""; //deletes the unsorted pizzas
      switch (sortingKey) {
        case "p-name":
          pizzas.sort(sortByName);
          displayPizza();
          break;
        case "price":
          pizzas.sort(sortByPrice);
          displayPizza();
          break;
        case "heat":
          pizzas.sort(sortByHeat);
          displayPizza();
          break;
        default:
          pizzas.sort(sortByName);
          displayPizza();
      }
    });
    displayPizza();
  }
}
function displayPizza() {
  let i = 0;
  // console.log(JSON.parse(pizzaStorage.getItem("pizza"))[0]);
  pizzas.forEach((pizza, key) => {
    // console.log(key);
    let pizzaDiv = document.createElement("div");
    pizzaDiv.classList.add("pizza-div");
    const pepperDiv = document.createElement("div");
    pepperDiv.classList.add("pepper");
    const pepper = document.createElement("img"); //pepper image used to show heat level
    pepper.src = "./images/pepper.png";
    const deletePizzaBtn = document.createElement("img");
    deletePizzaBtn.src = "./images/cross.png";

    deletePizzaBtn.addEventListener("click", (e) => {
      if (window.confirm("Do you really want to delete the pizza?")) {
        //alert that asks for deletion confirmation
        deletePizzaBtn.classList.add("delete");
        deleteCheck(e, key);
      }
    });

    const crossDiv = document.createElement("div"); //container for cross/delete image
    crossDiv.classList.add("cross");
    menuSection.appendChild(pizzaDiv);
    //pizza representation
    pizzaDiv.innerHTML = `<h3>${pizza.pName}</h3>
      <img src="./images/${pizza.pPhoto}.jpg">
     <h3>${pizza.pPrice} €</h3>
     <h4>Toppings</h4>
     <p>${pizza.toppings}</p>
     <h4>Spiciness</h4>
     `;
    crossDiv.appendChild(deletePizzaBtn);
    pizzaDiv.appendChild(crossDiv);
    pizzaDiv.appendChild(pepperDiv);
    //how many peppers to show
    switch (pizza.pHeat) {
      case "1":
        pepperDiv.innerHTML += pepper.outerHTML;
        break;
      case "2":
        pepperDiv.innerHTML += pepper.outerHTML + pepper.outerHTML;
        break;
      case "3":
        pepperDiv.innerHTML +=
          pepper.outerHTML + pepper.outerHTML + pepper.outerHTML;
        break;
      default:
        pepperDiv.appendChild(pepper);
    }
  });
}
initPizza();

function deleteCheck(e, key) {
  //if pizza is ready to be deleted and which one should be deleted
  const item = e.target;
  if (item.classList[0] == "delete") {
    const button = item.parentElement;
    const pizza = button.parentElement;
    // console.log(key);
    pizza.remove();
    removePizza(key);
  }
}

function removePizza(key) {
  //remove pizza from sessionStorage
  let pizzas;
  if (pizzaStorage.getItem("pizza") === null) {
    pizzas = [];
  } else {
    pizzas = JSON.parse(pizzaStorage.getItem("pizza"));
  }
  pizzas.splice(key, 1); //removes the deleted pizza from pizzas array
  pizzaStorage.setItem("pizza", JSON.stringify(pizzas)); //updates sessionStorage
}
