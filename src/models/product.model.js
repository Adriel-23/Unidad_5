import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    stock: {
        type: Number,
        default: 10
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
