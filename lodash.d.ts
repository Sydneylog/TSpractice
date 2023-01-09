
declare module 'lodash' { //패키지 이름과 파일이름 일치 할 경우 한번에 연결 가능
  //import를 통해 lodash라는 모듈을 가져오는데 이 때 타입을 선언하겠다 .d.ts
  interface Lodash {
    camelCase: (str: string) => string
    snakeCase: (str: string) => string 
    kebabCase: (str: string) => string 

  }
  const _: Lodash
  export default _
}