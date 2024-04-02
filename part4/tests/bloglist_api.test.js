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

describe('Add a new blog to the list', () => {
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
})

after(async () => {
  await mongoose.connection.close()
})
