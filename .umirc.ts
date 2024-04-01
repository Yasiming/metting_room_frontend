import { defineConfig } from "umi";
const { UMI_ENV = "" } = process.env;
console.log("UMI_ENV", UMI_ENV);

function OutputPathName(env: string) {
  if (env) {
    return `${env}-dist`;
  }
  return "dist";
}

export default defineConfig({
  history: {
    type: "hash",
  },
  routes: [
    {
      path: "/",
      component: "home/Home",
      routes: [
        {
          path: "",
          component: "settings/statistic/Statistic",
        },
        {
          path: "user-info",
          component: "settings/userInfo/UserInfo",
        },
        {
          path: "edit-password-a",
          component: "settings/editPassword/EditPassword",
        },
        {
          path: "user-manage",
          component: "settings/userManage/UserManage",
        },
        {
          path: "meeting-manage",
          component: "settings/meetingManage/MeetingManage",
        },
        {
          path: "meeting-list",
          component: "settings/meetingList/MeetingList",
        },
        {
          path: "booking-details",
          component: "settings/meetingList/BookingDetails",
        },
      ],
    },
    { path: "/login", component: "login/Login", layout: true },
    { path: "/register", component: "register/Register", layout: false },
    {
      path: "/edit-password",
      component: "editPassword/EditPassword",
      layout: false,
    },
    { path: "/*", component: "ErrorPage", layout: false },
  ],
  plugins: [
    "@umijs/plugins/dist/antd",
    "@umijs/plugins/dist/styled-components",
  ],
  antd: {},
  styledComponents: {},
  define: {
    "process.env": {
      UMI_ENV,
    },
  },
  esbuildMinifyIIFE: true,
  npmClient: "pnpm",
});
