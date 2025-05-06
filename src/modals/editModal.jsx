import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const editModal = ({ msg, item }) => {
  return new Promise((resolve) => {
    let newName = null;
    const oldVal = item.name;
    const closeModal = (submit) => {
      if (submit) {
        const newVal = document.getElementById("my-custom-input").value;
        if (oldVal !== newVal && newVal.trim().length > 0) {
          newName = newVal;
        } else {
          const errEl = document.getElementById("input-error");
          errEl.innerText = "請輸入不同且非空白的名稱";
          errEl.style.color = "red";
          return;
        }
      }
      MySwal.close();
    };
    MySwal.fire({
      html: (
        <div>
          <p className="f:24 f:bold fg:gray my:32">{msg}</p>
          <input
            type="text"
            id="my-custom-input"
            className="w:full  inline-block r:4 p:16 b:1|solid|gray-40 mb:16"
          />
          <p id="input-error" className="user-select:none f:16 fg:white mb:32">
            錯誤訊息
          </p>
          <div className="flex jc:end">
            <button
              className="inline-block p:4|8 r:4 bg:#0C2556 f:16 fg:white"
              onClick={() => {
                closeModal(true);
              }}
            >
              確定
            </button>
            <div className="w:16"></div>
            <button
              className="inline-block p:4|8 r:4 bg:red f:16 fg:white"
              onClick={() => {
                closeModal(false);
              }}
            >
              取消
            </button>
          </div>
        </div>
      ),
      showConfirmButton: false,
      showCancelButton: false,
      didOpen: () => {
        const input = document.getElementById("my-custom-input");
        if (input) {
          input.focus();
          input.value = item.name;
        }
      },
      didClose: () => {
        let result = null;
        if (newName) {
          result = { ...item };
          result.name = newName;
          result.updatedAt = new Date();
        }
        resolve(result);
      },
    });
  });
};

export default editModal;
