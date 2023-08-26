require('dotenv').config();
const knex = require('knex')(require('../knexfile'));
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.newParty = async (req, res) => {
    try {

        const hashedPass = await bcrypt.hash(req.body.password, 10);

        const newParty =  {
            party_id: uuidv4(),
            email: req.body.email,
            party_name: req.body.party_name,
            password: hashedPass,
            prosperity_points: 1,
            reputation: 1
        }

        const data = await knex('party').insert(newParty);

        res.status(201).send();
        

    } catch(err) {
        res.status(400).send(`Error creating new party ${err}`);
    }
}

exports.loginParty = async (req, res) => {

    if(req.body.checkEmail) {
        let data = await knex('party').where({"email": req.body.email});

        if(data === null) {
            return res.status(400).send('Cannot find user');
        }

        try {
            if(await bcrypt.compareSync(req.body.password, data[0].password)) {
                const token = jwt.sign({data: data[0]}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "900s"});
                res.status(201).send(token);
            } else {
                res.send('Not Allowed');
            }
        } catch {
            res.status(500).send();
        }
    } else {
        let data = await knex('party').where({"party_name": req.body.party_name});

        if(data === null) {
            return res.status(400).send('Cannot find user');
        }

        try {
            if(await bcrypt.compareSync(req.body.password, data[0].password)) {
                const token = jwt.sign({data: data[0]}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "900s"});
                res.status(201).send(token);
            } else {
                res.send('Not Allowed');
            }
        } catch {
            res.status(500).send();
        }
    }
}

