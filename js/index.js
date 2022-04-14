let monstersList = document.querySelector("#monster-container");
let pageNumber = 1;

fetch("http://localhost:3000/monsters/?_limit=50")
  .then((res) => res.json())
  .then((data) => displayMonsters(data))
  .catch((err) => console.log(err));

function displayMonsters(data) {
  data.forEach((monster) => {
    let monsterName = document.createElement("h2");
    let monsterAge = document.createElement("h4");
    let monsterInfo = document.createElement("p");
    monsterName.textContent = monster.name;
    monsterAge.textContent = `Age: ${monster.age}`;
    monsterInfo.textContent = `Description: ${monster.description}`;
    monstersList.append(monsterName, monsterAge, monsterInfo);
  });
}

const form = document.querySelector("#new-monster");
console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let newMonster = {
    name: e.target["new-name"].value,
    age: e.target["new-age"].value,
    description: e.target["new-description"].value,
  };
  createNewMonster(newMonster);
  form.reset();
});

function createNewMonster(info) {
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

const forwardButton = document.querySelector("#forward");
forwardButton.addEventListener("click", handelForwardButton);

const backButton = document.querySelector("#back");
backButton.addEventListener("click", handelBackButton);

function handelForwardButton() {
  monstersList.innerHTML = "";
  pageNumber++;
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then((res) => res.json())
    .then((data) => displayMonsters(data))
    .catch((err) => console.log(err));
}

function handelBackButton() {
  monstersList.innerHTML = "";
  pageNumber--;
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
    .then((res) => res.json())
    .then((data) => displayMonsters(data))
    .catch((err) => console.log(err));
}
