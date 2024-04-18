export const load = async ({ fetch }) => {
    const res = await fetch('/api/vote');
    const stats = await res.json();
    
    return { stats };
}