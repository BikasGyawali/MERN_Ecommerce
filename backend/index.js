const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/userRouter");
const itemRoutes = require("./routes/itemRouter");
// const cartRoutes = require("./routes/cartRouter");
const orderRoutes = require("./routes/orderRouter");
const paymentRoutes = require("./routes/paymentRouter");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/Images", express.static("./Images"));

app.use("/api", userRoutes);
app.use("/api", itemRoutes);
//app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

// if(process.env.NODE_ENV === 'development') {
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname,'client','build','index.html'));
//     });
// }

const dbURI = "mongodb://localhost:27017/fitnessecommerce";
const port = process.env.PORT || 4000;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () =>
      console.log(`Server running on http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));
