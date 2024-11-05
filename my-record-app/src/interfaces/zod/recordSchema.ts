import {z} from "zod";

const recordSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    age: z
        .number({message: "Age must be a number"})
        .int({ message: "Age must be an integer" })
        .min(16, { message: "Age must be at least 16" }),
    email: z.string().email({ message: "Invalid email address" }),
    question: z.string().min(1, { message: "Question is required" }),
});

export default recordSchema;