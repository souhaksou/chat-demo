import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Spinner from "../images/spinner";

const MySwal = withReactContent(Swal);

let closeModal = null; // 模組層級的變數，供外部存取

const openLoadingModal = (msg) => {
  return new Promise((resolve) => {
    closeModal = () => {
      MySwal.close(); // 關閉 modal
    };
    MySwal.fire({
      html: (
        <div className="flex jc:center ai:center my:32">
          <div>
            <Spinner width={32} height={32} />
          </div>
          <div className="w:32"></div>
          <p className="f:32 f:bold">{msg}</p>
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
