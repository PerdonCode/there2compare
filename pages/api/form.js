export default function handler(req, res) {
    const body = req.body;

    if(!body.firstName || !body.email || !body.message  || !body.subject) {
        return res.status(400).json({data: "first name, email, message and subject fields are required!"});
    }

    return res.status(200).json({data: "form submitted successfully"});
}