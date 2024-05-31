import user from "../model/user.js"

const userExist = async (req, res, next) => {
  const { uniqueId, voter } = req.body;

  try {
    const userId = await user.findOne({ uniqueId });
    const userVoter = await user.findOne({ voter });

    if (!userId || !userVoter) {
      return res.status(204).json({ message: 'User does not exist.' });
    }

    req.user = userId;  // Attach user object to the request
    next();
  } catch (err) {
    console.error('Error in user existence check:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default userExist;
