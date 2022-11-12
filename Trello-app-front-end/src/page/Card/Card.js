import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useState, useEffect, Fragment} from "react";
import styledComponents from "styled-components";
const styled = styledComponents;
function Card(props) {
  const id = props.card.id;
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const onSaveTask = (content) => {
    if (content.trim() !== "") {
      props.onAddNewTask(content);
    }
    setIsAddingNewTask(false);
  };

  return (
    <Draggable draggableId={id ? id : ""} index={props.index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          id={props.card.id}
        >
          <TitleBar>
            {props.isTitleEditing ? (
              <EditInput
                key={props.card.id}
                value={props.card.title}
                onSave={props.onSaveTitleEdit}
                fontSize="1.5em"
                margin="20px 0 20px 8px"
              />
            ) : (
              <Title
                onDoubleClick={props.onTitleDoubleClick}
                {...provided.dragHandleProps}
              >
                {props.card.title}
              </Title>
            )}
            <Cross onClick={props.onRemoveCard}>x</Cross>
          </TitleBar>
          <Droppable droppableId={props.card.id} type="task">
            {(provided, snapshot) => (
              <Fragment>
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {props.tasks.map((task, index) => (
                    <Task
                      key={task.id}
                      task={task}
                      index={index}
                      onSaveTaskEdit={(content) =>
                        props.onSaveTaskEdit(task.id, content)
                      }
                      onTaskDoubleClick={() => props.onTaskDoubleClick(task)}
                      isTaskEditing={props.isTaskEditing(task)}
                    />
                  ))}
                </TaskList>
                {provided.placeholder}
              </Fragment>
            )}
          </Droppable>
          <NewTaskBar>
            {isAddingNewTask ? (
              <EditInput
                key="newtask"
                value=""
                onSave={onSaveTask}
                margin="8px"
              />
            ) : (
              <NewTaskButton onClick={() => setIsAddingNewTask(true)}>
                + Thêm thẻ
              </NewTaskButton>
            )}
          </NewTaskBar>
        </CardContainer>
      )}
    </Draggable>
  );
}

const TaskContainer = styled.div`
  display: flex;
`;
const TaskContent = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  width: 100%;
`;
function Task(props) {
  return (
    <TaskContainer>
      {props.isTaskEditing ? (
        <EditInput
          key={props.task.id}
          value={props.task.content}
          onSave={props.onSaveTaskEdit}
          margin="0 0 8px 0"
        />
      ) : (
        <Draggable draggableId={props.task.id} index={props.index}>
          {(provided, snapshot) => (
            <TaskContent
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              onDoubleClick={props.onTaskDoubleClick}
            >
              {props.task.content}
            </TaskContent>
          )}
        </Draggable>
      )}
    </TaskContainer>
  );
}

const Input = styled.input`
  font-size: ${(props) => props.fontSize || "inherit"};
  font-family: inherit;
  margin: ${(props) => props.margin || "inherit"};
  padding: 8px;
  width: 100%;
`;
function EditInput(props) {
  const [val, setVal] = useState(props.value);
  return (
    <Input
      type="text"
      autoFocus
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onKeyPress={(event) => {
        if (event.key === "Enter" || event.key === "Escape") {
          props.onSave(val);
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onBlur={() => props.onSave(val)}
      fontSize={props.fontSize}
      margin={props.margin}
    />
  );
}
const CardsContainer = styled.div`
  margin: 2em;
  display: flex;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`;
const NewTaskBar = styled.div`
  display: flex;
`;
const NewTaskButton = styled.div`
  padding: 8px;
  margin: 8px;
  cursor: pointer;
  text-align: right;
  color: white;
  background-color: green;
  width: 100%;
  text-align: center;
  border-radius: 14px;
`;
const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h3`
  padding: 8px;
  font-size: 1.5em;
  text-overflow: ellipsis;
`;
const Cross = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  text-align: right;
  color: grey;
`;
const CardContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 4px;
  width: 220px;
  display: flex;
  flex-direction: column;
  background-color: #86cbf3;
`;
const TaskList = styled.div`
  padding: 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  min-height: 400px;
  height: 100%;
`;

export default Card;
