const User = require('../api/models/user')
const Interest = require('../api/models/interest')
const Videocall = require('../api/models/videocall')
const InfoContact = require('../api/models/infoContact')
const RequestList = require('../api/models/requestList')
const UserInterest = require('../api/models/user_interest')


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
    User.hasMany(Videocall, {
      as: 'grandwa_receiver',
      foreignKey: 'receiverId'
    })
    Videocall.belongsTo(User, {
      as: 'grandwa_receiver',
      foreignKey: 'receiverId'
    })

    User.hasMany(Videocall, {
      as: 'grandwa_sender',
      foreignKey: 'senderId'
    })
    Videocall.belongsTo(User, {
      as: 'grandwa_sender',
      foreignKey: 'senderId'
    })
*/
    // USER TO USER
    User.belongsToMany(User, { through: RequestList, foreignKey: 'sender_id', otherKey: 'receiver_id', as: 'sender' })
    User.belongsToMany(User, { through: RequestList, foreignKey: 'receiver_id', otherKey: 'sender_id', as: 'receiver' })
    //MANY TO MANY

    User.belongsToMany(Interest, { through: UserInterest })
    Interest.belongsToMany(User, { through: UserInterest })



  } catch (error) {

    console.log(error)

  }

}



module.exports = addRelationsToModels
