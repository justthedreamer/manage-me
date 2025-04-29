import {AlreadyExistsError} from "../errors/AlreadyExistsError";
import {NotFoundError} from "../errors/NotFoundError";
import {Project} from "../model/entities/Project.ts";
import type {IProjectRepository} from "./interfaces/IProjectRepository.ts";
import {PROJECTS_LOCALSTORAGE_KEY} from "../config/LocalstorageKeys.ts";
import type {UUIDTypes} from "uuid";
import {useUserStore} from "../stores/user/UserStore.ts";
import {assertProjectDefined} from "../helpers/Guards.ts";

export class ProjectLocalRepository implements IProjectRepository {
    getAll(): Project[] {
        return this.loadProjects();
    }

    getById(id: UUIDTypes): Project | null {
        const projects = this.loadProjects();
        return projects.find(project => project.id === id) ?? null;
    }

    add(entity: Project): void {
        const projects = this.loadProjects();

        if (this.projectExists(entity.id, projects)) {
            throw new AlreadyExistsError("project already exists.");
        }

        projects.push(entity);
        this.saveProjects(projects);
    }

    update(entity: Project): void {
        const projects = this.loadProjects();
        const index = projects.findIndex(project => project.id === entity.id);

        if (index === -1) {
            throw new NotFoundError(`Project with ID: ${entity.id} was not found.`);
        }

        projects[index] = entity;
        this.saveProjects(projects);
    }

    updateAttachedProject() {
        const attachedProject = useUserStore().attachedProject;
        assertProjectDefined(attachedProject)
        this.update(attachedProject)
    }

    remove(id: UUIDTypes): void {
        const projects = this.loadProjects();
        const updatedProjects = projects.filter(project => project.id !== id);

        if (projects.length === updatedProjects.length) {
            throw new NotFoundError(`Project with ID: ${id} was not found.`);
        }

        this.saveProjects(updatedProjects);
    }

    private loadProjects(): Project[] {
        const raw = localStorage.getItem(PROJECTS_LOCALSTORAGE_KEY) ?? "[]";

        try {
            return JSON.parse(raw).map(Project.fromJSON);
        } catch (error) {
            console.error("Failed to parse projects:", error);
            return [];
        }
    }

    private saveProjects(projects: Project[]): void {
        localStorage.setItem(PROJECTS_LOCALSTORAGE_KEY, JSON.stringify(projects));
    }

    private projectExists(id: UUIDTypes, projects: Project[]): boolean {
        return projects.some(project => project.id === id);
    }
}