import {users} from '../auth/controller';

export const get = (req, res) => {
  res.json(users[req.user]);
};

export const post = (req, res) => {
  const user = users[req.user];
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  res.json(user);
};