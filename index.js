const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT;

const partyRoutes = require("./routes/partyRoute");
const characterRoutes = require("./routes/characterRoute");


app.use('/', partyRoutes);
app.use('/', characterRoutes);

app.listen(PORT, () => {
    console.log(`we're live ${PORT}`)
});