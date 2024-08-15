import {Schema, models, model} from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        require: true,
        max: 500,
        min: 2,
        unique: true, // Ensures the slug is unique
    },
    slug: {
        type: String,
        required: true,
        unique: true, // Ensures the slug is unique
    },
    status: {
        type: Number,
        default: 0, // Using Boolean for status (true/false)
    },
},
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Middleware to update `updatedAt` on document update
CategorySchema.pre("save", function (next) {
    if (this.isModified()) {
      this.updatedAt = new Date();
    }
    next();
});

const Category = models.Category || model('Category', CategorySchema);
export default Category;


