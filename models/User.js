import mongoose from 'mongoose'

// Defining Schema
const userSchema = new mongoose.Schema({
 name: { type: String, trim: true },
 email: { type: String, trim: true, unique:true,sparse:true},
 password: { type: String, trim: true },
 img:
	{
		data: Buffer,
		contentType: String
	},
 role: {type:String,trim:true,default:"user"},
 join: { type: Date, default: Date.now },
 tag: {type : String ,default: "userid" }
})

// Compiling Schema
const UserModel = mongoose.model('user', userSchema)


export default UserModel