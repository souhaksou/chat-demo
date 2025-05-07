import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import openAlertModal from "../modals/alertModal";
import { openLoadingModal, closeLoadingModal } from "../modals/loadingModal";
import { chat } from "../chat";
import {
  getChatList,
  updateChatInList,
  getChat,
  saveChat,
} from "../chat/storage";
import { setChatList } from "../features/chat/chatSlice";
import MarkdownView from "react-showdown";
import hljs from "highlight.js";

const Local = () => {
  const { isShow } = useSelector((state) => state.sidebar);

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);

  const dispatch = useDispatch();
  const { chatList } = useSelector((state) => state.chat);
  const params = useParams();
  useEffect(() => {
    const chatHistory = chatList.find((item) => item.id === params.id);
    if (chatHistory) {
      setCurrentChat(chatHistory);
      const { id } = chatHistory;
      setMessages(getChat(id));
    } else {
      setCurrentChat(null);
      setMessages(null);
    }
  }, [chatList, params.id]);

  const inputRef = useRef();
  const updateChat = async () => {
    const content = inputRef.current.value.trim();
    if (content.length === 0) {
      await openAlertModal("請輸入問題");
      return;
    }
    openLoadingModal("請稍等");
    const message = [...messages, { role: "user", content }];
    const res = await chat(message);
    const { data, success } = res;
    if (success) {
      const updatedAt = new Date();
      const listData = { ...currentChat, updatedAt };
      const { id } = listData;
      const chatData = { id, messages: [...message, ...data] };
      updateChatInList(listData);
      saveChat(chatData);
      const list = getChatList();
      dispatch(setChatList(list));
      inputRef.current.value = "";
      closeLoadingModal();
    } else {
      closeLoadingModal();
      await openAlertModal("錯誤");
    }
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    const codeBlocks = document.querySelectorAll(".markdown-body pre code");
    codeBlocks.forEach((block) => {
      if (!block.dataset.highlighted) {
        hljs.highlightElement(block);
        const pre = block.parentElement;
        if (pre && !pre.querySelector(".copy-btn-anchor")) {
          const uuid = uuidv4();
          block.dataset.copyId = uuid;
          const anchor = document.createElement("button");
          anchor.classList.add(
            "copy-btn-anchor",
            "f:14",
            "fg:white",
            "bg:gray-70",
            "p:4|8",
            "r:4",
            "abs",
            "top:0",
            "right:0"
          );
          anchor.innerText = "copy";
          anchor.onclick = (event) => handleCopy(uuid, event);
          pre.style.position = "relative";
          pre.appendChild(anchor);
        }
      }
    });
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  const handleCopy = (uuid, event) => {
    const anchor = event.currentTarget;
    const target = document.querySelector(`[data-copy-id="${uuid}"]`);
    if (target) {
      navigator.clipboard.writeText(target.textContent || "").then(() => {
        anchor.innerText = "copied!";
        setTimeout(() => (anchor.innerText = "copy"), 1500);
      });
    }
  };

  return (
    <>
      <div className="h:calc(100vh-68px) bg:white p:32">
        {currentChat && messages ? (
          <div className="w:full max-w:screen-xs mx:auto">
            {messages.map((item, index) => (
              <div key={index}>
                {item.role === "user" ? (
                  <div className="flex jc:end mb:48">
                    <p className="w:65% bg:#E2ECFC p:16 r:8">{item.content}</p>
                  </div>
                ) : (
                  <div className="mb:48">
                    <div className="markdown-body">
                      <MarkdownView
                        markdown={item.content}
                        options={{ tables: true, emoji: true }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="h:80"></div>
            <div ref={bottomRef}></div>
          </div>
        ) : (
          <p className="my:32 t:center">無資料</p>
        )}
      </div>
      {currentChat && messages ? (
        <div className="w:full fixed bottom:0 right:0 flex pointer-events:none">
          <div
            className={`${
              isShow ? "max-w:240" : "max-w:0"
            } transition:400ms ~easing:ease-in w:full`}
          ></div>
          <div
            className={`${
              isShow ? "max-w:calc(100vw-240px)" : "max-w:100vw"
            } transition:400ms ~easing:ease-in w:full pointer-events:auto flex jc:center ai:center p:32`}
          >
            <div className="w:full max-w:screen-xs rel">
              <textarea
                ref={inputRef}
                rows={1}
                className="resize:none block w:full p:16|48|16|16 r:8 line-height:1.5 bg:gray-5 b:1|solid|gray-20"
              ></textarea>
              <button
                onClick={updateChat}
                className="abs top:50% right:16 translateY(-50%) f:20 inline-block transition:200ms ~easing:ease-in {fg:gray;}:hover"
              >
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Local;
