import { useSelector, useDispatch } from "react-redux";
import { setPcShow, setPhoneShow } from "../features/sidebar/sidebarSlice";

const Header = () => {
  const { pcShow, phoneShow } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <>
      <header className="flex jc:space-between ai:center p:16 bg:#F7F9FC abs top:0 left:0 w:full">
        <div>
          <button
            className="fg:#8F9FBC f:32 px:16 h:36 hidden inline-block@xs"
            onClick={() => dispatch(setPcShow(!pcShow))}
          >
            <i className={`bi bi-text-indent-${pcShow ? "right" : "left"}`}></i>
          </button>
          <button
            className="fg:#8F9FBC f:32 px:16 h:36 inline-block hidden@xs"
            onClick={() => dispatch(setPhoneShow(!phoneShow))}
          >
            <i
              className={`bi bi-text-indent-${phoneShow ? "right" : "left"}`}
            ></i>
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
