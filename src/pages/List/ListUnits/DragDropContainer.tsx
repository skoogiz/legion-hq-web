import * as React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
  DroppableProps,
} from "react-beautiful-dnd";
import {ListUtils} from "@legion-hq/utility/list";
import {ErrorBoundary} from "react-error-boundary";
import {ErrorFallback} from "@legion-hq/components";

const ItemList = React.memo<{draggableItems: {id: string; component: JSX.Element}[]}>(
  function ItemList({draggableItems}) {
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
  },
);

export const StrictModeDroppable = ({children, ...props}: DroppableProps) => {
  const [enabled, setEnabled] = React.useState(false);
  React.useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};

type Props = {
  items: {id: string; component: JSX.Element}[];
  reorderUnits: (startIndex: number, endIndex: number) => void;
};

export function DragDropContainer({items, reorderUnits}: Props) {
  const [draggableItems, setDraggableItems] = React.useState(items);
  React.useEffect(() => {
    setDraggableItems(items);
  }, [items]);
  function onDragEnd(result: DropResult) {
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
      <StrictModeDroppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ItemList draggableItems={draggableItems} />
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
}
