import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const filesModal = ({ msg, item }) => {
  return new Promise((resolve) => {
    const checkAll = () => {
      document
        .querySelectorAll(".swal-checkbox")
        .forEach((el) => (el.checked = true));
    };
    const uncheckAll = () => {
      document
        .querySelectorAll(".swal-checkbox")
        .forEach((el) => (el.checked = false));
    };
    let result = { key: null, data: null };
    const closeModal = (key) => {
      if (key) {
        result.key = key;
      }
      if (key === "export") {
        const checkedIds = Array.from(
          document.querySelectorAll(".swal-checkbox:checked")
        ).map((el) => el.value);
        if (checkedIds.length === 0) return;
        result.data = checkedIds;
      }
      MySwal.close();
    };
    MySwal.fire({
      width: "auto",
      customClass: {
        popup: "max-w:600!",
      },
      html: (
        <div className="w:full">
          <p className="f:24 f:bold fg:gray my:32">{msg}</p>
          {item.map((listItem) => (
            <label
              className="flex ai:center py:8 mb:8 cursor:pointer"
              key={listItem.id}
            >
              <div className="pr:16">
                <input
                  type="checkbox"
                  className="swal-checkbox"
                  value={listItem.id}
                />
              </div>
              <p className="f:16 t:left white-space:normal white-space:nowrap text-overflow:ellipsis overflow-x:hidden">
                {listItem.name}
              </p>
            </label>
          ))}
          <div className="h:16"></div>
          <div className="flex jc:start">
            <button
              className="inline-block p:4|8 r:4 bg:gray-70 f:16 fg:white"
              onClick={() => checkAll()}
            >
              選擇全部
            </button>
            <div className="w:16"></div>
            <button
              className="inline-block p:4|8 r:4 b:1|solid|gray-70 fg:gray-70 f:16 bg:white"
              onClick={() => uncheckAll()}
            >
              取消全選
            </button>
          </div>
          <div className="h:16"></div>
          <div className="flex jc:end">
            <button
              className="inline-block p:4|8 r:4 bg:#0C2556 f:16 fg:white"
              onClick={() => closeModal("import")}
            >
              匯入
            </button>
            <div className="w:16"></div>
            <button
              className="inline-block p:4|8 r:4 bg:#74829E f:16 fg:white"
              onClick={() => closeModal("export")}
            >
              匯出
            </button>
            <div className="w:16"></div>
            <button
              className="inline-block p:4|8 r:4 bg:#345087 f:16 fg:white"
              onClick={() => closeModal("example")}
            >
              範例
            </button>
            <div className="w:16"></div>
            <button
              className="inline-block p:4|8 r:4 bg:red f:16 fg:white"
              onClick={() => closeModal(null)}
            >
              關閉
            </button>
          </div>
        </div>
      ),
      showConfirmButton: false,
      showCancelButton: false,
      didClose: () => {
        resolve(result);
      },
    });
  });
};

export default filesModal;
