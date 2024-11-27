import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { AuthController } from "../controllers/AuthController";

export class AuthRouter {
  public router: Router;
  private readonly authMiddleware = new AuthMiddleware();
  private readonly authController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/signup",
      [this.authMiddleware.validateSignUpUserDTO],
      this.authController.signUp
    );

    /**
     * @swagger
     * /auth/signin:
     *   post:
     *     summary: Inicio de sesión de usuario
     *     description: Permite a un usuario autenticarse proporcionando sus credenciales.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               identifier:
     *                 type: string
     *                 description: Nombre de usuario o email.
     *                 example: usuario@example.com
     *               password:
     *                 type: string
     *                 description: Contraseña del usuario.
     *                 example: password123
     *     responses:
     *       200:
     *         description: Autenticación exitosa.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: number
     *                   description: Estado de la respuesta.
     *                   example: 200
     *                 data:
     *                   type: object
     *                   properties:
     *                     accessToken:
     *                       type: string
     *                       description: Token de acceso JWT.
     *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     *                     user:
     *                       type: object
     *                       description: Entidad usuario.
     *                       properties:
     *                         createdAt:
     *                           type: string
     *                           format: date-time
     *                           description: Fecha de creación del usuario.
     *                           example: "2024-11-12T06:50:21.488Z"
     *                         updatedAt:
     *                           type: string
     *                           format: date-time
     *                           description: Fecha de actualización del usuario.
     *                           example: "2024-11-12T06:50:21.488Z"
     *                         id:
     *                           type: string
     *                           description: Identificador único del usuario.
     *                           example: "a082583c-bc71-4284-8775-b2c564fc01c6"
     *                         names:
     *                           type: string
     *                           description: Nombres del usuario.
     *                           example: "Joshua Bryan"
     *                         surNames:
     *                           type: string
     *                           description: Apellidos del usuario.
     *                           example: "Pariona Santiago"
     *                         publicEmail:
     *                           type: string
     *                           description: Correo electrónico público del usuario.
     *                           example: "joshua@gmail.com"
     *                         imageUrl:
     *                           type: string
     *                           description: URL de la imagen del usuario.
     *                           example: "https://path/to/image"
     *                         phone:
     *                           type: integer
     *                           description: Número de teléfono del usuario.
     *                           example: 999888222
     *                         department:
     *                           type: string
     *                           description: Departamento del usuario.
     *                           example: "Lima"
     *                         province:
     *                           type: string
     *                           description: Provincia del usuario.
     *                           example: "Lima"
     *                         district:
     *                           type: string
     *                           description: Distrito del usuario.
     *                           example: "Callao"
     *                         university:
     *                           type: string
     *                           description: Universidad del usuario.
     *                           example: "Universidad Nacional Mayor de San Marcos"
     *                         career:
     *                           type: string
     *                           description: Carrera del usuario.
     *                           example: "Ingeniería de Software"
     *       401:
     *         description: Credenciales inválidas.
     */
    this.router.post(
      "/signin",
      [
        this.authMiddleware.authenticateWithLocal,
        this.authMiddleware.validateIsAuthenticated,
      ],
      this.authController.signIn
    );

    this.router.post("/google", []);

    this.router.post("/facebook", []);

    //this.router.post("/signout", this.controller.signOut);
  }
}
