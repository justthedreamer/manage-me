import {Project} from "../model/entities/Project.ts"; // adjust path as needed

export function createMockProject(
    id: string,
    name: string,
    description: string,
    stories = []
): Project {
    return new Project(id, name, description, stories);
}

export const projectMock = createMockProject(
    "51c02075-c190-4437-8f24-c49949c06f62",
    "Tiramisu",
    "Ulubione przepisy w jednym miejscu."
);

export const projectsMock = [
    projectMock,
    createMockProject(
        "fa81c411-47b5-4e7a-a279-e5ac496c7fb3",
        "AttendMe",
        "Zapisz obecność przy pomocy kod QR."
    )
];