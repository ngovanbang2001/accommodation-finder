const path = require('path')
const nodemailer = require('nodemailer')

const emaiSend = 'ngovanbang2001@gmail.com'
const passEmail = 'Anhbang2001@'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emaiSend,
    pass: passEmail,
  },
})
export const handlebarOptions = (pathName) => {
  return {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.resolve(__dirname, pathName),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, pathName),
    extName: '.handlebars',
  }
}
