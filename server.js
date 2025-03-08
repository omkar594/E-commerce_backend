const { connectDB } = require("./config/db");
const app = require("./index");


const PORT = 5454;
app.listen(PORT,async()=>{
    await connectDB(); 
    console.log("server is runnig on ",PORT)
})