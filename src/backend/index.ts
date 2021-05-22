import { handleErrorMiddleware } from "./middleware/shared/handle-error.midd";
import { router } from "./routes/index";
import { Server } from './server/server';
import express from "express";
import morgan from "morgan";
import cors from "cors";

// Get instance
const serverApp = Server.getInstance

// Middlewares nivel aplication
serverApp.app.use(cors());
serverApp.app.use(morgan("dev"));
serverApp.app.use(express.json());
serverApp.app.use(express.urlencoded({ extended: false }));

// Router
serverApp.app.use("/api", router);
// Middleware error
serverApp.app.use(handleErrorMiddleware);
// Iniciar Servidor

const startServer = () => serverApp.start()

export { startServer }