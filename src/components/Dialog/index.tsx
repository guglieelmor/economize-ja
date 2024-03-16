import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler } from 'react-hook-form';

type DialogProps = {
  children: React.ReactNode;
  color?: string;
  handleCloseDialog: Dispatch<SetStateAction<any>>;
  handleSubmit: SubmitHandler<any>;
  size?: string;
  title: string;
  loading: boolean;
  indicator?: string;
  action?: string;
  hoverColor?: string;
};

function Dialog(props: DialogProps) {
  const {
    children,
    color = 'bg-teal-200',
    hoverColor = 'hover:bg-teal-300',
    handleCloseDialog,
    size = 'w-1/3',
    handleSubmit,
    title,
    loading,
    indicator,
    action = 'Adicionar'
  } = props;

  const hidden = loading ? 'hidden' : '';
  const CloseIcon = () => {
    return (
      <span className="absolute top-0 right-0 p-4">
        <button
          onClick={handleCloseDialog}
          className={`focus:outline-none focus:border-none hover:bg-red-700
          p-2 rounded-full inline-flex items-center`}
        >
          <svg
            className="fill-current text-black hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94
            9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            ></path>
          </svg>
        </button>
      </span>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex
    transition ease-in-out duration-700"
    >
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div
          className="flex items-end justify-center min-h-screen pt-4
        px-4 pb-20
        text-center sm:block sm:p-0"
        >
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className={`inline-block align-bottom bg-white rounded-lg text-left
            overflow-hidden shadow-xl transform transition-all sm:my-8
            sm:align-middle w-[344px]`}
            role="dialog"
          >
            <div
              className="relative px-8 pt-5 bg-white w-full flex-col flex
            rounded-lg space-x-4"
            >
              <div className="text-base md:text-xl text-black font-semibold flex items-center gap-2">
                {indicator && (
                  <div
                    className={`${indicator} rounded-full w-3 h-3 mr-2 md:mr-0`}
                  />
                )}
                {title}
              </div>
              {CloseIcon()}
            </div>
            <div className="bg-white">
              <div
                className="bg-white rounded px-8 pt-6 pb-8 flex flex-col
              overflow-y-auto h-auto"
              >
                {children}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className={`mt-3 w-full inline-flex justify-center rounded-md
                border border-gray-300 shadow-sm px-4 py-2 ${color} text-base
                font-medium text-gray-700 ${hoverColor}
                sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Aguarde' : action}
              </button>
              <button
                type="button"
                disabled={loading}
                className={`${
                  loading && hidden
                } mt-3 w-full inline-flex justify-center rounded-md
                border border-gray-300 shadow-sm px-4 py-2 bg-white
                font-medium text-gray-700 hover:bg-gray-100 focus:ring-indigo-500
                sm:mt-0 sm:ml-3 sm:w-auto text-sm`}
                onClick={handleCloseDialog}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
