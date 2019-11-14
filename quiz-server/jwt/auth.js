import jwt from 'jsonwebtoken'

const config={
  secret:"iamthebest"
}

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token) {
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          console.log(err);
            console.log('not valid')
          return res.json({
            success: false,
            code:'304',
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
        console.log('not supplied');
      return res.json({
        success: false,
        message: 'Auth token is not supplied',
        code:'305'
      });
    }
  };

  export default checkToken;