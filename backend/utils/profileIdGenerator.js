// Generate profile IDs like DEV101, TEST222, PM333
export const generateProfileId = async (role, User) => {
  const prefix = role === 'developer' ? 'DEV' : role === 'tester' ? 'TEST' : 'PM';
  
  // Find the highest number for this role
  const users = await User.find({ role });
  const numbers = users
    .map(user => {
      const match = user.profileId.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    })
    .filter(num => num > 0);
  
  const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0;
  const nextNum = maxNum + 1;
  
  return `${prefix}${nextNum.toString().padStart(3, '0')}`;
};

