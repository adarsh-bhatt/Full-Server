import { log } from 'node:console'
import fs from 'node:fs'


//Write

fs.writeFileSync("test.txt","Hello this is text file")

//read
const data = fs.readFileSync("test.txt","utf-8")
console.log(data);


//append

fs.appendFileSync("test.txt","\nthis is text 2")


fs.mkdirSync("myfolder/innerfolder")