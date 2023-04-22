import express from 'express'
import cors from 'cors'
import { serverSettings } from './configs/config'
// routes
import AuthRoute from './routes/AuthRoute'
import PostRoute from './routes/PostRoute'
import UserRoute from './routes/UserRoute'
import ChatRoute from './routes/ChatRoute'
import MessageRoute from './routes/MessageRoute'
import CommentRoute from './routes/CommentRoute'
import ProvinceRoute from './routes/ProvinceRoute'
import NotificationRoute from './routes/NotificationRoute'
import UploadImageRoute from './routes/UploadImageRoute'
import PaymentRoute from './routes/PaymentRoute'
import { handleUpdatePost } from './utils/handleUpdatePost'
import statisticRoute from './routes/StatisticRoute'
import favoritePostRoute from './routes/FavoritePostRoute'
import postTypeRoute from './routes/PostTypeRoute'
import { Server } from 'socket.io'
const bodyParser = require('body-parser')
const { port } = serverSettings
const app = express()

const server = require('http').createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
app.use(
  cors({
    origin: '*',
  })
)
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json())

function updateStatusPost() {
  handleUpdatePost()
  setTimeout(updateStatusPost, 1000 * 60 * 60)
}

updateStatusPost()

//socketIo
let onlineUsers = []

io.on('connection', (socket) => {
  socket.on('user-online', (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id })
    }
  })

  socket.on('disconnect', (userId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    io.emit('get-users-online', onlineUsers)
  })

  socket.on('send-message', (data) => {
    const { receiverId } = data
    const user = onlineUsers.find((user) => user.userId === receiverId)
    if (user) {
      io.to(user.socketId).emit('recieve-message', data)
    }
  })

  socket.on('get-users-online', () => {
    io.emit('get-users-online-array', onlineUsers)
  })
})

app.use('/auth', AuthRoute)
app.use('/post', PostRoute)
app.use('/user', UserRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)
app.use('/comment', CommentRoute)
app.use('/province', ProvinceRoute)
app.use('/notification', NotificationRoute)
app.use('/uploadImage', UploadImageRoute)
app.use('/payment', PaymentRoute)
app.use('/statistic', statisticRoute)
app.use('/favorite', favoritePostRoute)
app.use('/type', postTypeRoute)

server.listen(port, () => {
  console.log('server is running on ' + port)
})
