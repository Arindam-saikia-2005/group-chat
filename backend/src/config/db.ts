import mongoose  from "mongoose"


 const connectDb = async() => {
    const mongodb_uri = process.env.MONGODB_URI

    if(!mongodb_uri) {
        throw new Error("Please put a valid mongodb url ")
    }
     try {
       await mongoose.connect(mongodb_uri)
       .then(() =>{
        console.log("mongodb connected successfully")
       })     
    } catch (error:any) {
      console.error(error.message)  
    }
 }

 export default connectDb()