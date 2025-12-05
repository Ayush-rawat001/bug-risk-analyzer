// Generate bug IDs like BUG001, BUG002, etc.
import Bug from '../models/Bug.js';

export const generateBugId = async () => {
  const bugs = await Bug.find();
  const numbers = bugs
    .map(bug => {
      const match = bug.bugId.match(/\d+/);
      return match ? parseInt(match[0]) : 0;
    })
    .filter(num => num > 0);
  
  const maxNum = numbers.length > 0 ? Math.max(...numbers) : 0;
  const nextNum = maxNum + 1;
  
  return `BUG${nextNum.toString().padStart(3, '0')}`;
};

