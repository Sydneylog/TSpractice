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
  (message: string): string //함수 => 소괄호 (호출 시그니처)
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


//interface 인덱스 가능 타입 - 인덱스 시그니처 (Index Signatrue)

//배열
interface Fruits {
  [item: number]: string //대괄호 인덱스 시그니처 배열데이터의 타입을 지정 배열의 index를 item number로 지정하고 각각의 값은 string으로 지정
}
const fruits: Fruits = ['apple', 'banana', "cherry"]
console.log(fruits[1])

//객체
interface User3 {
  [key: string]: unknown
  name: string
  age: number
}
const heropy3: User3 = {
  name:"heropy",
  age: 85
}
//user3의 대괄호의 인덱스 시그니처로 인하여 하기의 값들이 heropy3에 할당 될 수 있음 인덱스 시그니처가 없으면 heropy3는 user3에서 지정한 name과 age만 가질 수 있게 됨
heropy3["isValid"] = true
heropy3["emails"] = ['thescon@gmail.com', 'test@gmail.com']
console.log(heropy3)


interface Payload {
  [key: string]: unknown //어떤값이 올지 모름 
}
function logValues (payload : Payload) {
  for (const key in payload) { //for in은 키값 다룰 수 있음
    console.log(payload[key]) //[key]로 인덱싱
  }
}

interface User4 {
  [key: string]: unknown
  name: string
  age: number
  isValid: boolean
}
const heropy4: User4 = {
  name: "heropy",
  age:85,
  isValid: true
}
//heropy4는 User4와 문제가 없으나 logVaules의 매개변수로 사용될 경우 Payload의 인덱싱 가능한 부분이 없으므로 에러가 발생하게 된다. 따라서 User4에 인덱싱 가능한 부분을 추가하여 해결 한다.
logValues(heropy4)

// interface의 확장 js의 상속

interface UserA {
  name: string
  age: number
}
interface UserB extends UserA {
  isValid:boolean
}
const heropy5: UserA = {
  name: "Heropy",
  age:85,
  //isValid: true //isValid 없음
}
const neoo: UserB = {
  name: "neo",
  age: 102,
  isValid: true
}

interface FullName {
  firstName: string
  lastName: string
}
interface FullName {
  middleName: string
  lastName: string //boolean //후속에선 선행에서 지정된 타입이 이어져야 함 인터페이스는 동일한 이름으로 작성 가능 중복되는 부분에는 주의가 필요
}
const fullName: FullName = {
  firstName: "tomas",
  middleName: "sea",
  lastName: "connel"
}

//타입 별칭(Alias) 타입의 별도 이름(별명)

type TypeA = string
type TypeB = string |number | boolean
type User7 = {
  name: string
  age: number
  isValid: boolean
} | [string, number, boolean] //객체로 지정하거나 배열(tuple type)으로 지정할수 있는 User7이라는 새로운 타입을 만들어 냄

const userC: User7 = {
  name: "neo",
  age:85,
  isValid:true
}

const userD: User7 = ['evan', 36, false]  //User7의 tuple type

function someFunc(param: TypeB): TypeA {
  switch (typeof param) { //switch구문 typeof param에 따라 각각의 식을 return
    case "string":
      return param.toUpperCase()
    case "number":
      return param.toFixed(2) //return 값은 TypeA때문에 결국은 string임 그러므로 에러발생 X
    default:
      return "boolean!" //true //boolean 자체를 string에 할당 할 수 없기에 오류가 발생한다.
  }
}

//타입별칭은 interface를 대신해 사용 할 수도 있음

type TypeUser = { //interface와 다르게 할당 연산자가 추가로 필요
  name: string
  age: number
  isValid: boolean
}
interface InterfaceUser{
  name: string
  age: number
  isValid: boolean
}

//기능적인 차이는 없고 굳이 권장을 하자면 interface방식을 권장
//type의 용도는 사용범위가 interface보다 넓음 특별히 문제되는 건 아니므로 취향에 맞게 사용

const camel: TypeUser = {
  name: "camel",
  age: 85,
  isValid: true
}

// 함수 - 명시적 this

