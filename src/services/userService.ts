import { User, IUser } from "../models/userModel";

export const userService = {
  async findAll(): Promise<IUser[]> {
    return User.find().lean();
  },

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).lean();
  },

  async create(data: { name: string; email: string }): Promise<IUser> {
    const user = new User(data);
    return user.save();
  },

  async update(id: string, data: Partial<{ name: string; email: string }>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, data, { new: true }).lean();
  },

  async remove(id: string): Promise<IUser | null> {
    return User.findByIdAndDelete(id).lean();
  },
};
