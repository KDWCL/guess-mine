import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "view"));
app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));

const handleListening = () =>
  console.log(`Server running: http://localhost:${PORT}`);

app.get("/", (req, res) => res.render("home"));

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server); // 서버를 잡고 있는다.
// http://localhost:4000/socket.io/socket.io.js를 쳐보면 프론트엔드 코드가 나오게 된다.

io.on("connection", () => console.log("somebody connected"));

const AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"})

exports.handler =  (event) => {
    let dataA;

    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    const params = {
        TableName : "mintable",
        Key: {
            partiA: {
                S: "0001"
            }
        }
    };
    const getData = new Promise((res,rej)=>{
              dynamodb.getItem(params, function(err, data) {
            if (err) {
                console.log(err, err.stack); // an error occurred
            } else {
                    const response = {
                         statusCode: 200,
                         body: JSON.stringify(data)
            };
                        res(data)
                
            }
      }
      
        
    }


    
    return response;
            

};


 
