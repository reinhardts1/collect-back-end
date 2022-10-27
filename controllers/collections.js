import { Profile } from "../models/profile.js"
import { Collection } from "../models/collection.js"


const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const collection = await Collection.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { collections: collection } },
      { new: true }
    )
    collection.owner = profile
    res.status(201).json(collection)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const collections = await Collection.find({})
      .populate('owner')
      .sort({ createdAt: 'desc' })
    res.status(200).json(collections)
  } catch (error) {
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate('owner')
      .populate('ratings.author')
    res.status(200).json(collection)
  } catch (error) {
    res.status(500).json(error)
  }
}



export {
  create,
  index,
  show
}



