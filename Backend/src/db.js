import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/mernd');
        console.log ("se conecto correctamente")
    } catch (error) {
        console.log(error);
    }
};
