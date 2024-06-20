// if (password != password1{

// })
let password = document.getElementById("password");
let password1 = document.getElementById("password1");
let registerForm = document.getElementById("registerForm"); // Assuming button ID is 'register'
let errorText = document.querySelector("p.error-text");

registerForm.addEventListener("submit", (e) => {
  if (password.value !== password1.value) {
    // Use strict comparison and value property
    e.preventDefault();
    errorText.style.display = "flex";
  } else {
    // Handle successful password confirmation (optional: submit form, etc.)
  }
});
