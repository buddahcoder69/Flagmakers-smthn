let submitbutton = document.querySelector('.submit');
submitbutton.addEventListener('click', function(e) {
  e.preventDefault();
  let form = document.querySelector('.form');
  let formData = new FormData(form);
  let dataObject = Object.fromEntries(formData.entries());
  // Output: { username: "john_doe", password: "johnpasswprd" } this is the user input
  
  if(!dataObject.username || !dataObject.password) {
    let message = document.getElementById('noempty');
    message.classList.remove('hidden');
    console.log("fejkahdkfjhe")
  }
  else {
    if(localStorage.getItem("credentials")==null) {
    dataObject.perms = "admin";
    dataObject = {1: dataObject};
    localStorage.setItem("credentials", JSON.stringify(dataObject));
    }
    else {
      let no = false;
      const creds = JSON.parse(localStorage.getItem('credentials'));
      for(const [key, value] of Object.entries(creds)) {
        // value is the stored user object
        if(value && value.username === dataObject.username) {
          let message = document.getElementById('eeee');
          message.classList.remove('hidden');
          no = true;
          console.log('hehsajkhvkjlhsedf')
          break;
        }
      }
      if(!no) {
        dataObject.perms = "user";
        const num = String(Object.keys(JSON.parse(localStorage.getItem("credentials"))).length+1);
        dataObject = {[num]: dataObject};
        const combined = {...JSON.parse(localStorage.getItem("credentials")), ...dataObject};
        localStorage.setItem("credentials", JSON.stringify(combined));
      }
    }
    if(typeof no === 'undefined' || no===false) {
      let message = document.getElementById('signupcomplete');
      message.classList.remove('hidden');
      console.log('ueuueruyeryeureurueiukszdf');
    }
  }
});
// {1: {username: "admin", password: "admin1234", perms: "admin"}, 2: {username: "user1", password: "123", perms: "user"}}