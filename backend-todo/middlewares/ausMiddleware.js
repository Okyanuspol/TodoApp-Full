export function authMiddleware(req,res, next) {
    const isLoggedIn = req.headers.authorization;
    if (isLoggedIn) {
      next()
    } else {
      res.status(401).send("Sorry");
    }
  }