import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { prisma } from './prisma.js'


const app = new Hono()

app.get('/', (c) => {
    return c.text('hello world')
})

app.post('/sign-up', async (c) => {
    const { password, email } = await c.req.json()
    try {
        await prisma.user.create({
            data: {
                email: email,
                password: password
            }
        })
        const user = await prisma.user.findMany()
        return c.json({ message: 'created success', user })
    } catch (error) {
        return c.json({ message: 'something went wrong' }, 400)
    }

})

app.put('/admin/change-user-password/:userId', async (c) => {
    try {
        const userId = parseInt(c.req.param('userId'))
        const json = await c.req.json() as { password: string }
        if (!json.password) {
            return c.json({ message: 'not found' }, 401)
        }
        await prisma.user.update({
            where: { id: userId },
            data: {
                password: json.password,
            }
        })
        return c.json({ message: 'update successfully!' })
    } catch (error) {
        return c.json({ message: 'something went wrong' }, 400)
    }

})


app.get('/admin/usres/empty-name', async (c) => {
    const users = await prisma.user.findEmptyName()

    return c.json({ users })

})



serve(app)