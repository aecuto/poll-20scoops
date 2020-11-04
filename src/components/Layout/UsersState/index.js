import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import AvatarGroup from '@material-ui/lab/AvatarGroup';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const UsersState = () => {
  const { users } = useContextAuthManager();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filterUsers = users.filter(user => user.state === 'online').reverse();

  return (
    <>
      <Button onClick={handleClickOpen}>
        <AvatarGroup>
          {filterUsers.map((user, index) => (
            <Avatar key={index} alt={user.displayName} src={user.photoURL} />
          ))}
        </AvatarGroup>
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>20scoops Users</DialogTitle>
        <List>
          {users.map((user, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar
                  key={index}
                  alt={user.displayName}
                  src={user.photoURL}
                />
              </ListItemAvatar>
              <ListItemText primary={user.displayName} secondary={user.state} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

export default UsersState;
