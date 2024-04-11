import * as dao from "./dao.js";
import * as coursesDao from "../courses/dao.js"
function ModuleRoutes(app) {
    let currentModule = null
    const createModule = async (req, res) => {
        const module = await dao.createModule(req.body);
        res.json(module);
    }

    const deleteModule = async (req, res) => {
        const status = await dao.deleteModule(req.params.moduleId);
        res.json(status);
    }

    const updateModule = async (req, res) => {
        const { moduleId } = req.params;
        const status = await dao.updateModule(moduleId, req.body);
        currentModule = await dao.findModuleById(moduleId);
        res.json(status);
    }

    const findModules = async (req, res) => {
        const { courseId } = req.params;
        console.log(courseId)
        if (courseId) {
            const course = await coursesDao.findByCourseId(courseId)
            const modules = await dao.findModulesByCourseId(course?.id)
            res.json(modules);
        }
    }
    
    app.put("/api/modules/:moduleId", updateModule)
    app.delete("/api/modules/:moduleId", deleteModule)
    app.post("/api/courses/:courseId/modules", createModule)
    app.get("/api/courses/:courseId/modules", findModules)
}
export default ModuleRoutes;