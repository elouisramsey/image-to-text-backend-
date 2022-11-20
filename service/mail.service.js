const mailModel = require('../models/mail/mail')

const Mail = async ({ image, imageText, id }) => {
  console.log({
    imageLine4: image
  })
  try {
    const newMail = new mailModel({
      image,
      imageText,
      id,
      status: 'PENDING'
    })

    const savedMail = await newMail.save()
    return savedMail
  } catch (error) {
    console.error(error)
    throw error
  }
}

const editTicketStatus = async (id) => {
  try {
    const ticketByID = await mailModel.findById(id)

    if (ticketByID) {
      await mailModel.updateOne(
        {
          _id: id
        },
        {
          $set: {
            status: 'UNSUBSCRIBED'
          }
        }
      )

      return {
        success: true,
        message: 'Request processed'
      }
    }
    throw new Error('INVALID REQUEST')
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getAllMails = async () => {
  try {
    const allMails = await mailModel.find()
    return allMails
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getRequestBySenderID = async (id) => {
  try {
    const requests = await mailModel.find({
      id
    })

    return requests
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = {
  Mail,
  editTicketStatus,
  getAllMails,
  getRequestBySenderID
}
