// const BASE_URL = "https://open.er-api.com/v6/latest"
const BASE_URL=  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn= document.querySelector(".btn");
const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOpt = document.createElement("option");
        newOpt.innerText=currCode;
        newOpt.value=currCode;
        if(select.name=="From" && currCode=="USD"){
            newOpt.selected="selected"
        }
        if(select.name=="To" && currCode=="INR"){
            newOpt.selected="selected"
        }
        select.append(newOpt);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
   // console.log(countryList[currCode]);
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png` ;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}

btn.addEventListener("click",async (evt)=>{
//console.log(evt);
   evt.preventDefault();
   let amount= document.querySelector(".amount input");
   let amtval= amount.value;
   console.log("amount:", amount);
   console.log("amtval:", amtval);
   if(amtval==="" || amtval<1){
    amtval=1;
   }
//console.log(fromCurr.value);
//console.log(toCurr.value);

const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
//console.log(URL);
let response= await fetch(URL);
//console.log(response);
let data= await response.json();
//console.log(data);

let rate= data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
//console.log(rate);
//console.log("amtval:",amtval);
let finalAmount = rate*amtval ;
//console.log(finalAmount);

msg.innerText= `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});