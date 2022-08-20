export const requireLogin = async (req: any, res: any, next: any) => {
    const { session_id } = req.headers;
    const response = await fetch('auth-service/token', {
        method: "GET",
        headers: {
            session_id: session_id
        }
    });
    // validated response
    const data = await response.json();
    req.access_token = data.access_token;
    next();
}