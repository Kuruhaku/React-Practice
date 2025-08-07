import express from 'express';
import { getRecipe } from '../controllers/aiApiController.js';

export const aiApiRoute = express.Router()

// defaultURL/api/getRecipe
aiApiRoute.post('/getRecipe', getRecipe)