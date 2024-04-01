import { Outlet } from "@/.umi/exports";
import { useAppSelector } from "@/hooks/useAppStore";
import NavigationBar from "@/components/navigationBar/NavigationBar";
import { Layout } from "antd";

function Home() {
  return (
    <Layout>
      <NavigationBar />
      <Outlet />
    </Layout>
  );
}

export default Home;
