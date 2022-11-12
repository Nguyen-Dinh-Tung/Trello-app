import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useState, useEffect, Fragment} from "react";
import styledComponents from "styled-components";
import CardsContainer from "../Card/Card";
import Card from "../Card/Card";
const styled = styledComponents;
function DragDropCards({
  cards,
  tasks,
  cardOrder,
  setCards,
  setTasks,
  setCardOrder,
  ITEM_TYPES,
}) {
  const [editing, setEditing] = useState(null);
  const onDragEnd = (result) => {
    const {destination, source, draggableId, type} = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    if (type === ITEM_TYPES.CARD) {
      reorderCards(source, destination, draggableId);
    } else {
      // type === tasks
      const start = cards[source.droppableId];
      const finish = cards[destination.droppableId];
      if (start.id === finish.id) {
        reorderTasksWithinCard(
          start,
          source.index,
          destination.index,
          draggableId
        );
      } else {
        moveTask(start, finish, source.index, destination.index, draggableId);
      }
    }
  };

  const reorderCards = (source, destination, draggableId) => {
    const newCardOrder = Array.from(cardOrder);
    newCardOrder.splice(source.index, 1);
    newCardOrder.splice(destination.index, 0, draggableId);
    setCardOrder(newCardOrder);
  };

  const reorderTasksWithinCard = (
    card,
    sourceIdx,
    destinationIdx,
    draggableId
  ) => {
    const newTaskIds = Array.from(card.taskIds);
    newTaskIds.splice(sourceIdx, 1);
    newTaskIds.splice(destinationIdx, 0, draggableId);
    setCards({
      ...cards,
      [card.id]: {
        ...card,
        taskIds: newTaskIds,
      },
    });
  };

  const moveTask = (start, finish, sourceIdx, destinationIdx, draggableId) => {
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(sourceIdx, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destinationIdx, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    setCards({
      ...cards,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  const onAddNewTask = (cardID, content) => {
    const newTask = {
      id: "task-" + genRandomID(),
      content,
    };
    setTasks({
      ...tasks,
      [newTask.id]: newTask,
    });
    const newTaskIds = Array.from(cards[cardID].taskIds);
    newTaskIds.push(newTask.id);
    setCards({...cards, [cardID]: {...cards[cardID], taskIds: newTaskIds}});
  };

  const onRemoveCard = (cardID) => {
    const newCardOrder = cardOrder.filter((id) => id !== cardID);
    setCardOrder(newCardOrder);

    const cardTaskIds = cards[cardID].taskIds;
    cardTaskIds.forEach((taskID) => delete tasks[taskID]);
    delete cards[cardID];
    setCards(cards);
    setTasks(tasks);
  };

  const onRemoveTask = (taskID, cardID) => {
    const newTaskIds = cards[cardID].taskIds.filter((id) => id !== taskID);
    setCards({...cards, [cardID]: {...cards[cardID], taskIds: newTaskIds}});
    delete tasks[taskID];
    setTasks(tasks);
  };

  const onSaveTitleEdit = (cardID, newTitle) => {
    if (newTitle !== cards[cardID].title) {
      setCards({
        ...cards,
        [cardID]: {
          ...cards[cardID],
          title: newTitle,
        },
      });
    }
    setEditing(null);
  };

  const onSaveTaskEdit = (taskID, cardID, newContent) => {
    if (newContent.trim() === "") {
      onRemoveTask(taskID, cardID);
    } else if (newContent !== tasks[taskID].content) {
      setTasks({
        ...tasks,
        [taskID]: {...tasks[taskID], content: newContent},
      });
    }
    setEditing(null);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-cards" direction="horizontal" type="card">
        {(provided) => (
          <CardsContainer {...provided.droppableProps} ref={provided.innerRef}>
            {cardOrder.map((id, index) => {
              const card = cards[id];
              const cardTasks = card.taskIds.map((taskId) => tasks[taskId]);
              return (
                <Card
                  key={card.id}
                  card={card}
                  tasks={cardTasks}
                  index={index}
                  onSaveTitleEdit={(title) => onSaveTitleEdit(card.id, title)}
                  onRemoveCard={() => onRemoveCard(card.id)}
                  onAddNewTask={(content) => onAddNewTask(card.id, content)}
                  onSaveTaskEdit={(taskID, newContent) =>
                    onSaveTaskEdit(taskID, card.id, newContent)
                  }
                  onTitleDoubleClick={() => setEditing(card.id)}
                  onTaskDoubleClick={(task) => setEditing(task.id)}
                  isTitleEditing={editing === card.id}
                  isTaskEditing={(task) => editing === task.id}
                />
              );
            })}
            {provided.placeholder}
          </CardsContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const TaskList = styled.div`
  padding: 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  min-height: 400px;
  height: 100%;
`;

export default DragDropCards;
function genRandomID() {
  return (Math.random() + 1).toString(36).substring(7);
}
