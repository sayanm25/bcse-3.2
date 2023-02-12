import mongoose from 'mongoose';


var imageSchema = new mongoose.Schema({
	name: String,
	desc: String,
	email: String,
	visibility: String,
	img:
	{
		data: Buffer,
		contentType: String
	},
	tag: {type : String ,default: "imagefile" }
});

//Image is a model which has a schema imageSchema
const imageModel = mongoose.model('Image', imageSchema);

export default imageModel; 


