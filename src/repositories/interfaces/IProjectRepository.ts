import type {IRepository} from "./IRepository.ts";
import type {Project} from "../../model/Project.ts";
import type {UUIDTypes} from "uuid";


export interface IProjectRepository extends IRepository<Project, UUIDTypes> {
    getAll(): Project[];
}