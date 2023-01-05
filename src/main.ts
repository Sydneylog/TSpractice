// let hello: string = "hello world"

// hello = "hello"

// console.log(hello)










//리턴 값이 없으면 undefined가 반환됨 js에서는
//but ts에서는 void가 반환 됨

const hello: () => void = function () {
  console.log("hello world")
}
const h: void = hello()

//or

// const hello = function (): void {
//   console.log("hello world")
// }
// const h: void = hello()


//타입 추론(inference) 모든것에 타입을 지정할 필요 없음

let num = 12
//오류발생
//num = "hello type"

//타입추론은 판단 근거가 피룡함
// 1) 초기화된 변수
// 2) 기본값이 설정된 매개 변수
// 3) 변환 값이 있는 함수

//초기화된 변수 'num'
let num2 = 13

//기본값이 지정된 매개변수 "b" +변환 값이 확실한 함수 add
//함수의 리턴값도 타입 지정 할 필요가 없음 a와 b가 모두 number인 것을 인지하고 있음
function add(a: number, b = 2) {
  return a + b
}

//타입 단언 (Assertion) 중요(잚소 사용하면 any와 같이 되어버릴 수 있음)

//단언 키워드 - as
//Non-null 단언 연산자 - ! null이 아님을 단언

//1)
//선택자는 선택요소를 못찾으면 null반환하게 됨
//body는 반드시 존재하나 타입스크립트는 body를 인지 못하게 될 수 있음
//개발자는 body태그가 있음을 확신 함 => as 사용
//const el = document.querySelector("body") as HTMLBodyElement
//el.textContent = "hello" or

const el = document.querySelector("body")
el!.textContent = "hello"

//2) toFixed메소드는 숫자에만 사용 할 수 있으므로 오류 발생
// function getNumber(x: number | null | undefined) {
//   return Number((x as number).toFixed(2))
// } or

function getNumber(x: number | null | undefined) {
  return Number(x!.toFixed(2))
}
getNumber(3.1459)
getNumber(null) //타입 에러 발생 null toFixed가 불가하기 때문 => 잘못된 단언

//3) 2)와같이 선언하게 되면 숫자일 때만 가능하고 나머지의 경우 오류 발생하게됨 3)과 같이 조건문으로 각각의 경우에 맞는 조건을 설정 해주면 해결 됨
//여기서는 null이나 undefined 타입이 할당되어 있지 않기에 !는 사용 할 수 없음
function getValue (x: string | Number, isNumber: boolean) {
  if(isNumber) {
    return Number((x as number).toFixed(2))
  }
  return (x as string).toUpperCase()
}
getValue("hello", false) //HELLO
getValue(3.14159, true) //3.14

// 1과 2의 경우 
//1)의 경우는 실제 존재하지 않을 수 있음
//하기와 같이 타입 가드를 사용하여 조건문으로 문제를 해결함
const elem = document.querySelector(".title")
 if (elem) {
  elem.textContent = "hello"
 } 

//2)의 경우
function getNumber2(x: number | null | undefined) {
  if (x) {
    return Number(x.toFixed(2))
  } // null과 undefined의 경우는 애초에 거짓된 값이므로 
}
getNumber(3.1459)
getNumber(null)

//할당 단언 (Assertion)
//q본래 할당 하기전에 변수를 사용하면 오류 발생, !사용하여 할당 했다고 단언함
let num3!: number
//num3 = 123
console.log(num3)

num3 = 123

//타입 가드
//logText 의 Element는 HTML태그 말함
//null data에서 textContent를 읽으려 하므로 에러가 발생
function logText(el: Element) {
  console.log(el.textContent)
}

//에러 발생을 없애기 위해 as 사용하였으나 결론은 잘못된 단언이 되어 버림
//const h1El = document.querySelector('h1') as HTMLHeadingElement
//logText(h1El)


//if문으로 타입가드를 실현
//null의 경우 HTMLheadingELement의 인스턴스가 아니게 되어 타입가드 실현 됨
const h1El = document.querySelector('h1')
if (h1El instanceof HTMLHeadingElement){
  logText(h1El)
}

//타입가드
function add2(val: string | number | boolean) {
  let res = "result => "
  if (typeof val === "number") {
    res += val.toFixed(2)
  } 
  if (typeof val === "string") {
    res += val.toUpperCase()
  }
  console.log(res)
}
add2(3.141592)
add2("hello")


//인터페이스 (interface)

//선택적 속성 - ?
//읽기전용 속성 - readonly

interface User {
  name: string
  readonly age: number
  isValid?: boolean  //?의 경우 있어도 되고 없어도 됨
}
const heropy : User = {
  name: "Heropy",
  age: 85,
  isValid: true
}
heropy.isValid = false
//heropy.age = 123 // readonly이므로 재할당 불가해짐
//User와 달리 isValid에 해당하는 프로퍼티 없음 => 오류 발생
//?의 경우 없어 됨 오류 없음
const neo : User = {
  name: "neo",
  age: 25,
  
}

//interface에선느
// 함수 타입 - 호출 시그니처(Call Signature)
//인덱스 가능 타입 - 인덱스 시그니처 (Index Signiture)
//확장(상속)

//인터페이스 함수타입(Call Signature)
//interface의 경우 이름이 있으므로 재활용이 가능

interface GetName {
  (message: string): string //함수
}
interface User2 {
  name: string
  age: number
  getName: GetName
}

const heropy2: User2 = {
  name: "heropy",
  age: 85,
  getName (message: string) {
    console.log(message)
    //여기서 return 의 this는 일반 함수이므로 호출 될 때 정의 됨
    return this.name
  }
}
//getName의 this 정의 됨 그러므로 this는 heropy라는 객체데이터가 됨
heropy2.getName("Hello")


