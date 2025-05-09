import { Outlet } from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const MainLayout = () => {
  const pcShow = useSelector((state) => state.sidebar.pcShow);
  const phoneShow = useSelector((state) => state.sidebar.phoneShow);

  return (
    <section className="bg:white w:full overflow-x:hidden">
      <div className="h:full min-h:100vh flex">
        {/* 手機平板 sidebar */}
        <div
          className={`${
            phoneShow ? "" : "translateX(-100%)"
          } bg:#0C2556 transition:400ms ~easing:ease-in w:full max-w:240 h:100vh abs top:0 left:0 z:5 block hidden@xs`}
        >
          <OverlayScrollbarsComponent defer>
            <Sidebar />
          </OverlayScrollbarsComponent>
        </div>
        {/* 電腦  sidebar*/}
        <div
          className={`${
            pcShow ? "" : "translateX(-100%)"
          } bg:#0C2556 transition:400ms ~easing:ease-in w:full max-w:240 h:100vh abs top:0 left:0 z:5 hidden block@xs`}
        >
          <OverlayScrollbarsComponent defer>
            <Sidebar />
          </OverlayScrollbarsComponent>
        </div>
        <div
          className={`${
            pcShow ? "max-w:240" : "max-w:0"
          } transition:400ms ~easing:ease-in w:full h:100vh hidden block@xs`}
        ></div>
        <div
          className={`${
            pcShow ? "max-w:calc(100vw-240px)" : "max-w:100vw"
          } transition:400ms ~easing:ease-in w:full rel max-w:100vw!@<xs`}
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
