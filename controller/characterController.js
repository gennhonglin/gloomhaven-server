require('dotenv').config();
const knex = require('knex')(require('../knexfile'));
const {v4: uuidv4} = require('uuid');

exports.newCharacter = async (req, res) => {
    try {
        const newChar = {
                party_id: req.body.party_id,
                class: req.body.class,
                character_name: req.body.character_name,
                exp: req.body.exp,
                gold: req.body.gold,
                perks: req.body.perks,
                head_gear: req.body.head_gear,
                body_gear: req.body.body_gear,
                left_hand_gear: req.body.left_hand_gear,
                right_hand_gear: req.body.right_hand_gear,
                boots_gear: req.body.boots_gear,
                small_item_one: req.body.small_item_one,
                small_item_two: req.body.small_item_two,
                small_item_three: req.body.small_item_three,
                small_item_four: req.body.small_item_four  
        }

        const data = await knex('character').insert(newChar);
        res.status(201).send();
    } catch (err) {
        res.status(400).send(`Error creating new character ${err}`);
    }

}

exports.getCharacters = async (req, res) => {
    try {
        const data = await knex('character').where({party_id: req.params.id});

        res.status(200).json(data);

    } catch (err) {
        res.status(400).send(`Error retrieving characters: ${err}`);
    }
}