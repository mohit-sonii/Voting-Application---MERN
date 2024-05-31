
const validateUser = (req, res, next) => {
     const { uniqueId, voter } = req.body
     //if required fields are not mentioned  
     if (!uniqueId || !voter) return res.status(400).json({ message: 'Required Fields are Missing' })

     next();
}
export default validateUser