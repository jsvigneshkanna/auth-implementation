const loginBtnEle = document.getElementById("login_btn");
const usernameEle = document.getElementById("username");
const passwordEle = document.getElementById("password");
const loginFormEle = document.getElementById("login_form");

loginFormEle.addEventListener("submit", async () => {
  console.log("gaga");
  try {
    fetch("http://localhost:3001/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: usernameEle.value,
        password: passwordEle.value,
      }),
    });
  } catch (error) {
    console.log("error ", error);
  }
});
