import mongoose from "mongoose"

const docSchema = new mongoose.Schema({

    name:{type:String, trim: true},
    email: {type:String, trim: true},
    desc: {type:String,trim: true},
    visibility:{type:String},
    tag:{type:String}
})

const docModel = mongoose.model('textdoc', docSchema)

export default docModel
