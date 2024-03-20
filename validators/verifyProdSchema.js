const { z } = require("zod");

// Creating an object schema.

const imgSchema = z.object({

    width: z
        .number({
            required_error:"Width is required",
            invalid_type_error: "Width must be a number"
        })
        .positive().safe().finite(),

    height: z
        .number({
            required_error:"Height is required",
            invalid_type_error: "Height must be a number"
        })
        .positive().safe().finite(),

    url: z
        .string({
            required_error:"URL is required",
            invalid_type_error: "URL must be a string"
        }).url({ message: "Invalid URL" })
        .min(10, {message: "URL must be of atleast 10 characters." })
        .max(2048, {message: "URL cannot be more than 2048 characters." }),

    filename: z
        .string({
        required_error:"Filename is required",
        invalid_type_error: "Filename must be a string"
        })
        .trim()
        .min(3, {message: "Filename must be of atleast 3 characters." })
        .max(255, {message: "Filename cannot be more than 255 characters." }),

    size: z
        .number({
            required_error:"size is required",
            invalid_type_error: "size must be a number"
        })
        .positive().safe().finite(),

    main: z
        .boolean({
            invalid_type_error: "Main Image must be a boolean value"
        }).optional(),

    type: z
        .string({
        required_error:"Type is required",
        invalid_type_error: "Type must be a string"
        })
        .trim()
        .min(3, {message: "type must be of atleast 3 characters." }),
})

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

    company: z.enum(["apple", "samsung", "dell", "nokia", "lenova", "rolex", "asus"]),

    price: z
        .number({
            required_error:"Price number is required",
            invalid_type_error: "Price must be a number"
        })
        .positive().safe().finite().gte(1.00),

    colors: z.array(z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)),

    description: z
        .string({
            invalid_type_error: "Description must be a string"
        })
        .trim()
        .min(20, {message: "Description must be of atleast 20 characters." }).optional(),

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
            invalid_type_error: "Featured must be a boolean value"
        }).optional(),

    stock: z
        .number({
            required_error:"Stock is required",
            invalid_type_error: "Stock must be a number"
        })
        .positive().safe().finite().gte(1),

    reviews: z
        .number({
            invalid_type_error: "Reviews must be a number"
        })
        .safe().finite().gte(0).optional(),

    stars: z
        .number({
            invalid_type_error: "Stars must be a number"
        })
        .safe().finite().gte(0.0).optional(),

    numRatings: z
        .number({
            invalid_type_error: "Number of Ratings value must be a number"
        })
        .safe().finite().gte(0).optional(),

    shipping: z
        .boolean({
            invalid_type_error: "Shipping must be a boolean value"
        }).optional(),

    image: z.array(imgSchema),

    createdAt: z.date().optional()
});

module.exports = prodSchema;