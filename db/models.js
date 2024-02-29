const User = require('../api/models/user')
const Interest = require('../api/models/interest')
const Videocall = require('../api/models/videocall')
const InfoContact = require('../api/models/infoContact')
const RequestList = require('../api/models/requestList')


function addRelationsToModels() {

  try {

    //ONE TO ONE - Users & Contact

    User.hasOne(InfoContact, {
      onDelete: 'CASCADE'
    })

    InfoContact.belongsTo(User, {
      onDelete: 'CASCADE'
    })

 /*
    //ONE TO MANY - User & Tweet
    User.hasMany(Tweet, {})
    Tweet.belongsTo(User, {})

 */
    //MANY TO MANY

    User.belongsToMany(Interest, {through: 'user_interest'})
    Interest.belongsToMany(User, {through: 'user_interest'})



  } catch (error) {

    console.log(error)

  }

}

 

module.exports = addRelationsToModels
