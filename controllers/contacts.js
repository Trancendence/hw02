const data = require("../models/contacts");
const { HttpError, ctrlWrapper } = require('../helpers');


// list
const list = async(req, res)=> {
const result = await data.list();
res.json(result);
}

// getById
const getById = async (req, res) => {
    const {id} = req.params;
    const result = await data.getContactById(id);
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

// addById
const addById = async(req, res)=> {
      const result = await data.addById(req.body);
      res.status(201).json(result);
    }

//   updateById
  const updateById = async (req, res) => {
    const {id} = req.params;
    const result = await data.updateById(id, req.body);
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
    }

// deleteById
 const deleteById = async (req, res) => {
    const {id} = req.params;
    const result = await data.removeContact(id);
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
    message: "contact deleted"
    })
    } 


module.exports = { 
    list: ctrlWrapper(list),
    getById: ctrlWrapper(getById),
    deleteById: ctrlWrapper(deleteById),
    addById: ctrlWrapper(addById),
    updateById: ctrlWrapper(updateById),
}