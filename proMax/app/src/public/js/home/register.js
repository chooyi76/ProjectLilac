"use strict";



const id = document.querySelector("#id"),
  name = document.querySelector("#name"),
  psword = document.querySelector("#psword"),
  confirmPsword = document.querySelector("#confirm-psword"),
  email = document.querySelector("#email"),
  registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function CheckEmail(str) {
  var reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  if (!reg_email.test(str)) {
    return false;
  } else {
    return true;
  }
}

function register() {
  if (!id.value) return alert("아이디를 입력해주십시오.");
  if (!name.value) return alert("이름을 입력하세요!");

  if (!email.value) {
    alert("이메일을 입력하세요!");

    email.focus();

    return;
  } else {
    if (!CheckEmail(email.value)) {
      alert("이메일 형식이 잘못되었습니다");

      email.focus();

      return;
    }
  }

  if (psword.value !== confirmPsword.value){
    return alert("비밀번호가 일치하지 않습니다.");
  }

  
  const req = {
    id: id.value,
    name: name.value,
    psword: psword.value,
    email: email.value
  };

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        //alert("OK");
        location.href = "/login";
      } else {
        if (res.err) return alert(res.err);
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error("회원가입 중 에러 발생");
    });
}
