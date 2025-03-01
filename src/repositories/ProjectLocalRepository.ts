import type {IRepository} from "./IRepository";
import {Project} from "../model/Project";

export class ProjectLocalRepository implements IRepository<Project, number> {
    private readonly projectKey: string = "projects"

    add(entity: Project): void {
        this.initProjectStorageIfNotExist()

        const projects = this.getProjectsFromLocalStorage();

        this.ensureProjectDoesntExist(entity.id, projects)

        projects.push(entity)

        localStorage.setItem(this.projectKey, JSON.stringify(projects))
    }

    getById(id: number): Project | null {
        const projects = this.getProjectsFromLocalStorage();
        const project = projects.find(project => project.id === id);
        return project ?? null;
    }

    remove(id: number): void {
        const projects = this.getProjectsFromLocalStorage();
        const filtered = projects.filter(project => project.id !== id);

        if (projects.length === filtered.length) {
            throw new ProjectNotFoundException(id)
        }

        localStorage.setItem(this.projectKey, JSON.stringify(filtered))
    }

    update(entity: Project): void {
        const projects = this.getProjectsFromLocalStorage();
        const project = projects.filter(project => project.id === entity.id)

        if (!project) {
            throw new ProjectNotFoundException(entity.id)
        }

        const filtered = projects.filter(project => project.id !== entity.id)
        filtered.push(entity)
        localStorage.setItem(this.projectKey, JSON.stringify(filtered))
    }

    private getProjectsFromLocalStorage(): Array<Project> {
        const stringify = localStorage.getItem(this.projectKey);
        const projects = this.restoreProjects(stringify!);
        return projects;
    }

    private ensureProjectDoesntExist(id: number, projects: Project[]): void {
        if (projects.some(project => project.id === id)) {
            throw new Error("Project already exists.")
        }
    }

    private initProjectStorageIfNotExist(): void {
        if (!localStorage.getItem(this.projectKey)) {
            localStorage.setItem(this.projectKey, JSON.stringify([]))
        }
    }

    private restoreProjects(stringify: string): Project[] {
        const parsed = JSON.parse(stringify) as Project[];
        return parsed;
    }
}