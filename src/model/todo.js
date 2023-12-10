const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
		{//db relation userid (ref)
			//tk:{ type: String, required: true },
			action: { type: String, required: true },
		title: { type: String, required: true },
		date: { type: String, required: true },
		description: { type: String}
    
    }

)
const models = mongoose.model('UserSchema', UserSchema)

module.exports = models