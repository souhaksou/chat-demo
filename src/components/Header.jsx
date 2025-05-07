import { useSelector, useDispatch } from "react-redux";
import { setShow } from "../features/sidebar/sidebarSlice";

const Header = () => {
  const { isShow } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <>
      <header className="flex jc:space-between ai:center p:16 bg:#F7F9FC abs top:0 left:0 w:full">
        <div>
          <button
            className="fg:#8F9FBC f:32 px:16 h:36 inline-block"
            onClick={() => dispatch(setShow(!isShow))}
          >
            <i className={`bi bi-text-indent-${isShow ? "right" : "left"}`}></i>
          </button>
        </div>
        <div>
          <div className="fg:#0C2556 f:32 px:16 h:36 inline-block">
            <i className="bi bi-person-circle"></i>
          </div>
        </div>
      </header>
      <div className="h:68"></div>
    </>
  );
};

export default Header;
