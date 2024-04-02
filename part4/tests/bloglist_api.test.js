const { test, after, beforeEach } = require('node:test')
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

after(async () => {
  await mongoose.connection.close()
})
