import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const confirmModal = (msg) => {
  return new Promise((resolve) => {
    const closeModal = () => {
      MySwal.close();
    };
    MySwal.fire({
      html: (
        <div>
          <p className="f:32 f:bold fg:gray my:32">{msg}</p>
          <div className="flex jc:end">
            <button
              className="inline-block p:4|8 r:4 bg:red f:16 fg:white"
              onClick={() => closeModal()}
            >
              關閉
            </button>
          </div>
        </div>
      ),
      showConfirmButton: false,
      showCancelButton: false,
      didClose: () => {
        resolve();
      },
    });
  });
};

export default confirmModal;
