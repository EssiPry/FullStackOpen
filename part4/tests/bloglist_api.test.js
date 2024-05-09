const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require ('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('bloglist has entries', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are listed', async () => {
    const res = await helper.blogsInDb()
    assert.strictEqual(res.length, helper.initialBlogs.length)
  })

  test('blog has an id field as a unique identifier', async () => {
    const res = await helper.blogsInDb()

    const blogKeys = Object.keys(res[0])
    assert(blogKeys.includes('id'))
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/ )

    assert.deepStrictEqual(resultBlog.body.title, blogToView.title)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = 747

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('add a new blog to the list', () => {
  test('a valid blog can be added', async () => {

    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length +1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes(helper.newBlog.title))
  })

  test('likes default to 0 if likes property is missing', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogUndefinedLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await helper.blogsInDb()
    const savedBlog = res.find(b => b.author === 'Doggo')
    assert.strictEqual(savedBlog.likes, 0)

  })

  test('fails with status code 400, if title or url properties are missing', async () => {
    const newBlogOnlyAuthor = {
      author: 'No title, no cats',
      likes: -100
    }

    await api
      .post('/api/blogs')
      .send(newBlogOnlyAuthor)
      .expect(400)

    const res = await helper.blogsInDb()
    assert.strictEqual(res.length, helper.initialBlogs.length)
  })
})

describe('update a blog', () => {
  test('succeeds with status code 200', async () => {

    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate = blogsAtStart[0]

    const update = { likes: 100 }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(update)
      .set('Accept', 'application/json')
      .expect(200)

    const res = await api
      .get(`/api/blogs/${blogToUpdate.id}`)

    assert.strictEqual(res.body.likes, 100)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid' , async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length -1)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User ({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'pessi',
      name: 'Essi P',
      password: 'verysekrit'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen1'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(res.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'EPry',
      name: 'Essi Pry',
      password: 'ps'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(res.body.error.includes('expected password to have at least 3 characters'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'EP',
      name: 'Essi Pry',
      password: 'pspsps'
    }

    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(res.body.error.includes('User validation failed'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
