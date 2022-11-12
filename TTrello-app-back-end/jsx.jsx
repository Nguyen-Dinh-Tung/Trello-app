import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { setShowModalDetailItem, setShowModalItem } from '../../redux/features/showModal.slice';

import { useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIdItemTarget } from '../../redux/features/colHover';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { setDataBroad } from '../../redux/features/broad.slice';
import { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AlignItemsList from './../comment/Comment';
import jwtDecode from 'jwt-decode';
import e from 'express';
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});
const token = localStorage.getItem('token') ;
const user = {
  idUser : jwtDecode(token).id ,
  email : jwtDecode(token).email
} ;
const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
let itemId = '' ;

function Item({ provided, item, isDragging  } , props) {
  const dispatch = useDispatch() ;
  const dataByStore = useSelector((state) => state.broad.data);
  const itemIdTarget = item.id
  var  handleFocusOut = (e) =>{
    let itemContent = e.target.value ;
    let newItems = [] ;
    dataByStore.columnOrder.forEach(column =>{
          dataByStore.columns[`${column}`].items.forEach((e,index) =>{
            if(e.id === itemIdTarget){
              newItems = [...dataByStore.columns[`${column}`].items]
              newItems.splice(index,1 , {
                id : itemIdTarget ,
                text : itemContent
              })
              let newData = {
                ...dataByStore ,
                columns : {
                  ...dataByStore.columns ,
                  [`${column}`] : {
                    ...dataByStore.columns[`${column}`] ,
                    items : [...newItems]
                  }
                }
              }
              dispatch(setShowModalItem(false))
              dispatch(setDataBroad(newData))
            }
          })

    })
  }
  const handleEditItem = (e) =>{
    // dispatch(setShowModalItem(true))
    let itemTarget = e.target.innerHTML
    let input = `<div class="div-item"><input type="text" value="${itemTarget}" style="width: 100% ; paddingLeft : 4px" class="item-content-out"/></div>`
    e.target.innerHTML = input;
    document.querySelector('.item-content-out').addEventListener('focusout' , handleFocusOut)
  }
  const handleClickMoreOption = () =>{
    itemId = itemIdTarget ;
    dispatch(setShowModalDetailItem(true))

  }
  return (
    <div
    style={{display: 'flex' , justifyContent: 'space-between' , padding: '0 6px' , alignItems : 'center'  , backgroundColor : 'white' , margin: '10px  12px' , borderRadius : '8px'}}
    >
      <div
      class="item-style-my-fen"
      id={item.id}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className={`item ${isDragging ? "is-dragging" : ""} item-task`}
        onDoubleClick={handleEditItem}
        onMouseOver={(e) =>{
          let valueTarget = e.target.getAttribute('data-rbd-draggable-id') ;
          if(valueTarget !== null && valueTarget){
            dispatch(setIdItemTarget(valueTarget))
          }
        }}

      >
      {item.text}
      </div>
      <i class="fa-solid fa-ellipsis " style={{fontSize:"20px" , cursor: 'pointer'}} onClick={handleClickMoreOption}
      ></i>
      <ModalDetailsItem item={item.text}/>
    </div>

  );
}

export default Item;



function ModalDetailsItem(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const handleClose = () => dispatch(setShowModalDetailItem(false))
  const [itemTarget , setItemTarget] = useState()
  const isShowModalDetailsItem = useSelector((state) => state.isShowModal.isShowModalDetailsItem) ;
  const dataByStore = useSelector((state) => state.broad.data);
  const [commentContent , setCommentContent] = useState()
  useEffect(() =>{
    dataByStore.columnOrder.forEach(column =>{
      dataByStore.columns[`${column}`].items.forEach((e,index) =>{
        if(itemId && e.id == itemId){
          setItemTarget(e)
        }
      })
  }, [itemId])
  })

  const handleKeyEnter = () =>{
    let newComment = {
      ...user ,
      content : commentContent
    }
    console.log(newComment);
    if(e.key === 'enter'){
      console.log(newComment);
    }
  }
  return (
    <div>
      <Dialog open={isShowModalDetailsItem} onClose={handleClose}
      >
        <DialogTitle sx={{width : '600px'}}>Chi tiết công việc</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Tên việc : {itemTarget&&itemTarget.text}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Hãy để lại bình luận của bạn"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) =>{
              setCommentContent(e.target.value)
            }}
            onKeyDown={handleKeyEnter}
          />
        </DialogContent>
        <AlignItemsList/>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}