
module.exports = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.userData || !allowedRoles.includes(req.userData.role)) {
      return res.status(403).json({ 
        message: 'Forbidden: You do not have permission to perform this action' 
      });
    }
    next();
  };
};
