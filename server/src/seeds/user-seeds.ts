import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JohnSmith', password: 'devTest!' }
  ], { individualHooks: true });
};
