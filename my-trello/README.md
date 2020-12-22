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

```javascript
const onUnauthorized = () => {
  router.push("/login").catch(() => {});
};
```

## 더할것?

[v] css 파일 분리

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
