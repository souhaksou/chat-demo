import { Outlet } from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const MainLayout = () => {
  const { isShow } = useSelector((state) => state.sidebar);

  return (
    <section className="bg:white w:full overflow-x:hidden">
      <div className="h:full min-h:100vh flex">
        <div
          className={`${
            isShow ? "" : "translateX(-100%)"
          } bg:#0C2556 transition:400ms ~easing:ease-in w:full max-w:240 h:100vh abs top:0 left:0`}
        >
          <OverlayScrollbarsComponent defer>
            <Sidebar />
          </OverlayScrollbarsComponent>
        </div>
        <div
          className={`${
            isShow ? "max-w:240" : "max-w:0"
          } transition:400ms ~easing:ease-in w:full h:100vh`}
        ></div>
        <div
          className={`${
            isShow ? "max-w:calc(100vw-240px)" : "max-w:100vw"
          } transition:400ms ~easing:ease-in w:full rel`}
        >
          <Header />
          <OverlayScrollbarsComponent defer>
            <Outlet />
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </section>
  );
};

export default MainLayout;
