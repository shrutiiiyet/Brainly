import mongoose, { model, Schema } from 'mongoose';

const UserSchema = new Schema ({
    username: {type: String, unique: true},
    password: String
})

export const UserModel = model("User", UserSchema);



const ContentSchema = new Schema ({
    title: String,
    link: String,
    type: String,
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
})

// const contentTypes = ['image', 'video', 'article', 'audio'];
// const ContentSchema = new mongoose.Schema({
//     link: { 
//         type: String, 
//         required: true },
//     type: { 
//         type: String, 
//         enum: contentTypes, 
//         required: true },
//     title: { 
//         type: String, 
//         required: true },
//     tags: [{
//          type: mongoose.Schema.Types.ObjectId, 
//          ref: 'Tag' }],
//     userId: { 
//         type:mongoose.Schema.Types.ObjectId, 
//         ref: 'User',
//          required: true },
// }, {timestamps:true})
 export const ContentModel = model("Content", ContentSchema);



const TagSchema = new Schema({
    title: { 
      type: String, 
      required: true, 
      unique: true },
  },
  {timestamps:true});
  
export const TagModel = mongoose.model("Tag", TagSchema);
  


const LinkSchema = new Schema({
    hash: String,
    userId: { 
        type: mongoose.Types.ObjectId,
         ref: 'User', required: true,
         unique: true
        },
},
{timestamps:true})
export const LinkModel = mongoose.model("Links ",LinkSchema)