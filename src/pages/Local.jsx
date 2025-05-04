import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Local = () => {
  const [listData, setListData] = useState(null);

  const { chatList } = useSelector((state) => state.chat);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const chatHistory = chatList.find((item) => item.id === params.id);
    if (chatHistory) {
      setListData(chatHistory);
    } else {
      navigate("/", { replace: true });
    }
  }, [chatList, navigate, params.id]);

  return (
    <div className="h:calc(100vh-68px) bg:#F7F9FC overflow-y:auto p:16">
      {listData ? (
        <div>{JSON.stringify(listData)}</div>
      ) : (
        <p className="my:32 t:center">無資料</p>
      )}
    </div>
  );
};

export default Local;
