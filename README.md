# Academy Front-End React Material Dashboard

React와 Material Dashboard 2를 기반으로 한 학원 관리 시스템 프론트엔드 애플리케이션입니다.

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [API 연동](#api-연동)
- [라이선스](#라이선스)

## 🎯 프로젝트 소개

Academy Front-End는 학원 관리를 위한 현대적인 웹 애플리케이션입니다. Material Design 2를 기반으로 한 아름답고 직관적인 UI를 제공하며, 시험 관리, 회원 관리, 게시판, 메뉴 관리 등의 기능을 포함합니다.

## ✨ 주요 기능

### 1. **대시보드**
- 시스템 전체 현황 모니터링
- 주요 지표 시각화

### 2. **시험 관리 (Exam)**
- 시험 목록 조회 및 관리
- 시험 응시 및 재응시 기능
- 시험 결과 확인
- 시험 문제 관리

### 3. **회원 관리 (Member)**
- 회원 정보 조회 및 관리
- 회원 등록 및 수정

### 4. **게시판 (Board)**
- 공지사항 및 일반 게시글 관리
- 페이지네이션 지원
- 게시글 상세 보기

### 5. **메뉴 관리 (Menu)**
- 계층적 메뉴 구조 관리
- 트리뷰와 테이블뷰 전환 기능
- 메뉴 아이콘 및 URL 관리
- 메뉴 사용 여부 설정
- 메뉴 깊이(depth) 관리

### 6. **인증**
- 로그인 / 로그아웃
- 회원가입
- 프로필 관리

## 🛠 기술 스택

### Core
- **React** 18.x - UI 라이브러리
- **React Router** 6.x - 라우팅
- **Material-UI (MUI)** 5.x - UI 컴포넌트 프레임워크

### State Management & Data Fetching
- **React Query** (@tanstack/react-query) - 서버 상태 관리
- **React Context API** - 전역 상태 관리

### HTTP Client
- **SuperAgent** - HTTP 요청 라이브러리

### Styling
- **Emotion** - CSS-in-JS
- **Material Dashboard 2 Theme** - 커스텀 테마

### Additional Libraries
- **@mui/x-tree-view** - 트리 구조 UI
- **@mui/icons-material** - Material 아이콘
- **React ChartJS 2** - 차트 시각화
- **ChromaJS** - 색상 변환

## 🚀 시작하기

### 필수 요구사항

- **Node.js** 14.x 이상
- **npm** 또는 **yarn**

### 설치

```bash
# 저장소 클론
git clone <repository-url>

# 프로젝트 디렉토리로 이동
cd acdemy-front-end-React-material-dashboard

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 서버 실행

```bash
npm start
# 또는
yarn start
```

브라우저에서 [http://www.unmong.com:3000](http://www.unmong.com:3000)으로 접속합니다.

### 빌드

```bash
npm run build
# 또는
yarn build
```

빌드된 파일은 `build/` 디렉토리에 생성됩니다.

## 📁 프로젝트 구조

```
acdemy-front-end-React-material-dashboard/
├── public/                      # 정적 파일
│   ├── index.html
│   ├── favicon.png
│   └── manifest.json
├── src/
│   ├── api/                     # API 통신 로직
│   │   ├── board/              # 게시판 API
│   │   ├── exam/               # 시험 API
│   │   ├── member/             # 회원 API
│   │   └── menu/               # 메뉴 API
│   ├── assets/                  # 이미지, 테마 등
│   │   ├── images/
│   │   ├── theme/              # 라이트 테마
│   │   └── theme-dark/         # 다크 테마
│   ├── components/              # 재사용 가능한 컴포넌트
│   │   ├── MDBox/
│   │   ├── MDButton/
│   │   ├── MDInput/
│   │   ├── MDTypography/
│   │   └── common/
│   ├── config/                  # 설정 파일
│   │   └── headersConfig.js
│   ├── constants/               # 상수 정의
│   │   └── index.js            # API 기본 URL 등
│   ├── context/                 # React Context
│   │   └── index.js
│   ├── examples/                # 레이아웃 컴포넌트
│   │   ├── Breadcrumbs/
│   │   ├── Cards/
│   │   ├── Footer/
│   │   ├── Navbars/
│   │   ├── Sidenav/            # 사이드바 네비게이션
│   │   └── Tables/
│   ├── layouts/                 # 페이지 레이아웃
│   │   ├── authentication/     # 인증 페이지
│   │   ├── board/              # 게시판 페이지
│   │   ├── dashboard/          # 대시보드
│   │   ├── exam/               # 시험 관리
│   │   ├── member/             # 회원 관리
│   │   ├── menu/               # 메뉴 관리
│   │   └── profile/            # 프로필
│   ├── stores/                  # 상태 관리
│   ├── utils/                   # 유틸리티 함수
│   │   ├── commonUtils.js
│   │   ├── request.js
│   │   └── storage.js
│   ├── App.js                   # 앱 진입점
│   ├── index.js                 # 렌더링 진입점
│   └── routes.js                # 라우트 정의
├── package.json
└── README.md
```

## 🔌 API 연동

### API 기본 설정

API 기본 URL은 `src/constants/index.js`에서 설정합니다:

```javascript
export const BASE_API = "http://localhost:8080/api";
```

### API 엔드포인트

#### 게시판 API
- `GET /api/board/getBoardList?curPage={page}` - 게시판 목록 조회

#### 시험 API
- `GET /api/exam/getExamList?curPage={page}&userId={userId}` - 시험 목록 조회
- `GET /api/exam/getExamView?examId={examId}` - 시험 상세 조회
- `POST /api/exam/getExamView` - 시험 응시 가능 여부 확인
- `GET /api/exam/getExamEdit?examId={examId}&userId={userId}` - 시험 결과 조회

#### 메뉴 API
- `GET /api/menu/getMenuTree` - 메뉴 트리 구조 조회

### API 응답 예시

#### 메뉴 트리 API 응답 구조
```json
{
  "menuTree": [
    {
      "isUse": "Y",
      "menuNo": 1,
      "menuUrl": "",
      "menuIcon": "icon-navigation",
      "children": [
        {
          "isUse": "Y",
          "menuNo": 2,
          "menuUrl": "",
          "menuIcon": "feather icon-home",
          "children": [],
          "menuTitle": "Dashboard",
          "menuDepth": 1,
          "menuId": "dashboard",
          "menuUpperId": 1
        }
      ],
      "menuTitle": "Dashboard",
      "menuDepth": 1,
      "menuId": "dashboard",
      "menuUpperId": 1
    }
  ]
}
```

## 🎨 주요 컴포넌트

### 메뉴 관리 컴포넌트

메뉴 관리 화면은 두 가지 뷰 모드를 제공합니다:

1. **트리뷰**: 계층적 구조를 시각적으로 표현
2. **테이블뷰**: 모든 메뉴를 플랫한 테이블 형태로 표시

```javascript
import Menu from "layouts/menu";

// 라우트 설정
{
  type: "collapse",
  name: "Menu",
  key: "menu",
  icon: <Icon fontSize="small">menu</Icon>,
  route: "/menu",
  component: <Menu />,
}
```

### 사이드바 네비게이션

중첩된 메뉴 구조를 지원하는 사이드바:

```javascript
// routes.js에서 중첩 메뉴 설정
{
  type: "collapse",
  name: "Parent Menu",
  key: "parent",
  icon: <Icon>folder</Icon>,
  route: "/parent",
  component: <Parent />,
  collapse: [
    {
      type: "collapse",
      name: "Child Menu",
      key: "child",
      route: "/child",
      component: <Child />,
    }
  ]
}
```

## 🌐 브라우저 지원

현재 다음 브라우저의 최신 2개 버전을 공식 지원합니다:

- Chrome
- Firefox
- Edge
- Safari
- Opera

## 📝 개발 가이드

### 새로운 페이지 추가하기

1. `src/layouts/` 디렉토리에 새 컴포넌트 생성
2. `src/api/` 디렉토리에 API 함수 작성
3. `src/routes.js`에 라우트 추가
4. 필요시 사이드바 메뉴 항목 추가

### 스타일링

Material Dashboard 2의 테마 시스템을 사용합니다:

```javascript
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

<MDBox
  bgColor="info"
  variant="gradient"
  borderRadius="lg"
  coloredShadow="info"
>
  <MDTypography variant="h6" color="white">
    Title
  </MDTypography>
</MDBox>
```
## Copyright

<a href="http://www.unmong.com"><img src="assets/img/UM_CI.png" alt="UM Systems" width="10%"></a>

**Copyright (c) 2021 <a href="http://www.unmong.com">운몽시스템즈(UM Systems)</a>. All rights reserved.**

이 소프트웨어는 운몽시스템즈(UM Systems)의 독점 소유이며, 저작권법에 의해 보호됩니다.
본 소프트웨어의 무단 복제, 배포, 수정, 재배포는 법적으로 금지되어 있습니다.

This software is the exclusive property of UM Systems and is protected by copyright law.
Unauthorized copying, distribution, modification, or redistribution of this software is prohibited by law.

## 📄 라이선스

MIT License

Copyright (c) 2023

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🙏 감사의 말

이 프로젝트는 다음의 오픈소스 프로젝트들을 기반으로 합니다:

- [Material Dashboard 2 React](https://www.creative-tim.com/product/material-dashboard-react) by Creative Tim
- [Material-UI (MUI)](https://mui.com/) - React UI 라이브러리
- [React ChartJS 2](http://reactchartjs.github.io/react-chartjs-2/) - 차트 라이브러리
- [ChromaJS](https://gka.github.io/chroma.js/) - 색상 변환 라이브러리
