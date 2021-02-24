// Assignment Code
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var cases = {
nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
upper: characters.split(""),
lower: characters.toLowerCase().split(""),
special: "!@#$%&*".split("")
}
function getPasswordOptions() {
  var passwordOptions = {
    length: 0, 
    nums: false,
    upper: false,
    lower: false,
    special: false
  }
  //prompts the user to input a value, this will determine the length of the password
  passwordOptions.length = Number(prompt("How long would you like your password to be? Please input an integer between 8 and 128"));
  parseInt(passwordOptions.length);
  if (passwordOptions.length < 8 || passwordOptions.length > 128 || isNaN(passwordOptions.length)) {
    alert("Incorrect value; please use valid criteria");
    return; //stops the execution of getPasswordOptions function, user must hit the button again to proceed
  }
  passwordOptions.nums = confirm("Please confirm for numbers in your password")
  passwordOptions.upper = confirm("Please confirm for upper case letters in your password")
  passwordOptions.lower = confirm("Please confirm for loswer case letters in your password")
  passwordOptions.special = confirm("Please confirm for use of the following special characters in your password: !@#$%&* ")
  if (passwordOptions.nums === false && passwordOptions.upper === false && passwordOptions.lower === false && passwordOptions.special === false) {
    alert("Choose a value that is within the criteria");
    return;
  }
  return passwordOptions;
}
function generatePassword() {
  var options = getPasswordOptions();
  var password = "";
  var trueOptions = [];
  for (var key in options) { 
    if (options[key] === true) { //if options key type returns true, the value gets stored it in trueOptions array
      trueOptions.push(key);
    }
  }
  var usedOptions = []
  for (var i = 0; i < options.length; i++) {
    //as loop is going through each character, provide random true option letter/num/specialchar
    var randomTrueOption = trueOptions[Math.floor(Math.random()*trueOptions.length)]
    //if randomTrueOption is added in array, then move to another var from cases
    if (!usedOptions.includes(randomTrueOption)){
      usedOptions.push(randomTrueOption);
      const index = trueOptions.indexOf(randomTrueOption);
      if (index > -1) {
        trueOptions.splice(index, 1);
      }
      password = password + cases[randomTrueOption][Math.floor(Math.random()*cases[randomTrueOption].length)];
      if (trueOptions.length === 0) {
        trueOptions = usedOptions;
        usedOptions = []
      }
    }
  }
  return password
}
var generateBtn = document.querySelector("#generate");

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  
  passwordText.value = password;

}
generateBtn.addEventListener("click", writePassword); 
