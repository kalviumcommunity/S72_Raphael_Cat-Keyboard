import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { 
  createUser, 
  getAllUsers,
  getUserById,
  deleteUser
} from '../mysql.js';