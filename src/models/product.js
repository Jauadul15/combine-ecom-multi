// Import the mongoose library
const mongoose = require("mongoose");

// Destructure the 'ObjectId' type from the mongoose.Schema object
const { ObjectId } = mongoose.Schema;

// Create a new mongoose Schema for the 'Product' collection
const productSchema = new mongoose.Schema(
    {
        // Define the 'name' field for the product with certain properties
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 160,
        },

        // Define the 'slug' field for the product with certain properties
        slug: {
            type: String,
            lowercase: true,
        },

        // Define the 'description' field for the product with certain properties
        description: {
            type: {},
            required: true,
            maxlength: 2000,
        },

        // Define the 'price' field for the product with certain properties
        price: {
            type: Number,
            trim: true,
            required: true,
        },

        // Define the 'discountPrice' field for the product with certain properties
        discount: {
            type: Number,
            required: [true, "Please enter your product price!"],
        },

        // Define the 'category' field for the product with certain properties
        category: {
            type: ObjectId, // References the 'ObjectId' type imported earlier
            ref: "Category", // Refers to the "Category" model in the database
            required: true,
        },

        // Define the 'quantity' field for the product with certain properties
        quantity: {
            type: Number,
        },

        // Define the 'sold' field for the product with a default value of 0
        sold: {
            type: Number,
            default: 0,
        },

        // Define the 'stock' field for the product with certain properties
        stock: {
            type: Number,
            required: [true, "Please enter your product stock!"],
        },

        // Define the 'photo' field for the product with a 'data' property of type 'Buffer'
        // and a 'contentType' property of type 'String'
        photo: {
            data: Buffer,
            contentType: String,
        },

        // Define the 'shipping' field for the product, which is optional (not required)
        shipping: {
            required: false,
            type: Boolean,
        },

    },

    // Additional options for the Schema
    { timestamps: true, versionKey: false }
);

// Create a Mongoose model called 'Product' based on the defined schema
const Product = mongoose.model("Product", productSchema);

// Export the 'Product' model to be used in other parts of the application
module.exports = Product;
