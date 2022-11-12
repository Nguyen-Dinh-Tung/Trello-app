import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ListItem from '../ListItem/ListItem';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {v4 as uuidv4} from 'uuid'
import { useDispatch } from 'react-redux';
import { setItemBroad } from '../../redux/features/broad.slice';
import List from '@mui/material/List';
import { setColHover } from '../../redux/features/colHover';
import { setDataBroad } from '../../redux/features/broad.slice';

function Column(props) {
  const data = useSelector(state => state.broad.data);
  // const columnDClick = useSelector(state => state.columnDClick.column)

  const colHover = useSelector(state => state.colHover.column)
  const dispatch = useDispatch();
  const [isItemInput , setItemInput] = useState(true) ;
  const [valueItem , setValueItem] = useState()
  const dataByStore = useSelector((state) => state.broad.data);
  const column = props.column ;
  if(column){
    const index = props.index ;
    const idColum = column.id ;
    const handleCLick = () =>{
      setItemInput(false)
    }
    const handleSetItemValue = (e) =>{
      setValueItem(e.target.value)
    }
    const handleAddItem = () =>{
      let item = {
        id : '' ,
        text : '',
        listComment : []
      }  ;
      if(valueItem){
        const iTemId = uuidv4() ;
         item = {
          id : iTemId ,
          text : valueItem,
          listComment : []
        }
      }
      if(item.id !== '' && item.text){
        let newData = {
          ...data , columns : {
            ...data.columns ,
            [`${idColum}`] :{
              ...data.columns[`${idColum}`] ,
              items : [...data.columns[`${idColum}`].items , item ]
            }
          }
        }
        dispatch(setItemBroad(newData));
      }
      setItemInput(true)
      setValueItem('')
    }
    const handleFocusOut = (e) =>{
      let newTitle = e.target.value ;
      const newData = {
        ...dataByStore ,
        columns : {
          ...dataByStore.columns ,
          [`${column.id}`] : {
            ...dataByStore.columns[`${column.id}`] ,
            title : newTitle
          }
        }
      }
      dispatch(setDataBroad(newData))
    }
    const handleDoubleClick = (e) =>{
    let itemTarget = e.target.innerHTML;
    let input = `<div><class="div-item"><input type="text" value="${itemTarget}" style="color:black" class="item-content-out"/>`;
    e.target.innerHTML = input;
    document.querySelector('.item-content-out').addEventListener('focusout' , handleFocusOut);
    }
    return (
      <Draggable
      draggableId={idColum} index={index}
      >
        {provided =>(
          <List className="column"
          sx={{ m: 2 ,boxShadow: 3  }}
          {...provided.draggableProps}
          ref={provided.innerRef}
          onDoubleClick={(e)=>{
            dispatch(setColHover(column))
          }}
          >
            <div className='column-title'
            onDoubleClick={handleDoubleClick}
            style={{height : '40px'  , color : 'white' , fontSize : '18px' , backgroundColor : '#21acf3'}}
            {...provided.dragHandleProps}

            >
            {column.title}
            </div>
            <ListItem column={column} index={index} />
            <div>
            {isItemInput ? <button
            style={{
              height : '40px',
              width : '100%'  ,
              backgroundColor : 'white' ,
              borderRadius : '4px',
              color : 'black' ,
              position : 'relative',
              bottom : '-6px'
            }}
            className='btn-my-trello'
            onClick={handleCLick}
            >Thêm thẻ</button>
            : (
            <>
            <input type="text"
            style={{width : '100%' , height :'40px' , borderRadius : '4px'
            , border : '1px solid #ccc' , paddingLeft : '4px' }} placeholder={'Nhiệm vụ'}
            onChange={handleSetItemValue}
            />
            <button
            style={{
              height : '40px',
              width : '100%' ,
              backgroundColor : 'white' ,
              borderRadius : '4px',
              color : 'black',
              position : 'relative',
              bottom : '-6px'
            }}
            className={'btn-my-trello'}
            onClick={handleAddItem}
            disabled={valueItem ? false : true}
            >Tạo</button>
            </>
            )
           }
            </div>
          </List>
        )}
      </Draggable>
    );
  }

}

export default Column;
