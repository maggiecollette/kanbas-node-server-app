import * as dao from "./dao.js";
export default function CourseRoutes(app) {
    let currentCourse = null
    const createCourse = async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    }

    const findAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    }

    const findByCourseId = async (req, res) => {
        const course = await dao.findByCourseId(req.params.courseId)
        res.json(course)
    }

    const updateCourse = async (req, res) => {
        const { courseId } = req.params;
        const status = await dao.updateCourse(courseId, req.body);
        currentCourse = await dao.findByCourseId(courseId);
        res.json(status);
    }

    const deleteCourse = async (req, res) => {
        const status = await dao.deleteCourse(req.params.courseId);
        res.json(status);
    }

    app.get("/api/courses", findAllCourses)
    app.get("/api/courses/:courseId", findByCourseId)
    app.post("/api/courses/:courseId", createCourse)
    app.put("/api/courses/:courseId", updateCourse)
    app.delete("/api/courses/:courseId", deleteCourse)
}
