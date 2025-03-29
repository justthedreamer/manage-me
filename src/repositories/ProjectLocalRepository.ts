import {AlreadyExistsError} from "../errors/AlreadyExistsError";
import {NotFoundError} from "../errors/NotFoundError";
import type {Project} from "../model/Project";
import type {IProjectRepository} from "./interfaces/IProjectRepository.ts";
import {PROJECTS_LOCALSTORAGE_KEY} from "../config/LocalstorageKeys.ts";
import type {UUIDTypes} from "uuid";

/**
 * Project repository implementation.
 * Repository uses localstorage as data persistence.
 * @see IRepository
 */
export class ProjectLocalRepository implements IProjectRepository {
    getAll(): Project[] {
        return this.getAllProjectsFromLocalStorage();
    }

    /**
     * Adds a new project to the repository.
     * Implements IRepository.add.
     * @param entity The project to add.
     * @throws AlreadyExistsError if a project with the same ID already exists.
     */
    add(entity: Project): void {
        const projects = this.getAllProjectsFromLocalStorage();
        this.ensureProjectDoesntExist(entity.id, projects);
        projects.push(entity);

        localStorage.setItem(PROJECTS_LOCALSTORAGE_KEY, JSON.stringify(projects));
    }

    /**
     * Retrieves a project by its ID.
     * Implements IRepository.getById.
     * @param id The ID of the project to retrieve.
     * @returns The project if found, otherwise null.
     */
    getById(id: UUIDTypes): Project | null {
        const projects = this.getAllProjectsFromLocalStorage();
        const project = projects.find((project) => project.id === id);

        return project ?? null;
    }

    /**
     * Updates an existing project in the repository.
     * Implements IRepository.update.
     * @param entity The project with updated information.
     * @throws NotFoundError if no project with the given ID exists.
     */
    update(entity: Project): void {
        const projects = this.getAllProjectsFromLocalStorage();
        const index = projects.findIndex((project) => project.id === entity.id);

        if (index === -1) {
            throw new NotFoundError(`Project with ID: ${entity.id} was not found.`);
        }

        projects[index] = entity;
        localStorage.setItem(PROJECTS_LOCALSTORAGE_KEY, JSON.stringify(projects));
    }

    /**
     * Removes a project from the repository by ID.
     * Implements IRepository.remove.
     * @param id The ID of the project to remove.
     * @throws NotFoundError if no project with the given ID exists.
     */
    remove(id: UUIDTypes): void {
        const projects = this.getAllProjectsFromLocalStorage();
        const filtered = projects.filter((project) => project.id !== id);

        if (projects.length === filtered.length) {
            throw new NotFoundError(`Project with ID: ${id} was not found.`);
        }

        localStorage.setItem(PROJECTS_LOCALSTORAGE_KEY, JSON.stringify(filtered));
    }

    private getAllProjectsFromLocalStorage(): Project[] {
        const projectsJSON = localStorage.getItem(PROJECTS_LOCALSTORAGE_KEY) ?? "[]";

        return this.mapProjectsInJsonToProjectsArray(projectsJSON);
    }

    private mapProjectsInJsonToProjectsArray(projectsJSON: string): Project[] {
        try {
            return JSON.parse(projectsJSON) as Project[];
        } catch (error) {
            console.error("Error parsing projects:", error);
            return [];
        }
    }

    private ensureProjectDoesntExist(id: UUIDTypes, projects: Project[]): void {
        if (projects.some((project) => project.id === id)) {
            throw new AlreadyExistsError("Project already exists.");
        }
    }
}
