let submitbutton = document.querySelector('.submit');
submitbutton.addEventListener('click', function(e) {
  e.preventDefault();
  let form = document.querySelector('.form');
  let formData = new FormData(form);
  let dataObject = Object.fromEntries(formData.entries());
  // Output: { username: "john_doe", password: "johnpasswprd" }
  if(localStorage.getItem("credentials")==null) {
    dataObject.perms = "admin";
    dataObject = {1: dataObject};
    localStorage.setItem("credentials", JSON.stringify(dataObject));
  }
  else {
    dataObject.perms = "user";
    const num = Object.keys(JSON.parse(localStorage.getItem("credentials"))).length+1;
    dataObject = {num: dataObject};
    localStorage.setItem("credentials", JSON.stringify(dataObject));
  }
});
// {1: {username: "admin", password: "admin1234", perms: "admin"}, 2: {username: "user1", password: "123", perms: "user"}}
