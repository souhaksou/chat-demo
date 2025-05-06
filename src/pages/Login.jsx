import { useState } from "react";
import robot from "../images/android.svg";

const Login = () => {
  const [isPassword, setIsPassword] = useState(true);

  const login = async () => {
    console.log("login");
  };

  return (
    <section className="bg:#E2ECFC h:full min-h:100vh p:32 flex jc:center ai:center">
      <div className="w:full max-w:screen-4xs">
        <div className="flex jc:center ai:center mb:64 block@xs">
          <img
            src={robot}
            alt="robot"
            className="w:64 inline-block {w:96;ml:16;}@xs"
          />
          <div className="w:32"></div>
          <p className="f:32 font:extrabold italic fg:#0C2556 {f:48;t:right;mr:16;}@xs">
            Let's chat！
          </p>
        </div>
        <div className="rel mb:32">
          <div className="abs top:0 left:0 w:48 h:full flex jc:center ai:center">
            <i className="bi bi-emoji-smile-fill f:24 fg:#B5AA6C"></i>
          </div>
          <input
            type="text"
            placeholder="帳號"
            className="block w:full p:16|48 r:8 f:20 fg:#0C2556 fg:gray-40::placeholder b:1|solid|#0C2556 transition:400ms {bg:rgba(255,255,255,0.5);}:focus"
          />
        </div>
        <div className="rel mb:64">
          <div className="abs top:0 left:0 w:48 h:full flex jc:center ai:center">
            <i className="bi bi-lock-fill f:24 fg:#6C77B5"></i>
          </div>
          <input
            type={isPassword ? "password" : "text"}
            placeholder="密碼"
            className="block w:full p:16|48 r:8 f:20 fg:#0C2556 fg:gray-40::placeholder b:1|solid|#0C2556 transition:400ms {bg:rgba(255,255,255,0.5);}:focus"
          />
          <button
            onClick={() => setIsPassword((prev) => !prev)}
            className="inline-block p:16 abs top:50% right:0 translateY(-50%) f:20 fg:fgcolor"
          >
            <i
              className={isPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}
            ></i>
          </button>
        </div>
        <button
          onClick={login}
          className="mb:32 block w:full h:60 r:8 fg:#E2ECFC bg:#0C2556 b:1|solid|#0C2556 transition:400ms {fg:#0C2556;bg:#E2ECFC;}:hover"
        >
          登入
        </button>
        <button className="block w:full h:60 r:8 fg:#0C2556 bg:#E2ECFC b:1|solid|#0C2556 transition:400ms {fg:#E2ECFC;bg:#0C2556;}:hover">
          註冊
        </button>
      </div>
    </section>
  );
};

export default Login;
