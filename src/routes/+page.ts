export const load = async ({ fetch }: {fetch: any}) => {
    const res = await fetch('/api/votes');
    const stats = await res.json();
    
    return { stats };
}