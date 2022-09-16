const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary')
// const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// app.use(cors({
//     origin: true,
//     credentials: true
// }))
app.use(cookieParser())
app.use(express.static('./dist/subarts'));


const mongooseUrl = process.env.MONGOOSE_URL
mongoose.connect(
    mongooseUrl
)
    .then(() => console.log('connected'))
    .catch(e => console.log(e));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const schema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    catagory: { type: String },
    subcatagory: { type: String },
    quantity: { type: Number },
    details: { type: String },
    image: { type: String },
    public_id: { type: String }
})
const Product = mongoose.model('Product', schema)
const orderSchema = new mongoose.Schema({
    name: { type: String },
    phonenumber: {type: String},
    email: {type: String},
    quantity: {type: String},
    date: {type: String},
    productid: {type: String},
    productname: {type: String},
    productcatagory: {type: String},
    productsubcatagory: {type: String}
})
const Order = mongoose.model('Order', orderSchema)


app.get('/api/products', async (req, res) => {
    try {

        const items = await Product.find()
        res.json(items)
    } catch (error) {
        console.log(error)
    }
})
app.get('/api/products/limit', async (req, res) => {
    try {
        const items = await Product.find().sort({ _id: -1 }).limit(req.query._limit)
        res.json(items)
    } catch (error) {
        console.log(error)
    }
})

app.get('/api/products/catagory', async (req, res) => {
    try {
        const items = await Product.find({ catagory: req.query.catagory, subcatagory: req.query.subcatagory }).sort({ _id: -1 }).limit(req.query._limit)
        res.json(items)
    } catch (error) {
        console.log(error)
    }
})

app.get('/api/products/id', async (req, res) => {
    try {
        const items = await Product.findOne({ _id: req.query.id })
        res.json([items])
    } catch (error) {
        console.log(error)
    }
})

app.post('/api/products', async (req, res) => {
    try {
        const base64image = req.body.image
        const my_cloud = await cloudinary.uploader.upload(base64image)
        const image = my_cloud.secure_url
        const public_id = my_cloud.public_id
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            catagory: req.body.catagory,
            subcatagory: req.body.subcatagory,
            quantity: req.body.quantity,
            details: req.body.details,
            image: image,
            public_id: public_id
        })
        product.save()
        res.json({
            status: 200
        })
    } catch (error) {
        console.log(error)
    }

})

app.delete('/api/products', async (req, res) => {
    try {
        const id = req.query.id
        const ac = await Product.findOne({ _id: id })
        await Product.findByIdAndDelete(id)
        await cloudinary.uploader.destroy(ac.public_id)
        res.json({
            status: 200
        })
    } catch (error) {
        res.json({
            status: 404
        })
    }

})

app.get('/api/searchproduct', async (req, res) => {
    try {
        const i = await Product.findOne({ _id: req.query.id })
        res.json({
            product: i,
            status: 200
        })
    } catch (error) {
        res.json({
            product: '',
            status: 404
        })
    }
})

app.put('/api/product', async (req, res) => {
    try {
        await Product.updateOne(
            {
                _id: req.body.data.id
            },
            {
                name: req.body.data.name,
                price: req.body.data.price,
                catagory: req.body.data.catagory,
                subcatagory: req.body.data.subcatagory,
                quantity: req.body.data.quantity,
                details: req.body.data.details,
            }
        )
        res.json({
            status: 200
        })
    } catch (error) {
        res.json({
            status: 404
        })
    }
})

app.post('/api/isadmin', async (req, res) => {
    try {

        const cookie = req.cookies.satoken
        const adminkey = process.env.ADMIN_KEY
        if (cookie === adminkey) {
            res.json(true)
            return
        }
        res.json(false)
    } catch (error) {
        console.log(error)
    }
})

app.post('/api/login', async (req, res) => {
    try {

        const key = req.body.key
        const adminkey = process.env.ADMIN_KEY
        if (key === adminkey) {
            res.cookie('satoken', adminkey).json(true)
            return
        }
        res.json(false)
    } catch (error) {
        console.log(error)
    }
})

app.post('/api/order', async(req, res)=>{
    try {
    const id = req.body.productid
    const product = await Product.findOne({_id: id})

        
    const name = req.body.name
    const email = req.body.email
    const phonenumber = req.body.phonenumber
    const quantity = req.body.quantity
    const date = new Date().toLocaleDateString()
    const order = new Order({
        name: name,
        email: email,
        phonenumber: phonenumber,
        quantity: quantity,
        date: date,
        productid: product._id,
        productname: product.name,
        productcatagory: product.catagory,
        productsubcatagory:  product.subcatagory
    })
    order.save()
    res.json('Thank You, Our staff will contact you soon!')
    } catch (error) {
        console.log(error)
    }
})

app.get('/api/orders', async(req, res)=>{
    try {
        const orders = await Order.find().sort({_id: -1})
        res.json(orders)
    } catch (error) {
        console.log(error)
    }
})

app.get('*', (req, res) =>
    // res.sendFile('index.html', { root: 'dist/subhanarts/' })
    res.sendFile(path.join(__dirname, 'dist/subarts/index.html'))
);


app.listen(process.env.PORT || 4300, () => {
    console.log('Server listening on PORT 4000')
})