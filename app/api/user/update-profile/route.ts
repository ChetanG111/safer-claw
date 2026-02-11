import { auth } from '@/lib/auth/auth'
import { db } from '@/database'
import { user } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        })

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { name } = await request.json()

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
        }

        // Update user name in database
        await db
            .update(user)
            .set({ name: name.trim() })
            .where(eq(user.id, session.user.id))

        return NextResponse.json({ success: true, name: name.trim() })
    } catch (error) {
        console.error('Error updating profile:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
