# &#127752;my-trollo

![login](https://github.com/yooooonk/TIL/blob/master/img/mytrello_login.gif)
![logout](https://github.com/yooooonk/TIL/blob/master/img/mytrello_logout.gif)
![boardcreate](https://github.com/yooooonk/TIL/blob/master/img/mytrello_board%20CU.gif)
![list](https://github.com/yooooonk/TIL/blob/master/img/mytrello_list%20CRUD.gif)
![boardUD](https://github.com/yooooonk/TIL/blob/master/img/mytrello_boad%20UD.gif)
![card](https://github.com/yooooonk/TIL/blob/master/img/mytrello_card%20CRUD.gif)

##

---

## &#128036;개발 순서

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
   [v] List 컴포넌트, Card 컴포넌트 생성
   [v] List 추가 -- AddList 컴포넌트로 모듈화
6. Board menu
   [v] Board menu 컴포넌트 생성
   [v] 색깔변경
   [v] 보드삭제
   [v] board description
   [v] 메뉴 애니메이션
7. List 컴포넌트
   [v] props로 받은데이터로 Card 생성
   [v] List 제목수정
   [v] card 추가 -- Add card 컴포넌트
8. Card 컴포넌트
   [v] Card title 수정
   [v] Card 삭제
   [v] Card 상세 modal

## &#128036;새로 알게 된 것

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
      { path: '/b/:bid', component: Board, beforeEnter : 				requireAuth,
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
- \$nextTick

## &#128161; 문제와 해결

- 로그인할 때, 401 error 발생시 라우터 path 중복문제

  > NavigationDuplicated: Avoided redundant navigation to current location: "/".
  > => catch로 없애버림..

- 새로고침하면 local storage에 token이 있는데 로그인 상태가 유지안됨
- AddBoard component에 팔레트 crated에서 팔레트 색깔 입히는데 this.\$el이 undefined
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
- ㅠㅠㅠㅠㅠ 카드 상세화면 router children으로 안나옴..ㅠ왜지!?!!왜1! --- 바보야. 중첩라우터는 <router-view>!!
- 리스트 이동시 원래 색깔로 돌아옴
  ![updated](https://github.com/yooooonk/TIL/blob/master/img/trello_nn.gif)
  - 컴포넌트가 업데이트 되면서 리렌더링되기 때문 --> updated() 훅에서 테마를 다시바꿔줌
- board menu에 slide 효과를 주고싶다!!
  - vue의 <transition> 이용..순수 css로는 구현실패...

---

**&#128220;reference**

- https://dribbble.com/shots/8653870-Task-management-App/attachments/909308?mode=media
- https://dribbble.com/shots/7045855-Pottery-Web-Design/attachments/46138?mode=media
- https://dribbble.com/shots/7054034-Courses-Dashboard
