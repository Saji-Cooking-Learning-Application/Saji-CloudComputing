const express = require('express');
const multer = require('multer');
const {loginValidate} = require('../validation/loginSchema');
const {registerValidate} = require('../validation/registerSchema');
const {validate} = require('../middleware/validate');
const {register, login, refresh} = require('../controller/authController');
const {resep, resepDetailByID} = require('../controller/resepController');
const {bahan, bahanDetailByID} = require('../controller/bahanController');
const auth = require('../middleware/authentication');
const {tutorial} = require('../controller/tutorialController');
const {getProfile, updateProfile} = require('../controller/profileController');

const router = new express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    'message': 'Saji API is Running ! Before accessing our endpoints, please register or login first',
  });
});
router.post('/register', validate(registerValidate), register);
router.post('/login', validate(loginValidate), login);
router.post('/refresh', refresh);

router.get('/resep', auth, resep);
router.get('/resep/:id', auth, resepDetailByID);

router.get('/bahan', auth, bahan);
router.get('/bahan/:id', auth, bahanDetailByID);

router.get('/tutorial/:id', auth, tutorial);

router.get('/profile', auth, getProfile);

const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({storage: storage});
router.post('/profile', upload.single('foto'), auth, updateProfile);

module.exports = router;
