const Product = require("../models/product.js");
const slugify = require("slugify");
const handleFileUpload=require("../middlewares/handleFileUpload");
const upload = require("../middlewares/multer");


exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping, stock, sold, discount } =
            req.body;
        const photo = req.files;

        // Validation
        if (
            !name?.trim() ||
            !description?.trim() ||
            !price?.trim() ||
            !category?.trim() ||
            !quantity?.trim() ||
            !shipping?.trim() ||
            !stock?.trim() ||
            !sold?.trim() ||
            !discount?.trim()
        ) {
            return res.json({ error: "All fields are required" });
        }

        // Create product
        const product = new Product({
            name,
            description,
            price,
            category,
            quantity,
            shipping,
            stock,
            sold,
            discount,
            slug: slugify(name),
        });

        // Handle photo upload
        if (photo) {
            const photoData = handleFileUpload(photo[0]);
            product.photo = photoData;
        }

        await product.save();
        res.json(product);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
};

exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });

        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getProductPhoto = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).select(
            "photo"
        );

        if (!product || !product.photo.data) {
            return res.status(404).json({ error: "Product photo not found" });
        }

        res.set("Content-Type", product.photo.contentType);
        res.set("Cross-Origin-Resource-Policy", "cross-origin");
        res.send(product.photo.data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.removeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.productId
        ).select("-photo");

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping, stock, sold, discount } =
            req.body;
        const { photo } = req.files;
        const productId = req.params.productId;

        // Validation
        if (
            !name?.trim() ||
            !description?.trim() ||
            !price?.trim() ||
            !category?.trim() ||
            !quantity?.trim() ||
            !shipping?.trim() ||
            !stock?.trim() ||
            !sold?.trim() ||
            !discount?.trim()
        ) {
            return res.json({ error: "All fields are required" });
        }

        // Find existing product
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Update product fields
        existingProduct.name = name;
        existingProduct.description = description;
        existingProduct.price = price;
        existingProduct.category = category;
        existingProduct.quantity = quantity;
        existingProduct.shipping = shipping;
        existingProduct.stock = stock;
        existingProduct.sold = sold;
        existingProduct.discount = discount;
        existingProduct.slug = slugify(name);

        // Handle photo upload
        if (photo) {
            const photoData = handleFileUpload(photo[0]);
            existingProduct.photo = photoData;
        }

        await existingProduct.save();
        res.json(existingProduct);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err.message });
    }
};
