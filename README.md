# vue-trello

---

&#127793; [인프런] 트렐로 개발로 배우는 Vuejs, Vuex, Vue-Router 프론트엔드 실전 기술 - 김정환

### 요구사항분석

1. 로그인

- 로그인폼 / 로그아웃
- 구글 로그인 기능
- 로그인 실패시 실패 메시지
- 로그인 성공시 메인페이지로

2. 메인페이지

- 보드 목록
- 보드 생성
  - title, 배경색깔, 팀?

3. 보드 페이지

- List Card
- 각 리스트마다 카드 추가
- 각 카드 클릭하면 상세보기 modal - 제목 수정, 설명, 댓글 추가가능
- List, 각 항목간 이동가능
- 사진등록가능
- 댓글, 좋아요 기능?
- 메뉴 : 보드삭제, 공유 가능

| 작업     | 생성 | 조회 | 수정 | 이동 | 삭제 |
| -------- | ---- | ---- | ---- | ---- | ---- |
| `보드`   | ㅇ   | ㅇ   | ㅇ   | x    | ㅇ   |
| `리스트` | ㅇ   | x    | ㅇ   | ㅇ   | ㅇ   |
| `카드`   | ㅇ   | ㅇ   | ㅇ   | ㅇ   | ㅇ   |

![플로우차트](https://github.com/yooooonk/TIL/blob/master/img/Trello.jpg)

- 프로젝트 생성 : npm cli 이용

```
$ vue init webpack-simple
```

### 강의내용

1. 라우터

- 라우터 만들기, 뷰 라우터, 라우터 인스턴스, 라우터 뷰

2. API 호출

- XMLHttpRequest 객체 이용
- axios 이용
- axios wrapper -- axios 직접이용시 라이브러리 의존도가 높은 코드가 됨

3. 인증

- 네비게이션 가드로 로그인 토큰 확인해서 페이지 이동
- Login.vue에서 로그인 api호출, localStorage에 토큰저장, 요청헤더에 토큰저장

4. 보드 목록 만들기

- api 호출해 보드 목록 조회 후 화면에 뿌린다
- 보드 추가 > modal창 생성, 보드추가 api

5. Vuex

- state, mutation, action
- 보드리스트 vuex로 바꾸기
- 인증로직 vuex로 바꾸기 -- login, logout 기능을 여러 player가 담당함(api,router,컴포넌트)
- vuex 모듈화

6. 기본 플로우 구현

- 보드 생성하면 바로 보드화면으로 이동
- 보드 조회 화면
- 카드 생성
- 카드 상세조회

## 새로 알게 된 것

- router와 SPA의 의미, 뷰 라우터
- Vue.use
- 인증
  - 토큰은 로컬 스토리지에 저장
  - hader에 값 추가
  - 인증전후 페이지 이동처리
- Vuex
  - state, mutations, action
- 스프레드 연산자, 객체로 바로 element 갖고오기
