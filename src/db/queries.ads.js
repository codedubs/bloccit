const Advertisement = require("./models").Advertisement;


module.exports = {

  getAllAds(callback) {
    return Advertisement.all()
    .then((advertisements) => {
      callback(null, advertisements);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addAdvertisement(newAdvertisement, callback) {
    return Advertisement.create({
      title: newAdvertisement.title,
      description: newAdvertisement.description
    })
    .then((advertisement) => {
      callback(null, advertisement);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getAdvertisement(id, callback) {
    return Advertisement.findById(id)
    .then((advertisement) => {
      callback(null, advertisement);
    })
    .catch((err) => {
      callback(err);
    })
  },

  deleteAd(id, callback) {
    return Advertisement.destroy({
      where: {id}
    })
    .then((advertisement) => {
      callback(null, advertisement)
    })
    .catch((err) => {
      console.log(err);
    })
  },

  updateAd(id, updateAd, callback) {
    return Advertisement.findById(id)
    .then((advertisement) => {
      if(!advertisement) {
        return callback("Ad not found");
      }

      advertisement.update(updateAd, {
        fields: Object.keys(updateAd)
      })
      .then(() => {
        callback(null, advertisement);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }

}
