import * as React from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {ListUtils} from "@legion-hq/utility/list";

const ItemList = React.memo(function ItemList({draggableItems}) {
  return draggableItems.map((item, index) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.component}
        </div>
      )}
    </Draggable>
  ));
});

function DragDropContainer({items, reorderUnits}) {
  const [draggableItems, setDraggableItems] = React.useState(items);
  React.useEffect(() => {
    setDraggableItems(items);
  }, [items]);
  function onDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const newItems = ListUtils.reorder(
      draggableItems,
      result.source.index,
      result.destination.index,
    );
    reorderUnits(result.source.index, result.destination.index);
    setDraggableItems(newItems);
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ItemList draggableItems={draggableItems} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDropContainer;
