import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import AvatarGroup from '@material-ui/lab/AvatarGroup';

import { useContextAuthManager } from 'components/Auth/AuthManager';

const UsersState = () => {
  const { users } = useContextAuthManager();

  return (
    <div>
      <AvatarGroup>
        {users
          .filter(user => user.state === 'online')
          .map((user, index) => (
            <Avatar key={index} alt={user.displayName} src={user.photoURL} />
          ))}
      </AvatarGroup>
    </div>
  );
};

export default UsersState;
