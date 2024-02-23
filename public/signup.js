//Driver function- calling this function in form's onsubmit method.
async function signup(event) {
  event.preventDefault();
  let signupObj = {
    name: document.getElementById("name").value,
    mail: document.getElementById("mail").value,
    password: document.getElementById("password").value,
  };
  let response = await axios.post("http://localhost:3000/signup", signupObj);
  console.log("Data->", response);
  if (response.status == 201) {
    let resDiv = document.getElementById("result");
    resDiv.innerText = "User Created Successfully";
    alert("User Created Successfully!!!");
    location.replace("login2.html");
  } else {
    let resDiv = document.getElementById("result");
    resDiv.innerText = response.data.remark;
  }
}
