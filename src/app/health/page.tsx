import { createClient } from '@/lib/supabase/server';
import { Navbar } from '@/components/layout/Navbar';

export default async function HealthPage() {
    const supabase = await createClient();
    
    let envStatus = "Checking...";
    let dbStatus = "Checking...";
    let authStatus = "Checking...";
    let errorLog: string[] = [];

    // 1. Check Env
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (url && key) {
        envStatus = "✅ Environment variables are set.";
    } else {
        envStatus = "❌ Missing environment variables in .env.local";
    }

    // 2. Check DB Reachability & Schema
    try {
        const { data, error } = await supabase.from('profiles').select('count');
        if (error) {
            dbStatus = `❌ Database error: ${error.message}`;
            errorLog.push(`Profiles table check failed: ${error.message}`);
        } else {
            dbStatus = "✅ 'profiles' table is accessible.";
        }
    } catch (e: any) {
        dbStatus = `❌ Unexpected error: ${e.message}`;
    }

    // 3. Check Auth Service
    try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            authStatus = `❌ Auth error: ${error.message}`;
        } else {
            authStatus = "✅ Supabase Auth service is reachable.";
        }
    } catch (e: any) {
        authStatus = `❌ Unexpected error: ${e.message}`;
    }

    return (
        <>
            <Navbar />
            <div className="container" style={{ padding: '4rem 1rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary)' }}>Quad Diagnostic Tool</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Environment Configuration</h3>
                        <p>{envStatus}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
                            URL: {url ? `${url.substring(0, 15)}...` : 'Not set'}
                        </p>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Database & Schema Health</h3>
                        <p>{dbStatus}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
                            Ensure you have executed the <code>supabase_schema.sql</code> file in your Supabase SQL Editor.
                        </p>
                    </div>

                    <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--surface-border)' }}>
                        <h3 style={{ marginBottom: '0.5rem' }}>Authentication Service</h3>
                        <p>{authStatus}</p>
                    </div>

                    {errorLog.length > 0 && (
                        <div style={{ padding: '1.5rem', background: '#ff00000a', borderRadius: 'var(--radius-md)', border: '1px solid #ff000020' }}>
                            <h3 style={{ color: 'var(--error)', marginBottom: '0.5rem' }}>Error Logs</h3>
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                {errorLog.map((log, i) => <li key={i}>{log}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
