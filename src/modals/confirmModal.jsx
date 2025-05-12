import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const confirmModal = (msg) => {
  return new Promise((resolve) => {
    let result;
    const closeModal = (isConfirmed) => {
      result = isConfirmed;
      MySwal.close();
    };
    MySwal.fire({
      html: (
        <div>
          <p className="f:24 f:bold fg:gray my:32">{msg}</p>
          <div className="flex jc:end">
            <button
              className="inline-block p:4|8 r:4 bg:#0C2556 f:16 fg:white"
              onClick={() => closeModal(true)}
            >
              確定
            </button>
            <div className="w:16"></div>
            <button
              className="inline-block p:4|8 r:4 bg:red f:16 fg:white"
              onClick={() => closeModal(false)}
            >
              取消
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

export default confirmModal;
