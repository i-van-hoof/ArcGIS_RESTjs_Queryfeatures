const express = require('express');




const router = express.Router();

router.get('/', (req, res, next) => {
console.log('GET request in basic-routes');
res.json({message: 'request works'});
});

module.exports = router;