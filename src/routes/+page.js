export const load = async ({ fetch }) => {
    const res = await fetch('/api/vote');
    const data = await res.json();
    
    return { data };
}