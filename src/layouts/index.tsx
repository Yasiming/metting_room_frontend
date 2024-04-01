import { Outlet } from "umi";
import styles from "./index.less";
import { Provider } from "react-redux";
import store, { persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";

export default function Layout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className={styles.navs}>
          <Outlet />
        </div>
      </PersistGate>
    </Provider>
  );
}
