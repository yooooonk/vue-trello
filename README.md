# vue-trello
인프런 - [트렐로 개발로 배우는 Vuejs, Vuex, Vue-Router 프론트엔드 실전 기술(김정환)]를 보며 trello를 클론하고, 학습한 내용을 바탕으로 디자인을 바꾸고, 기능을 추가해 처음부터 다시 만들어보았다.
flowbox로 화면을 구성하고, css에 더 익숙해졌고, vue router와 vuex 개념을 익히고 사용했다.
drag and drop은 dragulla lib을 사용했다. 

- 기간 : 20.12.17 ~ 12.31(2주)

### Stack
- Front-end : vue.js, css
- Back-end : node.js
	- &#128587; 서버는 강의에서 사용한 것을 약간 수정했음
	- &#128640; [server respository](https://github.com/yooooonk/vue-trello-server/blob/main/README.md)
- ETC : git



&#127793; [인프런] 트렐로 개발로 배우는 Vuejs, Vuex, Vue-Router 프론트엔드 실전 기술 - 김정환
&#128587; 서버는 강의에서 사용한 것을 약간 수정했음
&#128640; [server respository](https://github.com/yooooonk/vue-trello-server/blob/main/README.md)

---

### &#127912; 강의 clone
![login](https://github.com/yooooonk/TIL/blob/master/img/trello_1.PNG)
![home](https://github.com/yooooonk/TIL/blob/master/img/trello_home.PNG)
![boardCreate](https://github.com/yooooonk/TIL/blob/master/img/trello_boardC.PNG)
![list](https://github.com/yooooonk/TIL/blob/master/img/trello_list.PNG)
![menu](https://github.com/yooooonk/TIL/blob/master/img/trello_menu.PNG)

# &#127752; my-trello

### Flow

![](https://images.velog.io/images/ouo_yoonk/post/d261abed-e155-4d44-8969-774922dddf6c/mytrello_login.gif)
로그인 화면. validation을 체크해 enter키를 노출시킴
![](https://images.velog.io/images/ouo_yoonk/post/a98de735-07dc-42ad-acf8-30fd70cee5e0/mytrello_logout.gif)
로그인 - 로그아웃시의 화면전환
![](https://images.velog.io/images/ouo_yoonk/post/e2ae2a1d-0af4-4356-bb12-f5b49be59e67/mytrello_board%20CU.gif)
메인화면에서 보드 생성. 
테마 색상과 제목을 입력하고, 보드를 생성.
생성 후 보드 화면으로 이동. 
보드 이름 수정가능.
![](https://images.velog.io/images/ouo_yoonk/post/c83f8d5a-1b43-49a3-9178-0b6bbf6195cf/mytrello_boad%20UD.gif)
보드 메뉴
보드에 대한 설명추가와 테마색상변경, 보드 삭제를 할 수 있다
![](https://images.velog.io/images/ouo_yoonk/post/7b6ab37b-e938-4100-880e-8a2bd9884042/mytrello_list%20CRUD.gif)
트렐로에 카드를 추가, 수정, 삭제할 수 있고, 이동해 위치를 변경할 수 있다.
![](https://images.velog.io/images/ouo_yoonk/post/2eab66e4-b75c-4561-92e6-a6f83862dbba/mytrello_card%20CRUD.gif)
카드에 항목을 추가,수정, 삭제, 이동할 수 있고 항목간 이동도 가능하다.
설명을 추가하면 버튼 노출


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
``` javascript
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
- AddBoard component에 팔레트 crated에서 팔레트 색깔 입히는데 this.$el이 undefined
  - created는 돔이 생성되기 전? this도 없을 타이밍... -> mounted에서 실행하니까 잘되었다
- Board를 fetch할 때 저장된 bgColor대로 화면에 노출하고 싶다
  - list가 렌더링된 후인 updated 훅에서 처리
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
