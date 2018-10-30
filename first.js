const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const lil = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "learn"
});

lil.use(bodyParser.json());
lil.use(bodyParser.urlencoded({
	extended : false,
}));
lil.use(cors());

lil.get("/createtbl", (req, res) => {
  con.connect(function(err) {
    con.query("CREATE TABLE tb_name(id INT NOT NULL AUTO_INCREMENT ,name VARCHAR(255),location VARCHAR(255) , PRIMARY KEY(id)) ", function(err, result, fields) {
      res.send(result);
      console.log(err);
    });
  });
});


lil.get("/insertdataget/:name/:location", function(req,res){
	con.connect(function(err){
		con.query(`INSERT INTO tb_name(name,location) values('${req.params.name}','${req.params.location}')`, function(err,result){
			res.send(result);
			console.log(err);
		})
	})
});

lil.post("/insertdatapost",function(req,res){
	console.log(req);
			// if (req.body) {res.sendStatus(400)}
				// tr
	// con.connect(function(err,res){
	// 	// con.query(`INSERT INTO tb_name(name,location) values('${req.body.name}','${req.body.location}')`,function(err,result){
	// 	// 	res.send(result);
	// 	// 	console.log(err);
	// 	// });
	// })
	// Prepare output in JSON format
   // response = {
   //    first_name:req.body.txtname,
   //    last_name:req.body.txtnomor
   // };
   // console.log(req.body.txtname);
   // res.end(JSON.stringify(response));
});


const port = process.env.PORT || 4000;
lil.listen(port, () => console.log(`Listening on port ${port}`));