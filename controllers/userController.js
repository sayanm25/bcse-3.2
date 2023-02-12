import UserModel from '../models/User.js'
import imageModel from '../models/Image.js'
import bcrypt from 'bcrypt'

import path from 'path'
import __dirname from '../paths.js'
import fs from 'fs'

class UserController {
  static user_mail = ''
  static hashid = ''
  static user_roll = ''
  static home = (req, res) => {
    res.render("index")
  }
  static registration = (req, res) => {
    res.render("registration")
  }

  static handlePasswordHashing = (plainPassword, salt) => {
    let hashed = bcrypt.hashSync(plainPassword, salt)

    if (hashed.includes("/")) {
      hashed = this.handlePasswordHashing(plainPassword, salt)
    }

    return hashed
  }

  static createUserDoc = async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, 10)

    // Creating New Document using Model
    const doc = new UserModel({
      name: req.body.name,
      email: req.body.email,
      img: {
        data: fs.readFileSync(path.join(__dirname, '/uploads/' + req.file.filename)),
        contentType: 'image/png'
      },
      role:"user",
      password: hashPassword,
    })
    // saving document
    await UserModel.create(doc, (err, item) => {
      if (err) {
        console.log(err)
      } else {
        // item.save();
        // console.log(item)
        res.redirect('/login');
      }
    });
    // res.redirect('/login')

  }

  static login = (req, res) => {
    res.render("login")
  }



  static verifyLogin = async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body
      const result = await UserModel.findOne({
        email: email
      })
      // console.log(result)
      if (result != null) {
        const isMatch = await bcrypt.compare(password, result.password)
        if (result.email == email && isMatch) {
          this.user_mail = email
          // const user_idsec=await UserModel.findOne({email:email})
          // this.hashid = await bcrypt.hash(this.user_mail, 6)
          this.hashid = this.handlePasswordHashing(this.user_mail, 6)
          this.user_roll=result.role
          req.session.user_id = result._id
          res.redirect('/dashboard')
        } else {
          res.send("<h1>Email or Password is not Valid</h1>")
        }
      } else {
        res.send("<h1>You are not a Registered User</h1>")
      }
    } catch (error) {
      console.log(error)
    }
  }

  static dashboard = async (req, res) => {
    try {
      // const email=req.email
      const result = await UserModel.findOne({
        email: this.user_mail
      })
      res.render("dashboard", {
        userdata: result
      })

    } catch (error) {
      console.log(error)
    }
  }



  static deleteImg = async (req, res) => {


    imageModel.findByIdAndRemove(req.params.id, function (err, docs) {
      if (err) {
        console.log(err)
      } else {
        // console.log(docs);
        res.redirect('/upload')
      }
    });

  }

  static displayImg = async (req, res) => {
    //   imageModel.find({ tag : "imagefile" , visibility:"private"}, (err, items) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('An error occurred', err);
    //     }
    //     else {
    //         // console.log(items)
    //         res.render('uploadImage', { items: items });
    //     }
    // });

    try {
      if (this.user_roll=="manager"){
        var prividata = await imageModel.find({
          tag: "imagefile",
          visibility: "private"
          
        });
      } else {
        var prividata = await imageModel.find({
          tag: "imagefile",
          visibility: "private",
          email: this.user_mail
        });
      }
      
      // console.log(prividata)
      const pubdata = await imageModel.find({
        tag: "imagefile",
        visibility: "public"
      })
      // console.log(pubdata)
      res.render('uploadImage', {
        items: pubdata,
        privitems: prividata,
        orgemail:this.user_mail
      })
    } catch (err) {
      console.log(err)
    }

  }
  static uploadImg = async (req, res) => {
    // var path= require('path')
    const obj = new imageModel({
      name: req.body.name,
      desc: req.body.desc,
      email: this.user_mail,
      visibility: req.body.visibility,
      img: {
        data: fs.readFileSync(path.join(__dirname, '/uploads/' + req.file.filename)),
        contentType: 'image/png'
      },
      tag: "imagefile"
    })
    imageModel.create(obj, (err, item) => {
      if (err) {
        console.log(err)
      } else {
        // item.save();
        // console.log(item)
        res.redirect('/upload');
      }
    });
  }


}

export default UserController