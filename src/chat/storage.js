const getChatList = () => {
  const raw = localStorage.getItem('CHAT_LIST');
  const list = raw ? JSON.parse(raw) : [];
  list.forEach(item => {
    item.createdAt = new Date(item.createdAt).toISOString();
    item.updatedAt = new Date(item.updatedAt).toISOString();
  })
  list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  return list;
};

const saveChatList = (list) => {
  localStorage.setItem('CHAT_LIST', JSON.stringify(list));
};

const addChatToList = (item) => {
  const list = getChatList();
  list.push(item);
  saveChatList(list);
};

const removeChatFromList = (id) => {
  let list = getChatList();
  list = list.filter(item => item.id !== id);
  saveChatList(list);
};

const updateChatInList = (updated) => {
  const list = getChatList();
  list.find(item => {
    if (item.id === updated.id) {
      Object.assign(item, updated); // 直接更新
    }
  });
  list.sort((a, b) => b.updatedAt - a.updatedAt);
  saveChatList(list);
};

const getChat = (id) => {
  const raw = localStorage.getItem(`CHAT_${id}`);
  const result = raw ? JSON.parse(raw) : {};
  return result;
};

const saveChat = (item) => {
  const { id, messages } = item;
  localStorage.setItem(`CHAT_${id}`, JSON.stringify(messages));
};

const removeChat = (id) => {
  localStorage.removeItem(`CHAT_${id}`);
};


const clearListAndChat = () => {
  localStorage.clear();
}

export { getChatList, saveChatList, addChatToList, removeChatFromList, updateChatInList, getChat, saveChat, removeChat, clearListAndChat };