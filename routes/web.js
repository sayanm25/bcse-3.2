import express from 'express'
const router = express.Router()
import UserController from '../controllers/userController.js'
import upload from '../controllers/imageController.js'
import DocController from '../controllers/docController.js'
import AuthVer from '../middlewares/auth.js'
const id = UserController.user_mail
const hashid = UserController.hashid
// const hashid = await bcrypt.hash(id, 9)


router.get('/', UserController.home)
router.get('/registration',AuthVer.isLogout,UserController.registration)
router.post('/registration', upload.single('image'),UserController.createUserDoc)
router.get('/login',AuthVer.isLogout,UserController.login)
router.post('/login', UserController.verifyLogin)

router.get('/docupload',AuthVer.isLogin,DocController.displaytext)
router.post('/docupload',DocController.uploadtext)
router.get('/deletedoc/(:id)',DocController.deletetext)

router.get('/upload',AuthVer.isLogin,UserController.displayImg)
router.post('/upload',upload.single('image'),UserController.uploadImg)
router.get('/delete/(:id)',UserController.deleteImg)



router.get('/dashboard',AuthVer.isLogin,UserController.dashboard)
router.get('/logout',AuthVer.isLogin,AuthVer.logout)

// router.post('/upload',upload.single('image'),UserController.uploadImg)

export default router
