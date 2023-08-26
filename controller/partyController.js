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

exports.updateProsperity = async (req, res) => {
    try {
        await knex('party').where({party_id: req.body.party_id}).update({prosperity_points: req.body.prosperity_points});
        res.status(204).send(`party with id: ${req.body.party_id} prosperity points has been updated`);


    } catch (err) {
        res.status(400).send(`Error updating party prosperity ${err}`);
    }
}

exports.displayProsperity = async (req, res) => {
    try {
        const data = await knex('party').where({ party_id: req.params.id });

        if(!data.length) {
            return res.status(404).send(`Player with id: ${req.params.id} is not a valid player`);
        } else {
            res.status(200).json(data[0].prosperity_points);
        }


    } catch (err) {
        res.status(400).send(`Error retrieving Player: ${err}`);
    }
}

