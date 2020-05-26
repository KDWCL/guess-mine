// const AWS = require("aws-sdk");
// AWS.config.update({ region: "us-east-1" });

// exports.handler = () => {
//   const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
//   const params = {
//     TableName: "mintable",
//     Key: {
//       partiA: {
//         S: "0001",
//       },
//     },
//   };

//   const promise = new Promise((res, rej) => {
//     dynamodb.getItem(params, (err, data) => {
//       if (err) {
//         rej(err, err.stack);
//       } else {
//         res(data);
//       }
//     });
//   });

//   const response = promise
//     .then((data) => JSON.stringify(data))
//     .then((jsonData) => {
//       return { body: jsonData, status: 200 };
//     })
//     .catch((rej) => {
//       console.error(rej);
//     });

//   return response;
// };

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

exports.handler = async () => {
  const dynamodb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
  const params = {
    TableName: "mintable",
    Key: {
      partiA: {
        S: "0001",
      },
    },
  };

  const promise = new Promise((res, rej) => {
    dynamodb.getItem(params, (err, data) => {
      if (err) {
        rej(err, err.stack);
      } else {
        res(data);
      }
    });
  });

  const jsonData = await promise;

  console.log(jsonData);
  console.log(1);
};
