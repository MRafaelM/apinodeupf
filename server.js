import { fastify } from 'fastify'
import { DatabasePostgreSQL } from './database-postgres.js'


const server = fastify()
const database = new DatabasePostgreSQL()

server.get('/', () => {
    return 'rota raíz, bem vindo a minha API...'
})

server.get('/alunos', async () => {
    const alunos = await database.list()
    return alunos
})

server.post('/alunos', async (request, reply) => {
    await database.create({

        name: request.body.name,
        email: request.body.email,
        age: request.body.age
    })

    return reply.status(201).send()
})

server.put('/alunos/:id', async (request, reply) => {
    const id = request.params.id
    await database.update(id, {
        name: request.body.name,
        email: request.body.email,
        age: request.body.age
    })
    return reply.status(204).send()
})

server.delete('/alunos/:id', async (request, reply) => {
    const id = request.params.id
    await database.delete(id)
    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})