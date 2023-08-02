const items = require('./fakeDb')

class Item {
    constructor(name,price){
        this.name = name;
        this.price = price;
        items.push(this)
    }

    static updateItems(name,data){
        let item = Item.find(name)
        if(item === undefined){
            throw {message: `Item not found`, status: 404}
        }
        item.name = data.name
        item.price = data.price
        return item
    }

    static showItems(){
        return items
    }

    static showItem(name){
        const item = items.find(v => v.name === name)
        if(item === undefined){
            throw{message: `Item not found`, status: 404}
        }
        return item
    }

    static removeItem(name){
        let index = items.findIndex(v => v.name === name)
        if(index === -1){
            throw{message: `Item not found`, status: 404}
        }
        items.splice(index,1)
    }
}

module.exports = Item