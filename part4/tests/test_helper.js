const Blog = require ('../models/blog')
const User = require ('../models/user')

const initialBlogs = [
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const newBlog = {
  title: 'Hello Kitty',
  author: 'Catto',
  url: 'www',
  likes: 4
}

const newBlogUndefinedLikes = {
  title: 'Hello woof',
  author: 'Doggo',
  url: 'www',
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Non-existant blog', url: 'www'})
  await blog.save()
  await blog.deleteOne()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, newBlog, newBlogUndefinedLikes, nonExistingId, blogsInDb, usersInDb
}
