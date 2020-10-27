import PropTypes from 'prop-types';
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

import Skeleton from '@material-ui/lab/Skeleton';

import DeleteDialog from './components/DeleteDialog';

const ListView = ({ users, editLink, removeItem }) => {
  if (!users.length) {
    return (
      <Skeleton animation="wave" variant="rect" width={280} height={140} />
    );
  }

  return (
    <Grid container spacing={3}>
      {users.map((user, index) => (
        <Grid item xs={12} sm={3} key={user._id}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="body1">
                <strong>#{index + 1} </strong>
                {user.name}
              </Typography>
              <Typography variant="body2">{user.email}</Typography>
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => editLink(user._id)}
              >
                Edit
              </Button>
              <DeleteDialog removeItem={() => removeItem(user._id)} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

ListView.propTypes = {
  editLink: PropTypes.func,
  removeItem: PropTypes.func,
  users: PropTypes.array
};

export default ListView;
