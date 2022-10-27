import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ratingSchema = new Schema(
  {
    rating: {
      type: String,
      required: true
    },
    author: { type: Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)
const collectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Movies', 'Shows', 'Games', 'Sports', 'Artists', 'Albums'],
    },
    ratings: [ratingSchema],
    owner: { type: Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const Collection = mongoose.model('Collection', collectionSchema)

export { Collection }