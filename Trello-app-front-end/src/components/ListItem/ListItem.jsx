import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { FixedSizeList, areEqual } from "react-window";
import Item from '../Item/Item';
import { useRef ,useLayoutEffect } from 'react';
import Row from '../Row/Row';

function ListItem(props) {
  const index = props.index
  const column = props.column ;
  const listRef = useRef();
  useLayoutEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTo(0);
    }
  }, [index]);
  return (
    <Droppable
    droppableId={column.id}
    type='virtual'

    renderClone={(provided, snapshot, rubric ) => (
      <Item
        provided={provided}
        isDragging={snapshot.isDragging}
        item={column.items[rubric.source.index]}
      />
    )}
    >
      {(provided, snapshot) => {
         const itemCount = snapshot.isUsingPlaceholder
         ? column.items.length + 1
         : column.items.length;

       return (
        <div column={column}>
          <FixedSizeList
           height={600}
           itemCount={itemCount}
           itemSize={80}
           width={300}
           outerRef={provided.innerRef}
           itemData={column.items}
           className="task-list"
           ref={listRef}
         >
           {Row}
         </FixedSizeList>
           {provided.placeholder}
        </div>
        )
    }}
    </Droppable>
  );
}

export default ListItem;