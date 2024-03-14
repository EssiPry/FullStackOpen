const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => {
      return total += blog.likes
    }, 0)
}

const favouriteBlog = (blogs) => {
  return blogs.length === 0
    ? 'no blogs listed'
    : blogs.reduce((prev, current) => {
      return (prev && prev.likes > current.likes)
        ? prev
        : current
    })
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}