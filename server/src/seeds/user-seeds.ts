import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'Test123', password: 'testing123' }
  ], { individualHooks: true });
};
