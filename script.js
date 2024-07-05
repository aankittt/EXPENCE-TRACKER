const balance=document.getElementById("Balance");

const money_plus=document.getElementById("money_plus");
const money_minus=document.getElementById("money_minus");

const list=document.getElementById("list");
const form=document.getElementById("form");

const text=document.getElementById("text");
const amount=document.getElementById("amount");




let transactions=[];

function addtransaction(e){
    e.preventDefault();
    if(text.value.trim()==="" || amount.value.trim()==="")
        alert("please enter the text and value");
    else
    {
        const transaction={
            id:generateid(),
            text:text.value,
            amount:+amount.value,
        };

        transactions.push(transaction);
        addtransactiondom(transaction);
        updatevalues();
        text.value="";
        amount.value="";

    }
}
function generateid(){
    return Math.floor(Math.random()*1000000);
}


function addtransactiondom(transaction)
{
    const sign=transaction.amount<0 ? "-" : "+";
    const item=document.createElement("li");
    
    item.classList.add(
        transaction.amount<0? "minus" : "plus"
    )
    item.innerHTML=`
    ${transaction.text} <span> ${sign} ${Math.abs(transaction.amount)}</span>
    <button  class ="delete-btn" onclick="removetransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

function removetransaction(id)
{
    transactions=transactions.filter(transaction=>transaction.id!==id);
    init();
}
function updatevalues(){ 
    const amounts=transactions.map(transaction => transaction.amount);

    const total=amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);

    const income=amounts.filter(item=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);

    const expence=(amounts.filter(item=>item<0).reduce((acc,item)=>(acc+=item),0)*-1).toFixed(2);

    balance.innerText=`$${total}`;
    money_plus.innerText=`$${income}`;
    money_minus.innerText=`$${expence}`;
}

addtransactiondom(transactions);

function init(){
    list.innerHTML="";
    transactions.forEach(addtransactiondom);
    updatevalues();
}

init()

form.addEventListener("submit",addtransaction);

