const userMail = require('../service/mail.service')

const mailRequest = async (req, res) => {
  console.log({
    request: req
  })
  const img = req.file.path
  const mail = await userMail.Mail({
    ...req.body,
    image: img
  })

  res.status(200).send({ meta: 200, mail })
}

const verifyMail = async (req, res) => {
  const { id } = req.body

  const response = await userMail.editTicketStatus(id)
  if (response) {
    res.status(200).send({
      data: response
    })
  } else {
    res.status(400).send({
      error_message: 'There was issue processing request'
    })
  }
}

const allUnsubscribeRequests = async (req, res) => {
  // console.log({
  //   req18: req
  // })
  const unsubscribeRequests = await userMail.getAllMails()

  res.status(200).send({
    meta: 200,
    unsubscribeRequests
  })
}

const allUnsubscribeRequestsFromUser = async (req, res) => {
  const request = await userMail.getRequestBySenderID(req.params.id)
  if (request) {
    res.status(200).send({
      requests: request
    })
  } else {
    res.status(400).send({
      requests: []
    })
  }
}

module.exports = {
  mailRequest,
  verifyMail,
  allUnsubscribeRequests,
  allUnsubscribeRequestsFromUser
}
