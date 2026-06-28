import express from "express";
import { getSaleData, postSaleData } from "../controllers/saleController";
import type { Router } from "express";

export const saleDataRoute: Router = express.Router();

saleDataRoute.get("/", getSaleData);
saleDataRoute.post("/", postSaleData);
