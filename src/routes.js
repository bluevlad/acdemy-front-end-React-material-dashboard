/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Member from "layouts/member";
import Exam from "layouts/exam";
import Menu from "layouts/menu";
import Profile from "layouts/profile";
// Board Components
import Board from "layouts/board";
import BoardAll from "layouts/board/boardAll";
import BoardManagement from "layouts/board/boardManagement";
import BoardNotAnswer from "layouts/board/boardNotAnswer";
import BoardViewManagement from "layouts/board/boardViewManagement";
// Admin Components
import AdminCode from "layouts/admin/code";
import AdminAuth from "layouts/admin/auth";
import AdminMenu from "layouts/admin/menu";
import AdminBanner from "layouts/admin/banner";
import UserMenu from "layouts/menu"; // Alias existing Menu layout as UserMenu
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "게시판 통합 관리",
    key: "board-integrated-management",
    icon: <Icon fontSize="small">dashboard</Icon>,
    collapse: [
      {
        name: "게시판",
        key: "board-list",
        route: "/board",
        component: <Board />,
      },
      {
        name: "전체 게시물 조회",
        key: "board-all",
        route: "/board/all",
        component: <BoardAll />,
      },
      {
        name: "게시판 관리",
        key: "board-management",
        route: "/board/management",
        component: <BoardManagement />,
      },
      {
        name: "미응답 게시물 관리",
        key: "board-not-answer",
        route: "/board/not-answer",
        component: <BoardNotAnswer />,
      },
      {
        name: "게시판 뷰 관리",
        key: "board-view-management",
        route: "/board/view-management",
        component: <BoardViewManagement />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Member",
    key: "Member",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/member",
    component: <Member />,
  },
  {
    type: "collapse",
    name: "Exam",
    key: "Exam",
    icon: <Icon fontSize="small">quiz</Icon>,
    route: "/exam",
    component: <Exam />,
  },
  {
    type: "collapse",
    name: "Menu",
    key: "menu",
    icon: <Icon fontSize="small">menu</Icon>,
    route: "/menu",
    component: <Menu />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "운영자관리",
    key: "admin-management",
    icon: <Icon fontSize="small">admin_panel_settings</Icon>,
    collapse: [
      {
        name: "코드관리",
        key: "code-management",
        route: "/admin/code",
        component: <AdminCode />,
      },
      {
        name: "관리자 메뉴관리",
        key: "admin-menu-management",
        route: "/admin/admin-menu",
        component: <AdminMenu />,
      },
      {
        name: "권한관리",
        key: "auth-management",
        route: "/admin/auth",
        component: <AdminAuth />,
      },
      {
        name: "사용자 메뉴관리",
        key: "user-menu-management",
        route: "/admin/user-menu",
        component: <UserMenu />,
      },
      {
        name: "배너관리",
        key: "banner-management",
        route: "/admin/banner",
        component: <AdminBanner />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
