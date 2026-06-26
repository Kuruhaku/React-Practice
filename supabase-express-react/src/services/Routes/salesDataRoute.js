import express from "express";
import { getSalesData, insertSalesData } from "../Controller/salesDataController.js";

export const saleDataRoute = express.Router();

saleDataRoute.get("/", getSalesData);
saleDataRoute.post("/", insertSalesData);
