interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" >
      <div className="bg-white p-6 rounded-2xl shadow-lg md:w-[420px] w-[95%] relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#030303" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>        </button>
        {children}
      </div>
    </div>
  );
};
