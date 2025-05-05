import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { chat } from "../chat";
import {
  getChatList,
  updateChatInList,
  getChat,
  saveChat,
} from "../chat/storage";
import { setChatList } from "../features/chat/chatSlice";
import "github-markdown-css/github-markdown.css";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-light.css";

const Local = () => {
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
    }
  };

  useEffect(() => {
    const codeBlocks = document.querySelectorAll(".markdown-body pre code");
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block);
    });
  }, [messages]);

  return (
    <div className="h:calc(100vh-68px) bg:white overflow-y:auto p:32">
      {currentChat && messages ? (
        <div className="w:full max-w:screen-xs mx:auto bg:white p:32">
          {messages.map((item, index) => (
            <div key={index}>
              {item.role === "user" ? (
                <div className="flex jc:end mb:48">
                  <p className="w:65% bg:#E2ECFC p:16 r:8">{item.content}</p>
                </div>
              ) : (
                <div className="mb:48">
                  <div className="markdown-body {h:1!;}_hr">{item.content}</div>
                </div>
              )}
            </div>
          ))}
          <div className="h:80"></div>
          <div className="w:full abs bottom:0 left:0">
            <div className="w:full max-w:screen-2xs mx:auto mb:32 rel">
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
        <p className="my:32 t:center">無資料</p>
      )}
    </div>
  );
};

export default Local;
