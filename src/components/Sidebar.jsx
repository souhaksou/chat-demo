import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { setPhoneShow } from "../features/sidebar/sidebarSlice";
import exampleJSON from "../chat/example.json";
import {
  getChatList,
  addChatToList,
  updateChatInList,
  removeChatFromList,
  removeChat,
  getChat,
  saveChat,
} from "../chat/storage";
import { setChatList } from "../features/chat/chatSlice";
import openAlertModal from "../modals/alertModal";
import openEditModal from "../modals/editModal";
import openConfirmModal from "../modals/confirmModal";
import openFilesModal from "../modals/filesModal";

const Sidebar = () => {
  const { phoneShow } = useSelector((state) => state.sidebar);

  const dispatch = useDispatch();
  useEffect(() => {
    const list = getChatList();
    dispatch(setChatList(list));
  }, [dispatch]);
  const chatList = useSelector((state) => state.chat.chatList);

  const location = useLocation();
  const currentPath = location.pathname;
  const checkPath = (id) => {
    const path = `/local/${id}`;
    return currentPath === path;
  };
  useEffect(() => {
    dispatch(setPhoneShow(false));
  }, [dispatch, location.pathname]); // 只要 pathname 改變就會觸發

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

  const processFiles = async () => {
    const result = await openFilesModal({ msg: "匯入 / 匯出", item: chatList });
    if (result.key) {
      switch (result.key) {
        case "import":
          importFile();
          break;
        case "export":
          exportFile(result.data);
          break;
        case "example":
          exampleFile();
          break;
        default:
          break;
      }
    }
  };

  const importFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.style.display = "none";
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) {
        document.body.removeChild(input);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result);
          convertToChat(json);
        } catch {
          openAlertModal("⚠️ 這不是有效的 JSON 檔案");
          return;
        }
        document.body.removeChild(input);
      };
      reader.onerror = () => {
        openAlertModal("❌ 檔案讀取錯誤");
        document.body.removeChild(input);
      };
      reader.readAsText(file);
    });
    document.body.appendChild(input);
    input.click();
  };

  const exampleFile = () => {
    convertToChat(exampleJSON);
  };

  const convertToChat = (JSONFile) => {
    const baseTime = Date.now();
    for (let index = JSONFile.length - 1; index >= 0; index--) {
      const chat = JSONFile[index];
      const id = uuidv4();
      const createdAt = new Date(baseTime + index);
      const updatedAt = createdAt;
      const listData = { id, name: chat.name, createdAt, updatedAt };
      const chatData = { id, messages: chat.messages };
      addChatToList(listData);
      saveChat(chatData);
    }
    const list = getChatList();
    dispatch(setChatList(list));
  };

  const exportFile = (chatIds) => {
    const keyList = chatList.filter((list) => chatIds.includes(list.id));
    const chats = keyList.map((key) => ({ ...key, messages: getChat(key.id) }));
    const fileName = `chat_${dayjs().format("YYYYMMDDAhhmm")}`;
    downloadFile(chats, fileName);
  };

  const downloadFile = (dataArray, fileName) => {
    const jsonStr = JSON.stringify(dataArray, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <nav className="w:full h:100vh p:16">
      <h3 className="flex jc:space-between ai:center p:8">
        <button
          className="fg:#8F9FBC f:32 h:36 inline-block hidden@xs"
          onClick={() => dispatch(setPhoneShow(!phoneShow))}
        >
          <i
            className={`bi bi-text-indent-${phoneShow ? "right" : "left"}`}
          ></i>
        </button>
        <div className="f:20 fg:white f:bold user-select:none">
          <i className="bi bi-android hidden inline@xs"></i>
          <span className="mx:16@xs">Chat AI</span>
        </div>
        <button
          onClick={() => processFiles()}
          className="inline-block p:4 f:20 fg:gray-20"
        >
          <i className="bi bi-database-fill-gear"></i>
        </button>
      </h3>
      <div className="h:32"></div>
      <Link
        to="/"
        className="block p:12|16 r:8 t:left bg:#F7F9FC transition:200ms ~easing:ease-in {bg:white;fg:gray;}:hover"
      >
        <i className="bi bi-plus-circle"></i>
        <span className="ml:16">New Chat</span>
      </Link>
      <div className="h:32"></div>
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
