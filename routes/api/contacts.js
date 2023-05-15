// Import
const express = require('express')
const data = require("../../models/contacts")
const router = express.Router()
const {HttpError} = require("../../models/HttpError")
const Joi = require("joi")
const addSchema = Joi.object({
  name:Joi.string().required(),
  email:Joi.string().required(),
  phone:Joi.string().required(),
})

// Get list
router.get("/", async (req, res, next)=> {
  try {
  const result = await data.listContacts();
  res.json(result);
}
catch(error) {
  next(error);
}
})

// Get by id
router.get("/:id", async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await data.getContactById(id);
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  catch (error) {
    next(error);
  }
})

// Post
router.post("/", async(req, res, next)=> {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const result = await data.addContact(req.body);
    res.status(201).json(result);
  }
  catch(error) {
    next(error);
  }
})

// Delete
router.delete('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

// Put
router.put('/:id', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const {id} = req.params;
    const result = await data.updateContact(id, req.body);
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  catch(error) {
    next(error);
  }
})

module.exports = router
