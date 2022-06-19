const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// capitalise the first element of the field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required fields using "for...of"
function checkRequired(inputArr) {
  for (const input of inputArr) {
    input.value.trim() === ""
      ? showError(input, `${getFieldName(input)} is required`)
      : showSuccess(input);
  }
}

// Check required fields using forEach()
// function checkRequired(inputArr) {
//   inputArr.forEach((input) => {
//     if (input.value.trim() === "") {
//       showError(input, "Username is empty");
//     } else {
//       showSuccess(input);
//     }
//   });
// }

// check email
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  re.test(input.value.trim())
    ? showSuccess(input)
    : showError(input, "Email is not valid");
}

// check if password match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "both passwords do not match");
  }
}

// check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be at most ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
