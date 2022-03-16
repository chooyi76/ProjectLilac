"use strict";



// const Web3 = require('https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js');
// const Contract = require('web3-eth-contract');

const name = document.querySelector("#name"),
  vname = document.querySelector("#vname"),
  adr = document.querySelector("#adr"),
  meta = document.querySelector("#meta"),
  vmeta = document.querySelector("#vmeta"),
  message = document.querySelector("#message"),
  willBtn = document.querySelector("#button"),
  notice = document.querySelector("#announce"),
  stBtn = document.querySelector("#sT"),
  rtBtn = document.querySelector("#rT"),
  upBtn = document.querySelector('#update'),
  mtaddr= document.querySelector('#ownermeta'),
  dbBtn = document.querySelector('#rtDB');

willBtn.addEventListener("click", willup);
stBtn.addEventListener("click",sendToCont);
rtBtn.addEventListener("click",rtFromCont);
upBtn.addEventListener("click",ntest);
dbBtn.addEventListener("click",rtdb());

function willup() {
  if (!name.value) return alert("이름을 입력하세요!");
  if (!vname.value) return alert("상속자 이름을 입력하세요!");
  if (!message.value) return alert("내용을 입력해주세요.");
  if (!meta.value) return alert("상속자 메타 마스크 주소가 필요해요");
  if (meta.value.length < 41 || meta.value.length > 43)
    return alert("메타마스크 주소는 42자리입니다!");

  if (!vmeta.value) return alert("상속할 금액(eth)을 입력해주세요");
  if (!adr.value) return alert("주소를 입력해주세요");

  const req = {
    name: name.value,
    vname: vname.value,
    message: message.value,
    ownermeta: mtaddr.value,
    meta: meta.value,
    vmeta: vmeta.value,
    adr: adr.value
  };

  fetch("/willupdate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      //alert("ttttt");
      if (res.success) {
        location.href = "/loginpass";
        //alert(res.success);
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error("오류 발생!");
    });
};
//SmartContract
var willContract;
$( document ).ready(function() {
	rtBtn.setAttribute("disabled","");
  willBtn.setAttribute("disabled","");
  console.log( "ready!" );
  
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(window.ethereum);
  } else {
      // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"));
  }
  //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  /* Get Node Info */
  web3.eth.getNodeInfo(function(error, result){
    if(error){
      console.log( "error" ,error);
    }
    else{
      console.log( "result",result );
      $('#NodeInfo').val(result);
    }
  });
  //var web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
  //web3 = new Web3(web3.currentProvider);
  //function startApp() {0xe68eE0371c3a414Fde3fAC38d44bf5b0Da2Ce1E8
    var contractAddress = "0x7f4f556DBb08a0745A601F82fF968e6cd609e7Fb";
    willContract = new web3.eth.Contract([
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_writer",
            "type": "address"
          }
        ],
        "name": "retrieve",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          },
          {
            "internalType": "uint32",
            "name": "",
            "type": "uint32"
          },
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "_msg",
            "type": "bytes32"
          },
          {
            "internalType": "uint32",
            "name": "_amt",
            "type": "uint32"
          },
          {
            "internalType": "address",
            "name": "_to_addr",
            "type": "address"
          }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }
    ]
, contractAddress);
    getaccount0();
  });
async function getaccount0() {
  const accounts = await web3.eth.getAccounts();
 mtaddr.value=accounts[0];
}
async function sendToCont(){
  // var testR = await willContract.methods.retrieve().call();
  // console.log(testR)
  //var toCont= [13,3,'안녕하세요',2110011,1489113000,"0x0eaeAaFd5dEEaFa7d74dc33FAF9a15E8Eb1f82A2"];
  if (!name.value) return alert("이름을 입력하세요!");
  if (!vname.value) return alert("상속자 이름을 입력하세요!");
  if (!message.value) return alert("내용을 입력해주세요.");
  if (!meta.value) return alert("상속자 메타 마스크 주소가 필요해요");
  if (meta.value.length < 41 || meta.value.length > 43)
    return alert("메타마스크 주소는 42자리입니다!");

  if (!vmeta.value) return alert("상속할 금액(eth)을 입력해주세요");
  if (!adr.value) return alert("주소를 입력해주세요");
  try {
    //Grab all the accounts from metamask
    notice.textContent="블록체인에 저장중 입니다. 잠시 기다려 주세요"
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]); 
    //this.setState({ message: "Waiting on transaction success..." });
    
    //Send transaction to enter method with desired account
    await willContract.methods.store(ethers.utils.id(message.value), Number(vmeta.value), meta.value).send(
      {
      from: accounts[0],
    value:2,
    gasLimit:80000
    });
    
    notice.style.color = "red";
    canSave();
    rtBtn.disabled=false;
    willBtn.disabled=false;

    //this.setState({ message: "You have been entered!" });
  } catch (err) {
    console.log(err);
  }
  //await willContract.methods.store().send()
};

async function rtFromCont(){
  try {
    //Grab all the accounts from metamask
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]); 
    //this.setState({ message: "Waiting on transaction success..." });

    //Send transaction to enter method with desired account
    var rtValue = await willContract.methods.retrieve(accounts[0]).call({
      from: accounts[0]
    });
    let _msg = rtValue[0];
    let _cost = rtValue[1];
    let _addr = rtValue[2];
    var rtlog=[_msg,_cost,_addr];
    console.log(rtlog);
    //this.setState({ message: "You have been entered!" });
  } catch (e) {
    console.log(e);
  }
};
function canSave(){
  notice.style.color = "blue";
  notice.textContent ="블록체인에 성공적으로 저장되었습니다."
}
function ntest() {
  console.log(ethers.utils.id(message.value));
}
function rtdb(addr) {

  
}