const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
require("dotenv").config();
const rootDirectory = path.normalize(`${__dirname}`);
app.set('uploadDirectory', `${rootDirectory}/public/upload`);
const port = process.env.PORT || 9999;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, app.get('uploadDirectory'));
  },
  filename(req, file, callback) {
    // remain original file name
    callback(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(rootDirectory, '/public')));
app.use(multer(upload).any());
app.set('appPath', `${rootDirectory}/public`);



const shurjopay = require("shurjopay")();


//When you use this application in live with live Credential, please uncomment shurjopay.islive()
// shurjopay.is_live()

with(process.env){
  shurjopay.configure_merchant(
    SP_CLIENT_ID,
    SP_CLIENT_SECRET,
    SP_STORE_ID,
    SP_CLIENT_KEY_PREFIX,
    DEFAULT_CURRENCY
  );

}

app.post("/take-payment", (req, res) => {
  const orderDetails = {
    "amount":1000,
    "order_id":"00001",
    "customer_name":"Shanto",
    "customer_address":"222",
    "client_ip": "102.324.0.5",
    "customer_phone":"1111",
    "customer_city":"123",
    "customer_post_code":"123",
  };
  const payload={
    ...orderDetails,
    "return_url": "http://localhost:9999/success",
    "cancel_url": "http://localhost:9999/cancel",
    client_ip: req.ip
  }
  shurjopay.gettoken_error_handler = function (error) {
    shurjopay.log(error.message, "error");
    res.status(400).send({ status: false, error: "Something went wrong!" });
  };
  shurjopay.checkout_error_handler = function (error) {
    shurjopay.log(error.message, "error");
    res.status(400).send({ status: false, error: "Something went wrong!" });
  };

  try {
   shurjopay.checkout(payload, (response_data) => {
     console.log('response_data', response_data)
     res.redirect(response_data.checkout_url)
      //res.status(200).send(response_data);
    });
  } catch (err) {
    shurjopay.log(err.message, "error");
    res.status(400).send({ status: false, error: err.message });
  }

});

app.post("/verify-payment", (req, res) => {
  //you can send sp_order_id by query or body or params
  const order_id = req.body.sp_order_id;
  try {
    shurjopay.verify(
      order_id,
      (response_data) => {
        res.status(200).send(response_data);
      },
      (error) => {
        shurjopay.log(error.message, "error");
        res.status(400).send({ status: false, error: error.message });
      }
    );
  } catch (err) {
    shurjopay.log(err.message, "error");
    res.status(400).send({ status: false, error: err.message });
  }
});


app.post("/payment-status-update", (req, res) => {
  //you can send sp_order_id by query or body or params
  const order_id = req.query.sp_order_id;;
  try {
    shurjopay.verify(order_id, (response_data) => {
      console.log(response_data[0])
      res.status(200).send(response_data);
    },
    (error) => {
      shurjopay.log(error.message, "error");
      res.status(400).send({ status: false, error: error.message });
    });
  } catch (err) {
    shurjopay.log(err.message, "error");
    res.status(400).send({ status: false, error: err.message });
  }
});





app.get("/payment", (req, res) => {
  res.sendFile(`${app.get('appPath')}/payment.html`);
});

app.get("/success", (req, res) => {
  res.sendFile(`${app.get('appPath')}/success.html`);
});

app.get("/cancel", (req, res) => {
  res.sendFile(`${app.get('appPath')}/success.html`);
});

app.get("/image", (req, res) => {
  res.sendFile(`${app.get('appPath')}/imageUpload.html`);
});


app.post('/register', (req, res) => {

  let pieces = req.headers.host.split(':');
  let hostname = pieces.length > 1 ? (req.host + ':' + pieces[1]) : req.host;

  const payload = req.body;
  let fileInput = req.files[0];
  res.redirect('/image');
})

app.listen(port, () => {
  console.log("Server running at port", port);
});
