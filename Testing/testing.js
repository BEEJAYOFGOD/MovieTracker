const userCardTemplate = document.querySelector("[data-user-template]");
const userCards = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

// async function getUserData() {
//   const resp = await fetch("https://json.placeholder.typicode.com/users");
//   const data = await resp.json;

//   data.forEach((user) => {
//     const card = userCardTemplate.textContent.cloneNode(true).children[0];
//     console.log(card);
//   });
// }

// getUserData();
let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  console.log(value);
  console.log(users);
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => {
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];

      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");

      header.textContent = user.name;
      body.textContent = user.email;
      // console.log(user);

      userCards.append(card);

      return { name: user.name, email: user.email, element: card };
    });
  })
  .catch((error) => {
    console.log("error : ", error);
  });
