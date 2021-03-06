var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blogger_app");

//MONGOOSE MODEL CONFIG...
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now},
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});
module.exports = mongoose.model("Blog", blogSchema);
