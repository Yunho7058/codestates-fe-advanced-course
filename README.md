# codestates-fe-advanced-course

## 배포 링크
https://yunho7058.github.io/

## 구현 이미지
* 게시물, 댓글 렌더링
<img src="./GIF/rendering.gif" />

* 게시물 페이지네이션 기능
<img src="./GIF/pagination.gif" />

* 게시물 검색 기능
<img src="./GIF/search.gif" />

* 반응형 웹
<img src="./GIF/responsive.gif" />

## 프로젝트 실행 방법
1. 해당 레파지토리 url 복사 후 터미널에 `git clone 복사한url`
2. client 파일 접근 (터미널 경로 확인) 명령어 `cd client` 
3. 터미널에 `npm install` 입력 (모든 패키지 다운로드)
4. 터미널에 `npm start` 입력 후 웹 이용

## 사용 스텍
<div>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">   
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <img src="https://img.shields.io/badge/Styled-components-DB7093?style=for-the-badge&logo=Styledcomponents&logoColor=white">
  <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/Css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
</div>



## 구현한 기능 목록
### Bare Minimum
* 게시물 리스트와 게시물 상세 페이지
  * ✅ 게시물 리스트는 게시판 형태로 구성합니다.
  * ✅ 각 게시물 상세 페이지에는 댓글 수가 표기되고 게시물 내용의 하단에 댓글이 나열됩니다.
  
 ### Additional features
 * 게시물 리스트 페이지네이션 기능 구현
 * 게시물 검색 기능 구현
 * 반응형 Web 구현(폰트,크기)
 

 
 ## 구현 방법 혹은 구현하면서 어려웠던 점
 * 초기 설정
    * 사용 스텍 정하기 : 많은 데이타를 관리하지 않기때문에 따로 상태라이브러리를 사용하지 않고 React-Hooks 사용   
    * 디렉토리 구조  : 리액트의 많은 컴포넌트를 재사용 및 유지보수를 하기위해 컴포넌트를 나눠관리하면 더욱더 효울적으로 관리할수있다. 공식문서에서 정해져있는 구조는 없다고 한다, 일반적인 방식은 있으나 개인이나 회사에 맞춰 구조를 짜면 될것같다. 아래는 내가 구성한 폴더와 컴포넌트 구조이다.
        > 📁 src 
        > > 📁 assets
        > > > 🖼 사용이미지
        > > > 
        > > 📁 components
        > > > 📄 Headers.js
        > > > 
        > > 📁 page
        > > > 📄 Post.js
        > > > 📄 PostList.js
        > > 
        > > 📁 util
        > > > 📄 Spinner.js
        > > 
        > > 📄 App.js
        > > 
        > > 📄 index.js
    * 동적 라우팅 : `<Route path="/:id" element={<Post />} />` 게시물 리스트에서 해당 게시물 클릭하여 해당아이디 url 접속, 게시물 접속 후 useParams 를 사용하여  해당 게시물 정보(JSON Placeholder API 요청) 불러오도록 작성하였습니다.
  
## Wireframe
https://www.figma.com/file/7fVTbytHbxCf4pt3TnF7FX/Untitled

피그마 툴을 사용해 간단한 Wireframe 작성

<img src="./GIF/wireframeImg.png" />

## 성능 최적화 개선 방법

## 추가 구현 방법
* 게시물 리스트 페이지네이션
* 게시물 검색 기능
* JSON Placeholder API 요청 후 데이터 로딩시 스피너 랜더링 기능
