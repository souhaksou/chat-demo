const getChatList = () => {
  try {
    const raw = localStorage.getItem('CHAT_LIST');
    const list = raw ? JSON.parse(raw) : [];
    list.forEach(item => {
      item.createdAt = new Date(item.createdAt).toISOString();
      item.updatedAt = new Date(item.updatedAt).toISOString();
    })
    list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    return list;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const saveChatList = (list) => {
  try {
    localStorage.setItem('CHAT_LIST', JSON.stringify(list));
  } catch (error) {
    console.error(error);
    if (error.name === 'QuotaExceededError') {
      throw new Error('QuotaExceeded'); // 明確地拋出錯誤
    }
  }
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
  try {
    const raw = localStorage.getItem(`CHAT_${id}`);
    const result = raw ? JSON.parse(raw) : [];
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const saveChat = (item) => {
  try {
    const { id, messages } = item;
    localStorage.setItem(`CHAT_${id}`, JSON.stringify(messages));
  } catch (error) {
    console.error(error);
    if (error.name === 'QuotaExceededError') {
      throw new Error('QuotaExceeded'); // 明確地拋出錯誤
    }
  }
};

const removeChat = (id) => {
  localStorage.removeItem(`CHAT_${id}`);
};


const clearListAndChat = () => {
  localStorage.clear();
}

export { getChatList, saveChatList, addChatToList, removeChatFromList, updateChatInList, getChat, saveChat, removeChat, clearListAndChat };