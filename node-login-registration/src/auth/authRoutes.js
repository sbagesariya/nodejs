
var router = require('express').Router();
const AuthMiddleWare = require('../middleware/auth');
const SignInContoller = require('./signin/signInController');


router.get('/', (req, res)=> {
    res.send({
        status: 0,
        data: {},
        message: 'Practical demo test running...'
    });
});

router.post('/signin', new SignInContoller().login);
router.get('/list',AuthMiddleWare(), new SignInContoller().getUserList);

if (process.env.NODE_ENV !== 'production') {
    require('../util/swagger')(router);
}
module.exports = router;
