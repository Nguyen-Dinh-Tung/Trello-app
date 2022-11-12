import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {areEqual} from "react-window";
import Item from "../Item/Item";
const Row = React.memo(function Row(props) {
  const {data: items, index, style} = props;
  const item = items[index];
  // We are rendering an extra item for the placeholder
  if (!item) {
    return null;
  }

  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided) => <Item provided={provided} item={item} style={style} />}
    </Draggable>
  );
}, areEqual);
export default Row;
