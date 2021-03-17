import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idString: String,
    title: String,
    creator: String,
    filename: String,
    visionApiOutputText: String,
    fileCloudStorageName: String,
    visionApiOutputCloudStorageName: String,
});

var PostSchemaMongo = mongoose.model('PostSchemaMongo', postSchema);

export default PostSchemaMongo;