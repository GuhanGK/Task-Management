import React, { useState } from "react";
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
      className="w-full bg-[#fff] h-[110px] p-3 flex justify-between flex-col rounded-[12px] shadow-md"
    >
      <div className="flex justify-between">
        <p>{content.title}</p>
        <EllipsisOutlined />
      </div>
      <div className="flex justify-between">
        <span>{content.category}</span>
        <span>{content.date}</span>
      </div>
    </div>
  );
};

const CardView = () => {
  const [columns, setColumns] = useState({
    Work: [
      { id: "1", title: "Interview with Design Team", category: "Work", date: "Today" },
      { id: "2", title: "Prepare Design Brief", category: "Work", date: "Tomorrow" },
    ],
    Complete: [
      { id: "3", title: "Team Meeting", category: "Complete", date: "Next Week" },
      { id: "4", title: "Finalize Report", category: "Complete", date: "Next Month" },
    ],
    Pending: [
      { id: "5", title: "Schedule Presentation", category: "Pending", date: "Next Week" },
    ],
  });

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
              <h3 className="text-lg font-bold">{columnName}</h3>
              {items.map((item) => (
                <DraggableCard key={item.id} id={item.id} content={item} />
              ))}
            </div>
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
};

export default CardView;
