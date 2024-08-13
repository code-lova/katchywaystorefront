import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 300,
        min: 5
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{6,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 6-20 alphanumeric letters and be unique!"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    emailConfirmed: {
        type: Number, 
        default: 0 
    }, 
    emailConfirmationCode: { 
        type: String 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

//First we go to 'models' and if there is no User then we create a new User model using the UserSchema above
const User = models.User || model("User", UserSchema);
export default User;