import { UniversityController } from "../../controllers/academy/UniversityController";
import { NoMiddlewareBaseRouter } from "../base/NoMiddlewareBaseRouter";
import { AreaRouter } from "./AreaRouter";

export class UniversityRouter extends NoMiddlewareBaseRouter<UniversityController> {
  constructor() {
    super(UniversityController, "UniversityRouter", {
      mergeParams: true,
    });
    this.router.use("/university/:uniId", new AreaRouter().router)
  }

  protected override routes(): void {
    /**
     * @swagger
     * /api/universities:
     *   get:
     *     summary: Obtiene una lista de todas las universidades
     *     tags:
     *       - AcademySchema
     *     responses:
     *       200:
     *         description: Lista de universidades
     */
    this.router.get("/universities", this.controller.getUniversities);

    /**
     * @swagger
     * /api/university/{uniId}:
     *   get:
     *     summary: Obtiene una universidad dado su id
     *     tags:
     *       - AcademySchema
     *     parameters:
     *       - in: path
     *         name: uniId
     *         required: true
     *         description: ID de la universidad que se quiere obtener
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Universidad obtenida exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: integer
     *                   example: 200
     *                 data:
     *                   type: object
     *                   properties:
     *                     createdAt:
     *                       type: string
     *                       format: date-time
     *                       example: "2024-10-11T09:13:50.680Z"
     *                     updatedAt:
     *                       type: string
     *                       format: date-time
     *                       example: "2024-10-11T09:13:50.680Z"
     *                     id:
     *                       type: integer
     *                       example: 1
     *                     name:
     *                       type: string
     *                       example: "Universidad Nacional Mayor de San Marcos"
     *                     slug:
     *                       type: string
     *                       example: "unmsm"
     *                     thumbnail:
     *                       type: string
     *                       example: "url:thumbpath"
     *                     description:
     *                       type: string
     *                       example: "Universidad Nacional"
     *                     title:
     *                       type: string
     *                       example: "Bienvenido a la universidad UNMSM"
     *                     acronym:
     *                       type: string
     *                       example: "UNMSM"
     *                     areasName:
     *                       type: string
     *                       example: "Areas"
     *                     discoverName:
     *                       type: string
     *                       example: "Descubre a que area perteneces"
     *                     admissionImg:
     *                       type: string
     *                       example: "url:imagepath"
     *                     steps:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           statement:
     *                             type: string
     *                             example: "Primero selecciona el area a que quieres postular ...."
     *                           index:
     *                             type: integer
     *                             example: 1
     *       404:
     *         description: Universidad no encontrada
     */
    this.router.get("/university/:uniId", this.controller.getUniversity);
  }
}
