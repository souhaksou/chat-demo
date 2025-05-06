import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

let closeModal = null; // 模組層級的變數，供外部存取

const openLoadingModal = (msg) => {
  return new Promise((resolve) => {
    closeModal = () => {
      MySwal.close(); // 關閉 modal
    };
    MySwal.fire({
      html: (
        <div>
          <p className="f:32 f:bold my:32">{msg}</p>
        </div>
      ),
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didClose: () => {
        resolve();
      },
    });
  });
};

const closeLoadingModal = () => {
  if (closeModal) {
    closeModal();
    closeModal = null; // 避免重複關閉
  }
};
export { openLoadingModal, closeLoadingModal };
