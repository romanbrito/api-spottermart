import jwt from 'jsonwebtoken';

export let users = [{firstName: "a", email: "a", password: "a", id: 0}];

export const postRegister = (req, res) => {
  const index = users.push(req.body) - 1;

  const user = users[index];
  user.id = index;

  sendToken(user, res);

};

export const postLogin = (req, res) => {
  const user = users.find(user => user.email == req.body.email);
  if(!user){
    sendAuthError(res);
  }

  // decrypt password first
  if(user.password == req.body.password){
    sendToken(user, res);
  } else {
  sendAuthError(res);
  }
};

function sendAuthError(res) {
  return res.json({ success: false, message: 'email or password incorrect'});
}

function sendToken(user, res) {
  const token = jwt.sign(user.id, '123'); // secret '123' should be passed from env var in production
  res.json({
    firstName: user.firstName,
    token});
}

export const checkAuthenticated = function checkAuthenticated(req, res, next) {
  if(!req.header('authorization'))
    return res.status(401).send({message: 'Unauthorized requested.  Missing authentication header'});
  const token = req.header('authorization').split(' ')[1];
  const payload = jwt.decode(token, '123');

  if(!payload)
    return res.status(401).send({message: 'Unauthorized requested. Authentication header invalid'});

  req.user = payload;

  next();
}