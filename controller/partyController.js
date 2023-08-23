require('dotenv').config;
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
            prosperity: 1,
            reputation: 1
        }

        const data = await knex('party').insert(newParty);

        res.status(201).send();
        

    } catch(err) {
        res.status(400).send(`Error creating new party ${err}`);
    }
}

exports.loginParty = async (req, res) => {

}

