import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const sampleTodos = [
    {
      id: uuidv4(),
      title: "Todo 1",
      status: "todo",
    },
    {
      id: uuidv4(),
      title: "Todo 2",
      status: "todo",
    },
    {
      id: uuidv4(),
      title: "Todo 3",
      status: "todo",
    },
  ];
  const [todos, setTodos] = useState(sampleTodos);
  const [dropIndicator, setDropIndicator] = useState(null);

  function handleDragStart(event, todoId) {
    event.dataTransfer.setData("text/plain", todoId);
  }

  function handleDragEnd(event) {
    event.dataTransfer.clearData();
  }

  function handleDropOver(event, status) {
    event.preventDefault();

    const todoId = event.dataTransfer.getData("text/plain");
    setTodos((prev) => {
      return prev.map((item) => {
        if (item.id === todoId) {
          return { ...item, status };
        }
        return item;
      });
    });
  }

  function handleDragOver(event) {
    event.preventDefault();
    setDropIndicator(event.currentTarget.id);
  }

  const renderTask = (status) => {
    return todos
      ?.filter((todo) => todo.status === status)
      .map((item) => (
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragEnd={(e) => handleDragEnd(e, item)}
          key={item.id}
          className="w-full p-2 rounded bg-gray-100 shadow"
        >
          {item?.title}
        </div>
      ));
  };

  return (
    <section className="flex flex-col p-6 h-screen">
      <div className="grid grid-cols-3 gap-2">
        <h2 className="text-center">Todo</h2>
        <h2 className="text-center">In Progress</h2>
        <h2 className="text-center">Done</h2>
        <div
          id="todo"
          onDrop={(e) => handleDropOver(e, "todo")}
          onDragOver={(e) => handleDragOver(e)}
          className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 ronuded ${
            dropIndicator === "todo" ? "bg-blue-200" : ""
          } `}
        >
          {renderTask("todo")}
        </div>
        <div
          id="in-progress"
          onDrop={(e) => handleDropOver(e, "in-progress")}
          onDragOver={(e) => handleDragOver(e)}
          className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 ronuded ${
            dropIndicator === "in-progress" ? "bg-blue-200" : ""
          } `}
        >
          {renderTask("in-progress")}
        </div>
        <div
          id="done"
          onDrop={(e) => handleDropOver(e, "done")}
          onDragOver={(e) => handleDragOver(e)}
          className={`flex flex-col items-center justify-start w-full border-2 border-dashed p-0.5 gap-1 ronuded ${
            dropIndicator === "done" ? "bg-blue-200" : ""
          } `}
        >
          {renderTask("done")}
        </div>
      </div>
    </section>
  );
};

export default App;
