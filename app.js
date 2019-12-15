//DOM ELEMENTS
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

//generator
generateEl.addEventListener("click",()=>{
const length = +lengthEl.value;
const hasLower = lowercaseEl.checked;
const hasUpper = uppercaseEl.checked;
const hasNumber = numbersEl.checked;
const hasSymbol = symbolsEl.checked;
resultEl.textContent = "";
resultEl.textContent = generatePassword(hasLower,hasUpper,hasNumber,hasSymbol,length);

});
//copiwrighertet
clipboardEl.addEventListener("click",()=>{
  const textarea = document.createElement("textarea");
  const password = resultEl.textContent;
  if(!password){
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("password coppied")})




const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}
function generatePassword(lower,upper,number,symbol,length){
//1.Init pw var
//2.Filter unchecked
//3.Loop over length call generatror for eachtype
//4.return pasword
let generatedPassword = "";
const typesCount = lower + upper + number + symbol;
const typesArray = [{lower},{upper},{number},{symbol}].filter(item=>Object.values(item)[0]);
if(typesCount===0){
  return "";
}
for(let i = 0;i<length;i+=typesCount){
typesArray.forEach(type=>{
  const funcName = Object.keys(type)[0];
  generatedPassword +=randomFunc[funcName]();
})
}
return generatedPassword.slice(0,length)
}


function getRandomLower(){
  return String.fromCharCode(97+Math.floor(Math.random()*26))
}

function getRandomUpper(){
  return String.fromCharCode(65+Math.floor(Math.random()*26))
}

function getRandomNumber(){
  return Math.floor(Math.random()*10)
}
function getRandomSymbol(){
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)];
}