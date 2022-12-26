const admin = require('../config/firebase');
class Middleware {
	async decodeToken(req, res, next) {
		const token = req.headers.authorization.split(' ')[1];

		  // Check if not token
		  if (!token) {
			return res.status(401).json({ msg: 'No token, authorization denied' });
		  }

		try {
			const decodeValue = await admin.auth().verifyIdToken(token);

			if (decodeValue) {
				req.user = decodeValue.user_id;
				return next();
			}
			return res.json({ message: 'Unauthorized' });
		} catch (e) {
			return res.json({ message: 'Internal Error' });
		}
	}
}
module.exports = new Middleware();

// module.exports = function (req, res, next) {
// 	// Get token from header
// 	const token = req.header('x-auth-token');
  
// 	// Check if not token
// 	if (!token) {
// 	  return res.status(401).json({ msg: 'No token, authorization denied' });
// 	}
  
// 	// Verify token
// 	try {
// 	  jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
// 		if (error) {
// 		  return res.status(401).json({ msg: 'Token is not valid' });
// 		} else {
// 		  req.user = decoded.user;
// 		  next();
// 		}
// 	  });
// 	} catch (err) {
// 	  console.error('something wrong with auth middleware');
// 	  res.status(500).json({ msg: 'Server Error' });
// 	}
//   };
  