interface Cat {
  name: string
  age: number
}
const cat: Cat = {
  name: "고양이",
  age: 3
}
function hellohello(this: Cat, message: string) { //일반함수이므로 this는 호출되는 위치에서 정의 됨
//this가 암시적으로 any로 할당되는 것을 피하기 위해 this가 interface Cat에 해당하는 타입임을 명확히 함 => 매개변수로 보이지만 매개변수가 아니라 타입을 지정해주는 ts만의 문법이라고 봐야 함 (명시적 this)
  console.log(`hello ${this.name}, ${message}`)
}
//call 메소드의 경우 함수나 메소드 뒤에서 바로 사용하여 어떤 대상에서 실행될지 정할 수 있음 (실행대상, 실행 내용)
//cat의 객체 데이터에서 조회하여 name을 리턴 함
//this에는 암시적으로 any가 할당 되는데 이 경우 ts에서 주의해야하므로 this의 타입을 정의해 주어야 함
hellohello.call(cat, "you are cool") 



//함수 오버로딩

//1) 타입이 2개의 경우 두개의 함수를 만들어야 함 => 오버로딩으로 해결
function addA (a: string, b: string) {
  return a + b
}
function addB (a: number, b: number) {
  return a + b
}
addA ("hello", "world")
addB (1, 2)
//addA ("hello", 2)
//addB ("hello", 2)

//2) js와 달리 타입이 명확하여 오버로드 과정을 거쳐야 함
function addC (a: string, b: string): string //타입선언
function addC (a: number, b: number): number //타입선언
function addC (a: any, b: any) { //함수 구현
  return a + b 
}
addC ("hello", "world")
addC (1, 2)
//addC ("hello", 2) //첫째 타입이 string이면 두번재 인수 타입도 동일해야 오버로드 가능
//addC (2, "hello")

//클래스
//w접근제어자 access modifiers
// public 어디서나 자유롭게 접근 가능, 클래스 바디에서 생략 가능 - js환경과 같음
// protected 나(userAA)와 파생된 후손 클래스(userBB, userCC) 내에서만 접근 가능 클래스 안쪽에서만 사용하기 위해 - 
// private 나의 클래스에서만 접근
// protected는 매소드에도 사용 할 수 있다.
//매개변수에서 접근제어자는 public도 생략 할 수 없다.



class UserAA {
  constructor (
    public first: string = '', 
    public last: string = '', 
    public age: number = 0
    ){ //this.이하 들 즉, class의 바디에 해당하는 부분들은 앞에서 정의 되어야 함
    this.first = first
    this.last = last
    this.age = age
  }
  getAge() {
    return `${this.first} ${this.last} is ${this.age}`
  }
}
class UserBB extends UserAA {
  getAge() {
    return `${this.first} ${this.last} is ${this.age}` //private 접근 불가
  }
}

class UserCC extends UserBB {
  getAge() {
    return `${this.first} ${this.last} is ${this.age}` //private 접근 불가
  }
}

const neoA = new UserAA ('neo', 'anderson', 102) //protected의 경우 접근 불가
console.log(neoA.first)
console.log(neoA.last)
console.log(neoA.age) 


//제네릭 문법
//함수 클래스 인터페이스에서 사용 



//1) 함수
interface Obj {
  x: number
}
type Arr = [number, number] //tuple type

//함수 제네릭 구현을 위해 오버로드 부분을 지움 
// function toArray(a: string, b: string): string[]
// function toArray(a: Number, b: number): number[]
// function toArray(a: boolean, b: boolean): boolean[]
// function toArray(a: Obj, b: Obj): Obj[]
// function toArray(a: Arr, b: Arr): Arr[]

//이하 꺽쇄 안의 T는 일종의 매개 변수로 타입 정보를 저장하고 있다
function toArray<T>(a: T, b: T) {
  return [a, b]
}

console.log(
  //toArray<string>('neo', 123), //오버로드와 같이 제네릭 문법에서도 첫번째 인자로 인하여 이후의 인자들의 타입도 정해지게 됨 (string, number) 불가
  toArray('neo', '123'), // 명식적으로 <string>을 써 놓아도 좋지만 ts가 추론하게끔 첫번째 인자에 해당 타입을 지정하면 이후는 알아서 계산함 but ts가 추론하게끔 하는게 ts 본질에 맞음
  toArray(1, 2),
  toArray(true, false),
  toArray({x: 1}, {y: 2}), // 두번째 인자의 변수를 y로 바꿀 시 첫번째 인자는 속성을 x만 가지고 있음 따라서 toArray의 T는 x에대한 타입만 가지고 있는데 두번째 인자에서 y속성을 취하게 되면 동일한 타입인지 확인 할 수 없음 (타입추론)
  toArray([1, 2], [3, 4])
)


