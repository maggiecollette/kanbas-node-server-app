import model from "./model.js";
export const createModule = (module) => {
  delete module._id
  return model.create(module);
}
export const findModulesByCourseId = (courseId) => model.find({course: courseId});
export const findModuleById = (moduleId) => model.findById(moduleId);
export const updateModule = (moduleId, module) => model.updateOne({ id: moduleId }, { $set: module });
export const deleteModule = (moduleId) => model.deleteOne({ id: moduleId });