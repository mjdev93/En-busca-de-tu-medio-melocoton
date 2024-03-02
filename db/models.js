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


    //ONE TO MANY - User & Videocall
    User.hasMany(Videocall, {
      foreignKey:'initiatorId',
      as: 'initiatedCalls',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
    Videocall.belongsTo(User, {
      foreignKey:'initiatorId',
      as: 'initiator',
    })

    User.hasMany(Videocall, {
      foreignKey: 'receiverId',
      as: 'receivedCalls',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
    Videocall.belongsTo(User, {
      foreignKey: 'receiverId',
      as: 'receiver',
    })

  //ONE TO MANY - User & Request List
    User.hasMany(RequestList, {
      foreignKey:'initiatorId',
      as: 'initiatedRequest',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
    RequestList.belongsTo(User, {
      foreignKey:'initiatorId',
      as: 'initiatorRequest',
    })

    User.hasMany(RequestList, {
      foreignKey: 'receiverId',
      as: 'receivedRequest',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
    RequestList.belongsTo(User, {
      foreignKey: 'receiverId',
      as: 'receiverRequest',
    })
    

//MANY TO MANY USER TO INTEREST
    User.belongsToMany(Interest, { through: UserInterest })
    Interest.belongsToMany(User, { through: UserInterest })



  } catch (error) {

    console.log(error)

  }

}



module.exports = addRelationsToModels
