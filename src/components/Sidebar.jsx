import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  getChatList,
  updateChatInList,
  removeChatFromList,
  removeChat,
} from "../chat/storage";
import { setChatList } from "../features/chat/chatSlice";
import openEditModal from "../modals/editModal";
import openConfirmModal from "../modals/confirmModal";

const Sidebar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const list = getChatList();
    dispatch(setChatList(list));
  }, [dispatch]);
  const { chatList } = useSelector((state) => state.chat);

  const location = useLocation();
  const currentPath = location.pathname;
  const checkPath = (id) => {
    const path = `/local/${id}`;
    return currentPath === path;
  };

  const editOneChat = async (item, event) => {
    event.stopPropagation();
    event.preventDefault();
    const result = await openEditModal({ msg: "編輯名稱", item });
    if (result) {
      updateChatInList(result);
      const list = getChatList();
      dispatch(setChatList(list));
    }
  };
  const deleteOneChat = async (item, event) => {
    event.stopPropagation();
    event.preventDefault();
    const result = await openConfirmModal("請確認是否刪除");
    if (result) {
      const { id } = item;
      removeChatFromList(id);
      removeChat(id);
      const list = getChatList();
      dispatch(setChatList(list));
    }
  };

  return (
    <nav className="w:full h:100vh bg:#0C2556 p:16">
      <h3 className="f:20 fg:white f:bold p:8|16 mb:24">
        <i className="bi bi-android"></i>
        <span className="ml:16">Chat AI</span>
      </h3>
      <Link
        to="/"
        className="block p:16 r:8 mb:32 t:left bg:#F7F9FC transition:200ms ~easing:ease-in {bg:white;fg:gray;}:hover"
      >
        <i className="bi bi-plus-circle"></i>
        <span className="ml:16">New Chat</span>
      </Link>
      {chatList.map((item) => (
        <Link
          to={`/local/${item.id}`}
          key={item.id}
          className={`${
            checkPath(item.id) ? "fg:white bg:#1F3663" : "fg:#8192B0"
          } block p:8|40|8|16 r:8 white-space:nowrap text-overflow:ellipsis overflow-x:hidden rel {block!;}:hover>div`}
        >
          <span> {item.name} </span>
          <div className="hidden abs top:50% right:0 translateY(-50%) flex ai:center">
            <button
              className="p:4 inline-block fg:gray-30"
              onClick={(event) => {
                editOneChat(item, event);
              }}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button
              className="p:4 inline-block fg:red"
              onClick={(event) => {
                deleteOneChat(item, event);
              }}
            >
              <i className="bi bi-x-square-fill"></i>
            </button>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
