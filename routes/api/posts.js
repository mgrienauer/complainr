const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post model
const Post = require("../../models/Post");
//Profile model
const Profile = require("../../models/Profile");

// validation
const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
//handle get resuests for /users path
router.get("/test", (req, res) => res.json({ msg: "Posts working" }));

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get("/", (req, res) => {
	//retrieve all psots
	Post.find()
		//sort in reverse chronological order
		.sort({ date: -1 })
		.then((posts) => res.json(posts))
		.catch((err) => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
	//retrieve a single post by its id
	Post.findById(req.params.id)
		.then((post) => res.json(post))
		.catch((err) =>
			res.status(404).json({ nopostsfound: "No posts found with that id" }),
		);
});

// @route   POST api/posts/test
// @desc    Create post
// @access  Private
router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// destructure errors and isvalid from validatePostInput function
		const { errors, isValid } = validatePostInput(req.body);

		//check validation
		if (!isValid) {
			//if any errors, send 400 with errors object
			return res.status(400).json(errors);
		}

		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			handle: req.body.handle,
			avatar: req.body.avatar,
			user: req.user.id,
		});
		//save the post to db and return post to frontend
		newPost.save().then((post) => res.json(post));
	},
);

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		//find the profile of the user making the delete request
		Profile.findOne({ user: req.user.id })
			// search their profile for the post by id
			.then((profile) => {
				Post.findById(req.params.id)
					.then((post) => {
						// if the post object's user id !== the user id sent by request, return error
						if (post.user.toString() !== req.user.id) {
							return res
								.status(401)
								.json({ notauthorized: "User not authorized" });
						}
						// once sure user making req is user who made post, delete
						post.remove().then(() => res.json({ success: true }));
					})
					// use error catching if unable to find post in db
					.catch((err) =>
						res.status(404).json({ postnotfound: "no post found" }),
					);
			});
	},
);

// @route   POST api/posts/like/:id
// @desc    Like a post by id
// @access  Private
router.post(
	"/like/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		//find the profile of the user making the delete request
		Profile.findOne({ user: req.user.id })
			// search their profile for the post by id
			.then((profile) => {
				Post.findById(req.params.id)
					.then((post) => {
						// if the post object's user id !== the user id sent by request, return error
						// we filter the post's likes array, if the like object has the user in it already,
						// we will return a 400 status that the user has already liked the post
						if (
							post.likes.filter((like) => like.user.toString() === req.user.id)
								.length > 0
						) {
							return res
								.status(400)
								.json({ alreadyliked: "User has already liked post" });
						}
						//if a user has disliked the post, remove them from the dislike array
						post.dislikes = post.dislikes.filter(
							(dislike) => dislike.user.toString() !== req.user.id,
						);
						// if user isn't already in the likes array, we will add thir id to beginning of array
						post.likes.unshift({ user: req.user.id });
						// save updated post to db
						post.save().then((post) => res.json(post));
					})
					// use error catching if unable to find post in db
					.catch((err) =>
						res.status(404).json({ postnotfound: "no post found" }),
					);
			});
	},
);

// @route   POST api/posts/like/:id
// @desc    disike a post by id
// @access  Private
router.post(
	"/dislike/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		//find the profile of the user making the delete request
		Profile.findOne({ user: req.user.id })
			// search their profile for the post by id
			.then((profile) => {
				Post.findById(req.params.id)
					.then((post) => {
						// if the post object's user id !== the user id sent by request, return error
						// we filter the post's likes array, if the like object has the user in it already,
						// we will return a 400 status that the user has already liked the post
						if (
							post.dislikes.filter(
								(dislike) => dislike.user.toString() === req.user.id,
							).length > 0
						) {
							return res
								.status(400)
								.json({ alreadydisliked: "User has already disliked post" });
						}
						//if a user has liked the post, remove them from the likes array
						post.likes = post.likes.filter(
							(like) => like.user.toString() !== req.user.id,
						);
						// if user isn't already in the likes array, we will add thir id to beginning of array
						post.dislikes.unshift({ user: req.user.id });
						// save updated post to db
						post.save().then((post) => res.json(post));
					})
					// use error catching if unable to find post in db
					.catch((err) =>
						res.status(404).json({ postnotfound: "no post found" }),
					);
			});
	},
);

