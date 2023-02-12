import UserController from "./userController.js"
import docModel from "../models/Docs.js"

class DocController {
    static uploadtext = async (req, res) => {
        // var path= require('path')
        var obj = new docModel({
            name: req.body.name,
            desc: req.body.desc,
            email: UserController.user_mail,
            visibility: req.body.visibility,
            tag: "docfile"
        })
        console.log(obj)
        await docModel.create(obj, (err, item) => {
            if (err) {
                console.log(err)
            } else {
                // item.save();
                // console.log(item)
                res.redirect('/docupload');
            }
        });
    }
    static displaytext = async (req, res) => {
        try {
            const prividata = await docModel.find({
                tag: "docfile",
                visibility: "private",
                email: UserController.user_mail
            });
            // console.log(prividata)
            const pubdata = await docModel.find({
                tag: "docfile",
                visibility: "public"
            })
            // console.log(pubdata)
            res.render('uploadDoc', {
                items: pubdata,
                privitems: prividata,
                orgemail:UserController.user_mail
            })
        } catch (err) {
            console.log(err)
        }
    }

    static deletetext = async (req, res) => {
        docModel.findByIdAndRemove(req.params.id, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                // console.log(docs);
                res.redirect('/docupload')
            }
         });
    }
}
export default DocController;
