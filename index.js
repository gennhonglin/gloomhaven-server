const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT;

const partyRoutes = require("./routes/partyRoute");


app.use('/', partyRoutes);

app.listen(PORT, () => {
    console.log(`we're live ${PORT}`)
});