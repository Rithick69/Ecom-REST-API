const { z } = require("zod");

// Creating an object schema.

const signupSchema = z.object({
    username: z
        .string({
            required_error:"Name is required",
            invalid_type_error: "Name must be a string"
        })
        .trim()
        .min(3, {message: "Name must be of atleast 3 characters." })
        .max(255, {message: "Name cannot be more than 255 characters." }),
    email: z
        .string({
            required_error:"Email is required",
            invalid_type_error: "Email must be a string" })
        .trim()
        .email({message: "Invalid Email Address" })
        .min(3, {message: "Email must be of atleast 3 characters." })
        .max(255, {message: "Email cannot be more than 255 characters." }),
    phone: z
        .number({
            required_error:"Phone number is required",
            invalid_type_error: "Phone must be a number"
        }).positive().safe().finite().int(),
    password: z
        .string({
            required_error:"Password is required",
            invalid_type_error: "Password must be a string" })
        .trim()
        .min(7, {message: "Password must be of atleast 7 characters." })
        .max(1024, {message: "Password cannot be more than 1024 characters." }),
});

module.exports = signupSchema;