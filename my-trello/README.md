# my-trollo

---

## 개발 순서

1. 라우터 - 기본 화면 플로우 구현
   [v] 기본컴포넌트 만들기(Home,Navigationbar, NotFound, Login)
2. vuex 생성
3. 로그인
   - 로그인
     [v] 토큰 생성, 토큰 확인, 저장 -- api
     [v] header에 인증정보 셋팅
     [v] 에러메시지 출력
     [v] 화면 이동
   - 로그아웃
     [v] token 정보 삭제
4. Home 화면
   [v] board목록 가져오기
   [v] 보드추가 -> 바로 생성한 보드로 화면이동
   [v] CSS 적용
5. Board 화면
  [v] 리스트 목록 fetch - 각 리스트에 data props로
  - List 컴포넌트, Card 컴포넌트 생성
  - List 추가
  - Board settings 컴포넌트
    - 색깔변경
6. List 컴포넌트
  [v] props로 받은데이터로 Card 생성
  - List 제목수정
  - card 추가 -- Add card 컴포넌트

7. Card 컴포넌트
  - Card title 수정
  - Card 삭제
  - Card 상세 modal

## 플로우

## 문제와 해결

- 로그인할 때, 401 error 발생시 라우터 path 중복문제
  > NavigationDuplicated: Avoided redundant navigation to current location: "/".
  > => catch로 없애버림..

- 새로고침하면 local storage에 token이 있는데 로그인 상태가 유지안됨
- AddBoard component에 팔레트 crated에서 팔레트 색깔 입히는데 this.$el이 undefined
  - created는 돔이 생성되기 전? this도 없을 타이밍... -> mounted에서 실행하니까 잘되었다
- Board를 fetch할 때 저장된 bgColor대로 화면에 노출하고 싶다
  - list가 렌더링된 후인 updated 훅에서 처리m
```javascript
const onUnauthorized = () => {
  router.push("/login").catch(() => {});
};
```
- title을 수정하려고 클릭했을 때, input focus 안됨 -- ref를 못찾음
  - input <-> title를 v-if로 노출함. 감춰진 element를 노출할 때, 리렌더링을 하기때문에 ref를 못찾음. 그래서 렌더링을 기다려줘야함-- nexttick()으로 해결
  - https://michaelnthiessen.com/set-focus-on-input-vue/
- session storage에 token이 있는데 새로고침하면 로그인화면이 나타남

## 더할것?

[v] css 파일 분리
- server만들어서 - 생성할 때 색깔선택 
- data modeling
- list pos값 넣기
- 트렐로 카드 이동할 떄 pos값 규칙이 있나? 로직 어떻게 구현해야해?
- 삭제 모달 confirm말고 다른걸로 할 수 있을까?
- 무엇을 상태로 놓을 것인지, 컴포넌트간 데이터 전달관계
- datapicker 라이브러리 있나?
- 소셜 인증 추가
- vuex 모듈화

---

**reference**

- https://dribbble.com/shots/8653870-Task-management-App/attachments/909308?mode=media
- https://dribbble.com/shots/7045855-Pottery-Web-Design/attachments/46138?mode=media
- https://dribbble.com/shots/7054034-Courses-Dashboard
