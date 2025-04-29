import {PROJECTS_KEY} from "../config/LocalstorageKeys.ts";
import {projectsMock} from "../mocks/ProjectMocks.ts";

/**
 * Mocking project in local storage.
 */
export const seedProjectsInLocalStorage: () => void = () => {
    if (!localStorage.getItem(PROJECTS_KEY)) {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projectsMock));
    }
}