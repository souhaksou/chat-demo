import { useEffect } from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000); // 3 秒後跳轉
    return () => clearTimeout(timeout); // 清除定時器，避免記憶體洩漏
  }, [navigate]);

  return (
    <section className="bg:#E2ECFC h:full min-h:100vh p:32 flex flex:col jc:center ai:center user-select:none">
      <p className="f:96 ls:2.0 f:bold fg:#0C2556 mb:64">404</p>
      <p className="f:32 fg:gray"> 3 秒後將自動返回首頁...</p>
    </section>
  );
};

export default NotFound;
