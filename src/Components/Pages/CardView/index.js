import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisOutlined } from "@ant-design/icons";

const DraggableCard = ({ id, content }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full bg-[#fff] min-h-[110px] p-3 flex justify-between flex-col rounded-[12px] shadow-md"
    >
      <div className="flex justify-between">
        <p>{content.task}</p>
        <EllipsisOutlined />
      </div>
      <div className="flex justify-between">
        <span>{content.category}</span>
        <span>{content.dueOn}</span>
      </div>
    </div>
  );
};

const CardView = ({taskTableData}) => {
  const [columns, setColumns] = useState({
    Work: taskTableData.todoData,
    Complete: taskTableData.inProgressData,
    Pending: taskTableData.completeData,
  });

  useEffect(() => {
    setColumns(taskTableData)
  }, [taskTableData])

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return; // Do nothing if there's no valid target or the card isn't moved
  
    const [sourceColumn, sourceIndex] = findCard(active.id);
    const [destinationColumn, destinationIndex] = findCard(over.id);
  
    if (sourceColumn && destinationColumn) {
      setColumns((prev) => {
        const sourceItems = [...prev[sourceColumn]];
        const [movedItem] = sourceItems.splice(sourceIndex, 1);
  
        const destinationItems = [...prev[destinationColumn]];
        destinationItems.splice(destinationIndex, 0, movedItem);
  
        return {
          ...prev,
          [sourceColumn]: sourceItems,
          [destinationColumn]: destinationItems,
        };
      });
    }
  };
  

  const findCard = (id) => {
    for (const [column, items] of Object.entries(columns)) {
      const index = items.findIndex((item) => item.id === id);
      if (index !== -1) {
        return [column, index];
      }
    }
    return [null, -1];
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex justify-between gap-4">
        {Object.entries(columns).map(([columnName, items]) => (
          <SortableContext
            key={columnName}
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="w-[33%] h-[100vh] flex flex-col gap-4 bg-[#58575112] p-3 rounded-[12px]">
              <h3 
                className={columnName === "todoData" ? "w-fit p-2 rounded-[4px] text-[14px] text-left font-medium bg-[#FAC3FF]" : columnName === "inProgressData" ? "w-fit p-2 rounded-[4px] text-[14px] text-left font-medium bg-[#85D9F1]" : "w-fit p-2 rounded-[4px] text-[14px] text-left font-medium bg-[#A2D6A0]"}

              >
                {columnName === "todoData" ? "TO-DO" : columnName === "inProgressData" ? "IN-PROGRESS" : "COMPLETED"}
              </h3>
              <div className="scroll_container h-[600px] overflow-y-scroll scrollbar-hide flex flex-col gap-3">
                {items.map((item) => (
                  <DraggableCard key={item.id} id={item.id} content={item} />
                ))}
              </div>
            </div>
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};

export default CardView;
