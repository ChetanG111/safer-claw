import { auth } from '@/lib/auth/auth'
import { db } from '@/database'
import { user, session } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers,
        })

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const userId = session.user.id

        // Delete all user sessions first
        await db.delete(session).where(eq(session.userId, userId))

        // Delete user account
        await db.delete(user).where(eq(user.id, userId))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting account:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
