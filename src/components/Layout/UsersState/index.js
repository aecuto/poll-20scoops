import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MuiListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import AvatarGroup from '@material-ui/lab/AvatarGroup';

import firebase from 'services/firebase';
import { filter, orderBy } from 'lodash';
import styled from 'styled-components';

const ListItemText = styled(MuiListItemText)`
  && {
    p {
      color: ${({ secondary }) =>
        secondary === 'online' ? 'lawngreen' : 'red'};
    }
  }
`;

const UsersState = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    listenOnline();
  }, []);

  const listenOnline = () => {
    firebase
      .database()
      .ref(`/users`)
      .orderByChild('lastChanged')
      .on('value', snapshot => {
        const users = [];

        snapshot.forEach(childSnapshot => {
          const childData = childSnapshot.val();
          users.push(childData);
        });

        setUsers(users);
      });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filterUsers = filter(users, { state: 'online' });
  const orderUser = orderBy(users, 'state', 'desc');

  return (
    <>
      <Button onClick={handleClickOpen}>
        <AvatarGroup max={3}>
          {filterUsers.map((user, index) => (
            <Avatar key={index} alt={user.displayName} src={user.photoURL} />
          ))}
        </AvatarGroup>
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>20scoops Users</DialogTitle>
        <List>
          {orderUser.map((user, index) => (
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
