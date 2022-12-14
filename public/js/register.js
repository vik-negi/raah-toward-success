var $loginMsg = document.querySelector(".loginMsg"),
  $login = document.querySelector(".login"),
  $signupMsg = document.querySelector(".signupMsg"),
  $signup = document.querySelector(".signup"),
  $frontbox = document.querySelector(".frontbox");

document.querySelector("#switch1").addEventListener("click", function () {
  $loginMsg.classList.toggle("visibility");
  $frontbox.classList.add("moving");
  $signupMsg.classList.toggle("visibility");

  $signup.classList.toggle("hide");
  $login.classList.toggle("hide");
});

document.querySelector("#switch2").addEventListener("click", function () {
  $loginMsg.classList.toggle("visibility");
  $frontbox.classList.remove("moving");
  $signupMsg.classList.toggle("visibility");

  $signup.classList.toggle("hide");
  $login.classList.toggle("hide");
});

// setTimeout(function () {
//   document.querySelector("#switch1").click();
// }, 1000);

// setTimeout(function () {
//   document.querySelector("#switch2").click();
// }, 3000);

async function axiosCall(method, url, data = {}) {
  return await axios({
    method: method,
    url: url,
    data,
    validateStatus: function (status) {
      return status >= 200 && status <= 400;
    },
  });
}

const userSignUp = async () => {
  console.log("userSignUp");
  var data = {};
  var myInput = document.querySelectorAll(".signup-form-input");
  // data[input.name] = input.value;
  data["name"] = myInput[0].value;
  data["email"] = myInput[1].value;
  data["username"] = myInput[2].value;
  data["rollNo"] = myInput[3].value;
  data["password"] = myInput[4].value;

  console.log(data);
  var error = document.querySelector(".error-f");
  if (
    data["name"] &&
    data["email"] &&
    data["password"] &&
    data["username"] &&
    data["rollNo"]
  ) {
    try {
      const res = await axiosCall("post", "/account/signup", data);
      // axios({
      //   method: "post",
      //   url: "/account/signup",

      //   data,
      //   validateStatus: function (status) {
      //     return status >= 200 && status <= 400;
      //   },
      // });
      console.log(res.data);

      if (res.data.status === "success") {
        error.innerHTML = "User created successfully";
      } else {
        error.innerHTML = res.data.message;
      }
    } catch (err) {
      error.innerHTML = `${err}`.split(":")[1];
    }
  } else {
    error.innerHTML = "Please fill all the fields";
    return;
  }
  setTimeout(function () {
    error.innerHTML = "";
  }, 3000);
};

const userSignIn = async () => {
  console.log("userSignIn");
  var data = {};
  var myInput = document.querySelectorAll(".signin-form-input");
  data["email"] = myInput[0].value;
  data["password"] = myInput[1].value;

  console.log(data);
  var error = document.querySelector(".error-f");
  if (data["email"] && data["password"]) {
    try {
      // const res = await axiosCall("post", "/account/signin", data);
      const res = await axios({
        method: "post",
        url: "/account/signin",
        data,
        validateStatus: function (status) {
          return status >= 200 && status <= 401;
        },
      });
      console.log("pppppppppppppppppppppppppppp");
      console.log(res.data.data);
      if (typeof Storage !== "undefined") {
        // Code for localStorage/sessionStorage.
        window.localStorage.setItem("user", JSON.stringify(res.data.data));
        console.log("aaaaaaaaaaaaaaa");
        console.log(window.localStorage.getItem("user"));
      } else {
        // Sorry! No Web Storage support..
      }

      if (res.data.status === "success") {
        error.innerHTML = res.data.message;
      } else {
        error.innerHTML = res.data.message;
      }
      // return await axios.get("/home");
      // this.props.history.push("/signup");
    } catch (err) {
      // this.setState({ errors: err.response.data });
      // console.log(`err is ${err.toString().spilt(":")[1]}`);
      error.innerHTML = `${err}`.split(":")[1];
    }
  } else {
    // this.setState({ errors: { message: "Please fill all the fields" } });

    error.innerHTML = "Please fill all the fields";

    return;
  }
  setTimeout(function () {
    error.innerHTML = "";
  }, 3000);
};

const userSignOut = async () => {
  window.localStorage.clear();
  window.location.reload(true);
  window.location.replace("/");
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
};

document.querySelector("#signup-btn").addEventListener("click", userSignUp);
document.querySelector("#signin-btn").addEventListener("click", userSignIn);
document.querySelector("#signout-btn").addEventListener("click", userSignOut);
