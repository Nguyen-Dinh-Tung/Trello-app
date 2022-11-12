import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
export default function CommentItem(props) {
  const data = props.data
  console.log(data)
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={`${data.image}`} />
      </ListItemAvatar>
      <ListItemText
        primary={data.email}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
            </Typography>
            {data.content}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

