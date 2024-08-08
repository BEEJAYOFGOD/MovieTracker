const container = document.querySelector(".container");
const cardTemplate = document.getElementById("card-template");

for (let i = 0; i < 11; i++) {
  container.append(cardTemplate.content.cloneNode(true));
}

console.log(cardTemplate.content);

fetch("data.json")
  .then((response) => response.json())
  .then((posts) => {
    container.textContent = "";

    posts.forEach((post) => {
      const div = cardTemplate.content.cloneNode(true);

      div.getElementById("card-link").href = post.link;
      div.getElementById("logo-img").src = post.logoImage;
      div.getElementById("card-title").textContent = post.title;
      div.getElementById("card-details").textContent = post.details;
      div.getElementById("cover-img").src = post.coverImage;

      div.getElementById(
        "card-footer"
      ).innerHTML = `<ion-icon name="arrow-up"></ion-icon>
          <ion-icon name="chatbox-ellipses"></ion-icon>
          <ion-icon name="bookmark"></ion-icon>`;

      container.append(div);
    });
  });
