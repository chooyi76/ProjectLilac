// crypto 는 기본적으로 express 설치시 같이 설치되는 의존성중 하나이다.
// 비밀번호 암호화를 위해서 이를 불러오자.
const crypto = require("crypto");
// 위에서 설명했듯 암호화를 위해 salt를 임의로 생성해준다.
// 마지막 +""; 는 숫자를 문자열로 만들기 위해 적은것.
const salt = () => Math.round(new Date().valueOf() * Math.random()) + "";
// getCrypto 라는 함수는 password 와 위에서 만든 salt 를 인자로 받는 함수이다.
// 둘을 조합해 hash 함수로 암호화 한다.
const getCrypto = (_salt, password) =>
  crypto
    .createHash("sha512")
    .update(password + _salt)
    .digest("hex");

class AddUser {
  // AddUser 는 회원가입시 들어오는 데이터를 클래스화 한 것이다.
  constructor(data) {
    this.salt = salt(); // 위에서 만든 함수로 salt 를 생성한다.
    this.userid = data.userid;
    this.password = getCrypto(this.salt, data.password); // 위에서 만든 함수로 비밀번호를 암호화 한다.
    this.name = data.name;
    this.num = data.num;
    this.birth = data.birth;
    this.email = data.email;
  }
}

// 이제 이 js 파일을 다른 js 에서 불러올 때는
// data 를 받아 여기서의 addUser 클래스를 사용해
// 객체를 생성한다.
module.exports = (data) => new AddUser(data);
