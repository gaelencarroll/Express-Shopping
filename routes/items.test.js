process.env.NODE_ENV = "test";

const app = require('../app')
const request = require('supertest')
let items = require('../fakeDb');

let item = {name : 'shoe', price: 50}

beforeEach(async function() {
    items.push(item)
})

afterEach(async function() {
    items = []
})

describe('GET /items', async function(){
    test('Show list of all items', async function(){
        const res = await request(app).get('/items')
        const {items} = res.body
        expect(res.statusCode).toBe(200)
        expect(res.body.item.name).toEqual(`${item.name}`)
        expect(items).toHaveLength(1)
    })
})

describe('GET /items:name', async function(){
    test('Show a single item', async function(){
        const res = await request(app).get(`/items/${item.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.item).toEqual(item)
    })
})

describe('POST /items', async function(){
    test('Add new item', async function(){
        const res = await request(app).post('/items').send({name: 'jeans', price: 75})
        expect(res.statusCode).toBe(200)
        expect(res.body.item.name).toEqual('jeans')
        expect(res.body.item.price).toEqual(75)
        expect(res.body.item.name).toHaveProperty('name')
        expect(res.body.item.price).toHaveProperty('price')
    })
})

describe('PATCH /items/:name', async function(){
    test('Update selected item', async function(){
        const res = await request(app).patch(`/items/${item.name}`).send({name: 'sneakers'})
        expect(res.statusCode).toBe(200)
        expect(res.body.item).toEqual({name: 'sneakers'})
    })
})

describe('DELETE /items/:name', async function(){
    test('Delete selected item', async function(){
        const res = await request(app).delete(`/items/${item.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message: 'Item deleted'})
    })
})