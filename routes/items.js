const express = require('express')
const Item = require('../item')
const router = express.Router()

router.get('',(req,res,next) => {
    try{
        return res.json({items : Item.showItems()})
    }
    catch(error){
        return next(error)
    }
})

router.post('',(req,res,next) => {
    try{
        let newItem = new Item(req.body.name, req.body.price)
        return res.json({item : newItem})
    }
    catch(error){
        return next(error)
    }
})

router.get('/:name', (req,res,next) => {
    try{
        let findItem = Item.showItem(req.params.name)
        return res.json({item : findItem})
    }
    catch(error){
        return next(error)
    }
})

router.patch('/:name', (req,res,next) => {
    try{
        let updateItem = Item.updateItems(req.params.name, req.body)
        return res.json({item: updateItem})
    }
    catch(error){
        return next(error)
    }
})

router.delete('/:name', (req,res,next) => {
    try{
        Item.removeItem(req.params.name)
        return res.json({message: `Item deleted`})
    }
    catch(error){
        return next(error)
    }
})

module.exports = router