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

const update = async (req, res) => {
  try {
    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('owner')
    res.status(200).json(collection)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.collections.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(collection)
  } catch (error) {
    res.status(500).json(error)
  }
}



export {
  create,
  index,
  show,
  update,
  deleteCollection as delete
}



