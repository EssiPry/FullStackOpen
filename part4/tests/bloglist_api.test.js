const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require ('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

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
    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, helper.initialBlogs.length)
  })

  test('blog has an id field as a unique identifier', async () => {
    const res = await api.get('/api/blogs')

    const blogKeys = Object.keys(res.body[0])
    assert(blogKeys.includes('id'))
  })
})

describe('add a new blog to the list', () => {
  test('a valid blog can be added', async () => {

    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const titles = res.body.map(r => r.title)
    assert.strictEqual(res.body.length, helper.initialBlogs.length +1)
    assert(titles.includes(helper.newBlog.title))
  })

  test('likes default to 0 if likes property is missing', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogUndefinedLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')
    const savedBlog = res.body.find(b => b.author === 'Doggo')
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

    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, helper.initialBlogs.length)
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

after(async () => {
  await mongoose.connection.close()
})
