# my-trollo

---

## 개발 순서

1. 라우터 - 기본 화면 플로우 구현
   - 기본컴포넌트 만들기(Home,Navigationbar, NotFound, Login)
2. vuex 생성
3. 로그인
   - 로그인
     - 토큰 생성, 토큰 확인, 저장 -- api
     - header에 인증정보 셋팅
     - 에러메시지 출력
     - 화면 이동
   - 로그아웃
     - token 정보 삭제
4. 보드
   - List component

5. 카드

## 플로우

## 문제와 해결

- 로그인할 때, 401 error 발생시 라우터 path 중복문제
  > NavigationDuplicated: Avoided redundant navigation to current location: "/".
  > => catch로 없애버림..

- 새로고침하면 local storage에 token이 있는데 로그인 상태가 유지안됨
- AddBoard component에 팔레트 crated에서 팔레트 색깔 입히는데 this.$el이 undefined
  - created는 돔이 생성되기 전? this도 없을 타이밍... -> mounted에서 실행하니까 잘되었다
- Board를 fetch할 때 저장된 bgColor대로 화면에 노출하고 싶다
  - list가 렌더링된 후인 updated 훅에서 처리
```javascript
const onUnauthorized = () => {
  router.push("/login").catch(() => {});
};
```
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
