import {ProjectLocalRepository} from "./ProjectLocalRepository.ts";
import type {IProjectRepository} from "./interfaces/IProjectRepository.ts";

export const projectRepository: IProjectRepository = new ProjectLocalRepository();