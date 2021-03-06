const express = require('express')
const cors = require('cors')
const { uuid } = require('uuidv4')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []
const MESSAGE_ERROR = { eror: 'Repository not found' }

app.get('/repositories', (request, response) => {
  return response.json(repositories)
})

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body

  const repository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repository)

  return response.json(repository)
})

app.put('/repositories/:id', (request, response) => {
  const { title, url, techs } = request.body
  const { id } = request.params

  const repoIndex = repositories.findIndex(repository => repository.id === id)

  if (repoIndex < 0) return response.status(400).json(MESSAGE_ERROR)

  const { likes } = repositories[repoIndex]

  const repository = {
    id,
    title,
    url,
    techs,
    likes,
  }

  repositories[repoIndex] = repository

  return response.json(repository)
})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repository => repository.id === id)

  if (repoIndex < 0) return response.status(400).json(MESSAGE_ERROR)

  repositories.splice(repoIndex, 1)

  return response.status(204).send()
})

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repository => repository.id === id)

  if (repoIndex < 0) return response.status(400).json(MESSAGE_ERROR)

  const repository = repositories[repoIndex]

  repository.likes ++

  return response.json(repository)
})

module.exports = app
