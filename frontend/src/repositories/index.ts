import {ProjectLocalRepository} from "./ProjectLocalRepository.ts";
import type {IProjectRepository} from "./interfaces/IProjectRepository.ts";
import {UserLocalRepository} from "./UserLocalRepository.ts";

export const projectRepository: IProjectRepository = new ProjectLocalRepository();
export const userRepository = new UserLocalRepository();