// @route   POST api/posts/unlike/:id
// @desc    unLike a post by id
// @access  Private
router.post(
	"/unlike/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		//find the profile of the user making the delete request
		Profile.findOne({ user: req.user.id })
			// search their profile for the post by id
			.then((profile) => {
				Post.findById(req.params.id)
					.then((post) => {
						// if the post object's user id !== the user id sent by request, return error
						// we filter the post's likes array, if the like object has the user in it already,
						// we will return a 400 status that the user has already liked the post
						if (
							post.likes.filter((like) => like.user.toString() === req.user.id)
								.length === 0
						) {
							return res
								.status(400)
								.json({ notliked: "User has not liked post" });
						}
						// if user has already in the likes array, we will remove them from likes array
						post.likes = post.likes.filter(
							(like) => like.user.toString() !== req.user.id,
						);
						// save updated post to db
						post.save().then((post) => res.json(post));
					})
					// use error catching if unable to find post in db
					.catch((err) =>
						res.status(404).json({ postnotfound: "no post found" }),
					);
			});
	},
);

// @route   POST api/posts/undislike/:id
// @desc    undisLike a post by id
// @access  Private
router.post(
	"/undislike/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		//find the profile of the user making the delete request
		Profile.findOne({ user: req.user.id })
			// search their profile for the post by id
			.then((profile) => {
				Post.findById(req.params.id)
					.then((post) => {
						// if the post object's user id !== the user id sent by request, return error
						// we filter the post's likes array, if the like object has the user in it already,
						// we will return a 400 status that the user has already liked the post
						if (
							post.dislikes.filter(
								(dislike) => dislike.user.toString() === req.user.id,
							).length === 0
						) {
							return res
								.status(400)
								.json({ notliked: "User has not disliked post" });
						}
						// if user has already in the likes array, we will remove them from likes array
						post.dislikes = post.dislikes.filter(
							(dislike) => dislike.user.toString() !== req.user.id,
						);
						// save updated post to db
						post.save().then((post) => res.json(post));
					})
					// use error catching if unable to find post in db
					.catch((err) =>
						res.status(404).json({ postnotfound: "no post found" }),
					);
			});
	},
);

// @route   POST api/posts/comment/:id
// @desc    comment on a post by id
// @access  Private
router.post(
	"/comment/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		// destructure errors and isvalid from validatePostInput function
		const { errors, isValid } = validatePostInput(req.body);
		//check validation
		if (!isValid) {
			//if any errors, send 400 with errors object
			return res.status(400).json(errors);
		}

		//find the post in db by id
		Post.findById(req.params.id)
			.then((post) => {
				//create a newComment object with the data the user sends
				//in request and prepend it to the post's comments key (array)
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id,
				};
				//add new comment to comments array
				post.comments.unshift(newComment);
				//save to db and return post to frontend
				post.save().then((post) => res.json(post));
			})
			.catch((err) =>
				res.status(404).json({ postNotFound: "No post found..yeesh" }),
			);
	},
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    delete on a post by post id and comment id
// @access  Private
router.delete(
	"/comment/:id/:comment_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		//find the post in db by id
		Post.findById(req.params.id)
			.then((post) => {
				if (
					post.comments.filter(
						(comment) => comment._id.toString() === req.params.comment_id,
					).length === 0
				) {
					return res
						.status(404)
						.json({ commentNotExist: "Yikes...that comment does't exist" });
				}
				//filter post.comments to remove the user specified comment by id
				post.comments = post.comments.filter(
					(comment) => comment._id.toString() !== req.params.comment_id,
				);
				//save updated post to db and return to frontend
				post.save().then((post) => res.json(post));
			})
			.catch((err) =>
				res.status(404).json({ postNotFound: "No post found..yeesh" }),
			);
	},
);

module.exports = router;
