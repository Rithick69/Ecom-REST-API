const { z } = require("zod");

// Creating an object schema.

const prodSchema = z.object({
    id: z
        .string({
            required_error:"ID is required",
            invalid_type_error: "ID must be a string"
        })
        .trim()
        .min(8, {message: "ID must be of atleast 8 characters." })
        .max(20, {message: "ID cannot be more than 20 characters." }),
    name: z
        .string({
            required_error:"Name is required",
            invalid_type_error: "Name must be a string"
        })
        .trim()
        .min(3, {message: "Name must be of atleast 3 characters." })
        .max(255, {message: "Name cannot be more than 255 characters." }),
    price: z
        .number({
            required_error:"Price number is required",
            invalid_type_error: "Price must be a number"
        })
        .positive().safe().finite().gte(1.00),
    description: z
        .string({
            required_error:"Description is required",
            invalid_type_error: "Description must be a string"
        })
        .trim()
        .min(10, {message: "Description must be of atleast 10 characters." }),
    category: z
        .string({
            required_error:"Category is required",
            invalid_type_error: "Category must be a string"
        })
        .trim()
        .min(3, {message: "Category must be of atleast 3 characters." })
        .max(255, {message: "Category cannot be more than 255 characters." }),
    featured: z
        .boolean({
            required_error:"Featured is required",
            invalid_type_error: "Featured must be a boolean value"
        }),
    stock: z
        .number({
            required_error:"Stock is required",
            invalid_type_error: "Stock must be a number"
        })
        .positive().safe().finite().gte(1),
    reviews: z
        .number({
            required_error:"Reviews is required",
            invalid_type_error: "Reviews must be a number"
        })
        .safe().finite().gte(0),
    stars: z
        .number({
            required_error:"Stars is required",
            invalid_type_error: "Stars must be a number"
        })
        .safe().finite().gte(0.0),
    shipping: z
        .boolean({
            required_error:"Shipping is required",
            invalid_type_error: "Shipping must be a boolean value"
        }),
});

module.exports = prodSchema;