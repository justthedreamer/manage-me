import {AlreadyExistsError} from "../errors/AlreadyExistsError";
import {NotFoundError} from "../errors/NotFoundError";
import type {Project} from "../model/Project";
import type {IProjectRepository} from "./interfaces/IProjectRepository.ts";
import {PROJECTS_LOCALSTORAGE_KEY} from "../config/LocalstorageKeys.ts";
import type {UUIDTypes} from "uuid";
import {TaskFactory} from "../factories/TaskFactory";

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
            throw new AlreadyExistsError("Project already exists.");
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
            const rawProjects = JSON.parse(raw) as Project[];

            rawProjects.forEach(project => {
                project.stories.forEach(story => {
                    story.createdAt = new Date(story.createdAt);

                    if (Array.isArray(story.tasks)) {
                        story.tasks = story.tasks.map(TaskFactory.fromJSON);
                    }
                });
            });
            return rawProjects;
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
