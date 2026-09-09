import 'dotenv/config'


import app from './src/app.js'
import connectDB from './src/common/config/db.js'
const PORT = process.env.PORT ||5000


const start = async () =>{

try {
connectDB()
app.listen(PORT,()=>{
console.log(`server is running at ${PORT} in ${process.env.NODE_ENV}`);


})


} catch (error) {
 console.error('Failed to Start', error)
    process.exit(1)
    
}

}


start()