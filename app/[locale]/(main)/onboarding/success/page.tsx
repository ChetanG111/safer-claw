export default async function OnboardingSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { agentId } = await searchParams

    return (
        <div className='container mx-auto py-24 px-4 text-center'>
            <h1 className='text-3xl font-bold text-brand-navy mb-4'>Setup Complete!</h1>
            <p className='text-lg text-slate-500 mb-8'>
                Your agent is now ready to receive instructions.
            </p>
            {/* We can fetch agent details here or redirect to dashboard */}
            <div className='p-6 bg-slate-50 rounded-2xl max-w-md mx-auto'>
                <p className='text-slate-600'>Agent ID: {agentId}</p>
                <p className='text-sm text-slate-400 mt-2'>Redirecting to dashboard...</p>
            </div>

            {/* Auto-redirect script could go here, or just a button */}
            <a
                href='/dashboard'
                className='inline-block mt-8 px-8 py-3 bg-brand-navy text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all'
            >
                Go to Dashboard
            </a>
        </div>
    )
}
