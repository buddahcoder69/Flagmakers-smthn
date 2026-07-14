const submitbutton = document.querySelector('.submit');
submitbutton.addEventListener('click', function(e) {
  e.preventDefault();
  const form = document.querySelector('.form');
  const formData = new FormData(form);
  const dataObject = Object.fromEntries(formData.entries());
  console.log("i have been clicked");
  console.log(dataObject); 
  // Output: { username: "john_doe", email: "john@example.com" }
});