import { useState } from "react";
import { updateTodo } from "../../firebase";

const EditTodoModal = ({closeModal, data }) => {
  const [todo, setTodo] = useState(data.todo);
  const [done, setDone] = useState(data.done);

  const clickHandle = async () => {
    await updateTodo(data.id, {
      todo,
      done,
    });
    closeModal();
  };
  return (
    <div className="grid gap-3">
      {/* <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
      /> */}
      <span className="text-black text-center text-3xl font-medium">Todo Düzenle</span>
      <textarea
            rows={8}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
              className="border rounded-md text-black overflow-hidden outline-none p-3 w-[400px] "
              defaultValue={todo}
            />
      <label className="flex gap-x-2 items-center">
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => setDone(e.target.checked)}
        />
        Tamamlandı mı?
      </label>
      <button
        onClick={clickHandle}
        className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-20"
      >
        Kaydet
      </button>
    </div>
  );
};

export default EditTodoModal;
