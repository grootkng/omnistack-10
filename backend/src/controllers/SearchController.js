const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    const {
      latitude,
      longitude,
      techs
    } = request.query;

    const techsArray = parseStringAsArray(techs);

    await Dev.find({
        techs: {
          $in: techsArray,
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: 10000,
          },
        },
      })
      .then(resp => {
        response.status(200).json({
          error: false,
          data: resp
        })
      })
      .catch(err => {
        response.status(400).json({
          error: true,
          errorMessage: err
        })
      });
  }
}