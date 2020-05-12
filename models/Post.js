const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create post schema
const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	text: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	handle: {
		type: String,
	},
	avatar: {
		type: String,
	},
	//add user id to array if theybe liked a post so they cant double like
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users",
			},
		},
	],
	//add user id to array if theybe liked a post so they cant double like
	dislikes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users",
			},
		},
	],
	//comments on a post include user,
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users",
			},
			text: {
				type: String,
				required: true,
			},
			name: {
				type: String,
			},
			avatar: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	//include date the post was made
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Post = mongoose.model("post", PostSchema);
