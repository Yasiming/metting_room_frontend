// index.ts 文件

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
/* 持久化缓存 */
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";

// 缓存数据配置
const persistConfig = {
  key: "root", // LocalStorage中显示为persist:root: {};
  storage,
  blacklist: ["fuseIm"], // 写在这块的数据不会存在storage
};

const reducers = combineReducers({
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //关闭redux序列化检测
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 记得包裹
export const persistor = persistStore(store);
export default store;
