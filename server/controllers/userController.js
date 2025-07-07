import User from '../models/User.js';

export const getUserUsernames = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      githubUsername: user.githubUsername,
      leetcodeUsername: user.leetcodeUsername,
      codeforcesUsername: user.codeforcesUsername,
      codechefUsername: user.codechefUsername,
      gfgUsername: user.gfgUsername,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch usernames' });
  }
};

export const updateUserUsernames = async (req, res) => {
  const { githubUsername, leetcodeUsername, codeforcesUsername, codechefUsername, gfgUsername } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { githubUsername, leetcodeUsername, codeforcesUsername, codechefUsername, gfgUsername },
      { new: true }
    );
    res.json({ message: 'Usernames updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update usernames' });
  }
};
