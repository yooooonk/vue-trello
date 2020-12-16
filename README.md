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
- 카드 상세조회 : 보드화면에서 중첩라우팅해서 모달창 띄우기!, 카드 상세 api 호출
- 카드 수정 -- put메서드, blur시 api 호출
- 카드 이동 - draggula 라이브러리 사용, 단순 구현 후 리팩토링
- 색상 변경 : navbar컴포넌트에서----watch-----상태값 변경은 board 컴포넌트에서
- 보드 셋팅 side bar

7. 추가 기능 구현

- 보드 수정 : 색상변경, 제목 수정
-

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
- 카드 추가할 때 커서 포커스 - mounted
- computed 속성 잘 쓰기
- 폼의 외부를 클릭했을 때 이벤트(AddCard.vue의 setupClickOutside()참고)
- 중첩라우팅

  - 라우터설정

    ```javascript
      { path: '/b/:bid', component: Board, beforeEnter : requireAuth,
              children:[{path:'c/:cid', component:Card, beforeEnter : requireAuth}]
    ```

  - 상위 - 보드컴포넌트
    ```javascript
    <template>
      <div>
          <div class="board-wrapper">
              <div class="board">
                  <div class="board-header">
                      <span class="board-title">{{board.title}} </span>
                  </div>
                  <div class="list-section-wrapper">
                      <div class="list-section">
                          <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
                              <List :data="list" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <router-view></router-view>
      </div>
    </template>
    ```
  - 하위 - card item 컴포넌트
    ```javascript
    <template>
        <div class="card-item">
            <router-link :to="`/b/${boardId}/c/${data.id}`">
                <div>{{data.title}} </div>
                <div class="card-item-meta">&equiv;</div>
            </router-link>
        </div>
    </template>
    ```

- 카드이동 : 드래그앤드롭 -- dragula lib
- 리팩토링 : 함수로 만들기, 라이브러리로 만들기
- $nextTick

## 더 해볼 것

- css 파일 분리
- data modeling
- list pos값 넣기
- 트렐로 카드 이동할 떄 pos값 규칙이 있나? 로직 어떻게 구현해야해?
- 삭제 모달 confirm말고 다른걸로 할 수 있을까?
- 무엇을 상태로 놓을 것인지, 컴포넌트간 데이터 전달관계
- datapicker 라이브러리 있나?
