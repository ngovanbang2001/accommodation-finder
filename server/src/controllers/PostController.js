import { httpCodes, kindOfTimeConfig } from '../configs/config'
import db from '../models'
import { uploadMultipleImages, uploadImage } from '../utils/uploadMedia'
import { handlePushFCM } from '../configs/notification'
import { handlebarOptions, transporter } from '../utils/mailer'
import hbs from 'nodemailer-express-handlebars'
import { formatPrice, strToSlug } from '../utils'

const { Op } = require('sequelize')
const emailSend = 'ngovanbang2001@gmail.com'
export const createPost = async (req, res) => {
  try {
    const { body } = req
    let urlImages = null
    if (body.post.images) {
      urlImages = await uploadMultipleImages(body.post.images)
    } else {
      urlImages = [
        'https://res.cloudinary.com/dqrn1uojt/image/upload/v1677945762/rental_wcckjf.png',
      ]
    }
    let urlVideo = ''
    if (body.post.video) {
      urlVideo = await uploadImage(body.post.video)
    }
    try {
      const { dataValues: post } = await db.Post.create({
        ...body.post,
        images: JSON.stringify(urlImages),
        userId: req.user.id,
        video: urlVideo,
        isActive: 1,
      })
      res.status(httpCodes.CREATED).json({ post: post })
      const postTypes = await db.PostType.findAll({ where: { status: 1 } })
      const type = postTypes.find((item) => item.id === post.type)
      const userLoggedIn = await db.Session.findOne({ where: { userId: req.user.id } })
      const userData = await db.User.findOne({ where: { id: userLoggedIn.userId } })
      if (userData.email) {
        const mailOptions = {
          from: emailSend,
          to: userData.email,
          subject: `Tin chờ phê duyệt: "${body.post.title}"`,
          template: 'email-create-post',
          context: {
            title: body.post.title,
            userDisplayName: userData.displayName,
            type: type.title,
            duration: `${body.post.timeNumber} ${kindOfTimeConfig[body.post.kindOfTime]} `,
            totalPayment: formatPrice(post.totalPayment),
          },
        }
        await transporter.use('compile', hbs(handlebarOptions('../views/post')))
        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
          } else {
            console.log('Email sent: ' + info.response)
          }
        })
      }
      //send notification
      const user = await db.User.findOne({ where: { id: req.user.id }, raw: false })
      if (user) {
        await user.decrement('balance', { by: body.amount })
      }
      if (userLoggedIn && userLoggedIn.fcmToken) {
        const messages = {
          notification: {
            title: `Bạn vừa đăng bài đăng mới.`,
            body: 'Bài viết của bạn đang ở trạng thái chờ duyệt.',
          },
          token: userLoggedIn.fcmToken,
        }
        await handlePushFCM(messages)
      }
      await db.Notification.create({
        userId: userLoggedIn.userId,
        content: 'Bài viết của bạn đang ở trạng thái chờ duyệt.',
        directLink: `/post/preview/${strToSlug(post.title)}-${post.id}`,
        type: 2,
      })
    } catch (e) {
      console.log(e)
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const getAllPost = async (req, res) => {
  try {
    const { status, offset, limit, isActive, category, type, tradingForm, keyword, userId } =
      req.query
    let where = {
      status:
        status >= 0
          ? status
          : {
              [Op.or]: [0, 1, 2, 3],
            },
      isActive:
        isActive >= 0
          ? isActive
          : {
              [Op.or]: [0, 1],
            },
      category: category
        ? category
        : {
            [Op.or]: [1, 2, 3, 4],
          },
      type: type
        ? type
        : {
            [Op.or]: [0, 1, 2, 3],
          },
      tradingForm: tradingForm
        ? tradingForm
        : {
            [Op.or]: [1, 2, 3, 4],
          },
    }
    if (userId) {
      where.userId = userId
    }
    if (keyword) {
      where.title = { [Op.substring]: '%' + keyword + '%' }
    }
    const allPost = await db.Post.findAndCountAll({
      where: { ...where },
      include: [
        { model: db.User, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber'] },
      ],
      offset: +offset,
      limit: +limit,
      order: [
        ['type', 'DESC'],
        ['updatedAt', 'DESC'],
      ],
      raw: true,
      nest: true,
    })
    if (allPost) {
      const postData = allPost.rows.map((post) => {
        return {
          ...post,
          images: JSON.parse(post.images.split(',')),
        }
      })
      return res.status(httpCodes.SUCCESS).json({ postData, total: allPost.count })
    }
  } catch (e) {
    console.log('e', e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const getPostById = async (req, res) => {
  try {
    const post = await db.Post.findOne({
      where: { id: req.params.id },
      include: [
        { model: db.User, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber'] },
      ],
      raw: true,
      nest: true,
    })
    if (post) {
      const postData = { ...post, images: JSON.parse(post.images.split(',')) }
      return res.status(httpCodes.SUCCESS).json(postData)
    }
  } catch (e) {
    console.log('e', e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const getPostByUser = async (req, res) => {
  try {
    const { status, offset, limit, userId, isActive } = req.query
    const posts = await db.Post.findAndCountAll({
      where: {
        userId,
        status:
          status >= 0
            ? status
            : {
                [Op.or]: [0, 1, 2, 3],
              },
        isActive:
          isActive >= 0
            ? isActive
            : {
                [Op.or]: [0, 1],
              },
      },
      include: [
        { model: db.User, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber'] },
      ],
      offset: +offset,
      limit: +limit,
      raw: true,
      nest: true,
    })
    const postsData = posts.rows.map((post) => {
      return {
        ...post,
        images: JSON.parse(post.images.split(',')),
      }
    })
    return res.status(httpCodes.SUCCESS).json({ posts: postsData, total: posts.count })
  } catch (e) {
    console.log('e', e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const filterPost = async (req, res) => {
  try {
    let { query } = req
    let criteriaFilter = {}

    const { offset, limit, isActive, status } = query
    if (isActive >= 0) {
      criteriaFilter.isActive = isActive
    }
    if (status >= 0) {
      criteriaFilter.status = status
    }
    if (query.type) {
      criteriaFilter.type = { ...{ [Op.in]: query.type.split(',') } }
    }

    if (query.tradingForm) {
      criteriaFilter.tradingForm = query.tradingForm
    }

    if (query.isFurniture) {
      criteriaFilter.isFurniture = query.isFurniture
    }

    if (query.hasVideo) {
      if (+query.hasVideo === 1) {
        criteriaFilter.video = { [Op.eq]: '' }
      } else if (+query.hasVideo === 2) {
        criteriaFilter.video = { [Op.ne]: '' }
      }
    }

    if (query.category) {
      criteriaFilter.category = query.category
    }
    //
    if (query.priceRange) {
      const priceRangeTemp = query.priceRange.split(',').map((item) => +item)
      criteriaFilter.price = { ...{ [Op.between]: priceRangeTemp } }
    }
    if (query.areaRange) {
      const areaRangeTemp = query.areaRange.split(',').map((item) => +item)
      criteriaFilter.area = { ...{ [Op.between]: areaRangeTemp } }
    }

    if (query.address) {
      const addressTemp = query.address.split(',').map((item) => +item)
      criteriaFilter.province = addressTemp[0]
      if (addressTemp[1]) {
        criteriaFilter.district = addressTemp[1]
      }
      if (addressTemp[2]) {
        criteriaFilter.ward = addressTemp[2]
      }
    }

    if (query.keyword) {
      criteriaFilter.title = { [Op.substring]: '%' + query.keyword + '%' }
    }
    const postResponse = await db.Post.findAndCountAll({
      where: { ...criteriaFilter },
      include: [
        { model: db.User, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber'] },
      ],
      order: [
        ['type', 'DESC'],
        ['updatedAt', 'DESC'],
      ],
      offset: +offset,
      limit: +limit,
      raw: true,
      nest: true,
    })

    if (postResponse) {
      const postData = postResponse.rows.map((post) => {
        return {
          ...post,
          images: JSON.parse(post.images.split(',')),
        }
      })
      return res.status(httpCodes.SUCCESS).json({ posts: postData, total: postResponse.count })
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const searchPost = async (req, res) => {
  try {
    const { key } = req.query
    const posts = await db.Post.findAndCountAll({
      where: {
        title: {
          [Op.substring]: '%' + key + '%',
        },
      },
    })

    if (posts) {
      return res.status(httpCodes.SUCCESS).json({ posts: posts.rows, total: posts.count })
    }
  } catch (e) {
    console.log(e)
  }
}

export const sortPost = async (req, res) => {
  const { sortCriterion } = req.query
  switch (sortCriterion) {
    case '2':
      const allPostASC = await db.Post.findAll({
        include: [
          { model: db.User, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber'] },
        ],
        order: [['price', 'ASC']],
        raw: true,
        nest: true,
      })
      if (allPostASC) {
        const postData = allPostASC.map((post) => {
          return {
            ...post,
            images: JSON.parse(post.images.split(',')),
          }
        })
        return res.status(httpCodes.SUCCESS).json(postData)
      }
      break
    case '3':
      const allPost = await db.Post.findAll({
        include: [
          { model: db.User, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber'] },
        ],
        order: [['price', 'DESC']],
        raw: true,
        nest: true,
      })
      if (allPost) {
        const postData = allPost.map((post) => {
          return {
            ...post,
            images: JSON.parse(post.images.split(',')),
          }
        })
        return res.status(httpCodes.SUCCESS).json(postData)
      }
  }
}

export const getRelatedPost = async (req, res) => {
  try {
    const { id } = req.params
    const allPost = await db.Post.findAll({
      where: { ...req.query, isActive: 1, status: 1 },
      limit: 20,
      offset: 0,
      raw: true,
      nest: true,
      include: [
        { model: db.User, as: 'user', attributes: ['avatar', 'displayName', 'phoneNumber'] },
      ],
    })
    const data = allPost.filter((item) => item.id !== +id)
    if (data.length) {
      const postData = data.map((post) => {
        return {
          ...post,
          images: JSON.parse(post.images.split(',')),
        }
      })
      return res.status(httpCodes.SUCCESS).json({ relatedPosts: postData.slice(0, 10) })
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}

export const approvePost = async (req, res) => {
  try {
    const accountData = await db.User.findOne({ where: { id: req.user.id } })
    const { status, isActive, reasonReject, timeNumber, kindOfTime, amount } = req.body
    let postData = await db.Post.findOne({
      where: { id: req.params.id },
      include: [{ model: db.User, as: 'user', attributes: ['displayName', 'email'] }],
      raw: status !== 1,
      nest: true,
    })
    let timeNumberData = null
    switch (postData.kindOfTime) {
      case 1: {
        timeNumberData = 1
        break
      }
      case 2: {
        timeNumberData = 7
        break
      }
      case 3: {
        timeNumberData = 30
        break
      }
      default:
        break
    }

    //Hủy đăng tin
    if (+isActive === 0 && accountData.role === 0) {
      const post = await db.Post.update({ isActive: 0 }, { where: { id: req.params.id } })
      return res.status(httpCodes.SUCCESS).json({ ok: true })
    }
    //Gia hạn tin
    else if (+isActive === 1 && accountData.role === 0) {
      const user = await db.User.findOne({ where: { id: req.user.id }, raw: false })
      await user.decrement('balance', { by: amount })
      await db.Post.update(
        {
          timeNumber,
          kindOfTime,
          status,
          duration:
            new Date().getTime() + timeNumberData * postData.timeNumber * 60 * 60 * 24 * 1000,
        },
        { where: { id: req.params.id } }
      )

      const mailOptions = {
        from: emailSend,
        to: postData.user.email,
        subject: `Gia hạn thành công: "${postData.title}"`,
        template: 'email-renew',
        context: {
          title: postData.title,
          userDisplayName: postData.user.displayName,
          link: `http://localhost:3000/post/${strToSlug(postData.title)}-${postData.id}`,
          linkLogin: `http://localhost:3000/sign-in`,
        },
      }

      await transporter.use('compile', hbs(handlebarOptions('../views/post')))
      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
      if (userLoggedIn && userLoggedIn.fcmToken) {
        const messages = {
          notification: {
            title: `Trạng thái bài đăng thay đổi.`,
            body: 'Kiểm tra email để biết thêm chi tiết.',
          },
          token: userLoggedIn.fcmToken,
        }
        await handlePushFCM(messages)
      }
      await db.Notification.create({
        content: `Gia hạn tin đăng: <strong>${postData.title}</strong>`,
        userId: postData.userId,
        directLink: `/post/preview/${strToSlug(postData.title)}-${postData.id}`,
        type: 3,
      })
      return res.status(httpCodes.SUCCESS).json({ ok: true })
    }

    //Admin duyệt
    else if (accountData.role == 1) {
      let dataUpdate = {
        isActive,
        status,
      }
      if (reasonReject) {
        dataUpdate.reasonReject = reasonReject
      }
      const userLoggedIn = await db.Session.findOne({ where: { userId: postData.userId } })
      const user = await db.User.findOne({ where: { id: postData.userId }, raw: false })

      if (postData) {
        // Được duyệt
        if (+status === 1 && +isActive === 1) {
          await db.Post.update(
            {
              ...dataUpdate,
              duration:
                new Date().getTime() + timeNumberData * postData.timeNumber * 60 * 60 * 24 * 1000,
            },
            { where: { id: req.params.id } }
          )

          const mailOptions = {
            from: emailSend,
            to: postData.user.email,
            subject: `Kiểm duyệt thành công: "${postData.title}"`,
            template: 'email-approve-post',
            context: {
              title: postData.title,
              userDisplayName: postData.user.displayName,
              link: `http://localhost:3000//post/${strToSlug(postData.title)}-${postData.id}`,
              linkLogin: `http://localhost:3000//sign-in`,
            },
          }

          await transporter.use('compile', hbs(handlebarOptions('../views/post')))
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })
          if (userLoggedIn && userLoggedIn.fcmToken) {
            const messages = {
              notification: {
                title: `Trạng thái bài đăng thay đổi.`,
                body: 'Kiểm tra email để biết thêm chi tiết.',
              },
              token: userLoggedIn.fcmToken,
            }
            await handlePushFCM(messages)
          }
          await db.Notification.create({
            content: `Được phê duyệt tin đăng: <strong>${postData.title}</strong>`,
            userId: postData.userId,
            directLink: `/post/preview/${strToSlug(postData.title)}-${postData.id}`,
            type: 3,
          })
        }

        // Ẩn tin từ Admin
        else if (+isActive === 0) {
          const post = await db.Post.update({ ...dataUpdate }, { where: { id: req.params.id } })
          const mailOptions = {
            from: emailSend,
            to: postData.user.email,
            subject: `Ẩn tin đăng: "${postData.title}"`,
            template: 'email-hidden-post',
            context: {
              title: postData.title,
              userDisplayName: postData.user.displayName,
              link: `https://trotot.online`,
            },
          }

          await transporter.use('compile', hbs(handlebarOptions('../views/post')))
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })
          if (userLoggedIn && userLoggedIn.fcmToken) {
            const messages = {
              notification: {
                title: `Trạng thái bài đăng thay đổi.`,
                body: 'Kiểm tra email để biết thêm chi tiết.',
              },
              token: userLoggedIn.fcmToken,
            }
            await handlePushFCM(messages)
          }

          await db.Notification.create({
            content: `Đã bị ẩn tin đăng: <strong>${postData.title}</strong>`,
            userId: postData.userId,
            directLink: `/post/preview/${strToSlug(postData.title)}-${postData.id}`,
            type: 3,
          })
        }

        // Từ chối tin
        else if (+status === 2) {
          const post = await db.Post.update({ ...dataUpdate }, { where: { id: req.params.id } })
          await user.increment('balance', { by: postData.totalPayment })
          const mailOptions = {
            from: emailSend,
            to: postData.user.email,
            subject: `Từ chối tin đăng: "${postData.title}"`,
            template: 'email-reject-post',
            context: {
              title: postData.title,
              userDisplayName: postData.user.displayName,
              reasonReject: req.body.reasonReject,
              totalPayment: formatPrice(postData.totalPayment),
            },
          }

          await transporter.use('compile', hbs(handlebarOptions('../views/post')))
          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })
          if (userLoggedIn && userLoggedIn.fcmToken) {
            const messages = {
              notification: {
                title: `Trạng thái bài đăng thay đổi.`,
                body: 'Kiểm tra email để biết thêm chi tiết.',
              },
              token: userLoggedIn.fcmToken,
            }
            await handlePushFCM(messages)
          }

          await db.Notification.create({
            content: `Bị từ chối tin đăng: <strong>${postData.title}</strong>`,
            userId: postData.userId,
            directLink: `/post/preview/${strToSlug(postData.title)}-${postData.id}`,
            type: 3,
          })
        }
        return res.status(httpCodes.SUCCESS).json({ ok: true })
      }
    }
  } catch (e) {
    console.log(e)
    return res.sendStatus(httpCodes.UNKNOWN_ERROR)
  }
}
