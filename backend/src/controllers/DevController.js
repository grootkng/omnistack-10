const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    await Dev.find()
      .then(resp => {
        response.status(200).json({
          error: false,
          data: resp.map(e => {
            return e;
          })
        })
      })
      .catch(err => {
        response.status(400).json({
          error: true,
          errorMessage: err
        })
      })
  },
  async store(request, response) {
    const {
      github_username,
      techs,
      latitude,
      longitude
    } = request.body;

    await Dev.findOne({
        github_username
      })
      .then(async resp => {
        if (!resp || resp == null || resp == undefined) {
          const apiResponse = await axios.get(`https://api.github.com/users/${ github_username }`);
          const {
            name = login, avatar_url, bio
          } = apiResponse.data;

          const techsArr = parseStringAsArray(techs);
          const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
          };

          await Dev.create({
              github_username,
              name,
              avatar_url,
              bio,
              techs: techsArr,
              location
            })
            .then(resp => {
              response.status(201).json({
                error: false,
                data: resp
              })
            })
        } else {
          response.status(200).json({
            error: false,
            message: 'User already registred'
          });
        }
      })
      .catch(err => {
        response.status(400).json({
          error: true,
          errorMessage: err
        })
      });
  },

  // TODO -> implement update and destroy

}