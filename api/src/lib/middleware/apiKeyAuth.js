export async function apiKeyAuth(req, res, next) {
    try {
        const apiKey = req.headers['x-api-key'];
        if (!apiKey) {
            return res.status(401).send
        }
    } catch (error) {
        
    }
    
}