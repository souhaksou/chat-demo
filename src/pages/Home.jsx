import { useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { chat } from "../chat";
import { getChatList, addChatToList, saveChat } from "../chat/storage";
import { setChatList } from "../features/chat/chatSlice";
import openAlertModal from "../modals/alertModal";
import { openLoadingModal, closeLoadingModal } from "../modals/loadingModal";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputRef = useRef();
  const newChat = async () => {
    try {
      const content = inputRef.current.value.trim();
      if (content.length === 0) {
        await openAlertModal("請輸入問題");
        return;
      }
      openLoadingModal("請稍等");
      const message = [{ role: "user", content }];
      const res = await chat(message);
      const { data, success } = res;
      if (success) {
        const id = uuidv4();
        const name = content;
        const messages = [...message, ...data];
        const createdAt = new Date();
        const updatedAt = createdAt;
        const listData = { id, name, createdAt, updatedAt };
        const chatData = { id, messages };
        addChatToList(listData);
        saveChat(chatData);
        const list = getChatList();
        dispatch(setChatList(list));
        closeLoadingModal();
        navigate(`/local/${id}`);
      } else {
        closeLoadingModal();
        await openAlertModal("錯誤");
      }
    } catch (error) {
      console.error(error);
      if (error.message === "QuotaExceeded") {
        openAlertModal("儲存空間不夠！");
      }
      return;
    }
  };

  return (
    <div className="min-h:calc(100vh-68px) bg:#F7F9FC p:16 flex flex:col jc:center ai:center">
      <h2 className="f:bold f:24">我可以為你做什麼？</h2>
      <div className="w:full max-w:screen-2xs my:32 rel">
        <textarea
          ref={inputRef}
          rows={3}
          className="resize:none block w:full p:16|48|16|16 r:8 line-height:1.5 bg:gray-5 b:1|solid|gray-20 {bg:rgba(255,255,255,0.5);}:focus"
        ></textarea>
        <button
          onClick={() => newChat()}
          className="abs top:50% right:16 translateY(-50%) f:24 inline-block transition:200ms ~easing:ease-in {fg:gray;}:hover"
        >
          <i className="bi bi-send-fill"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
