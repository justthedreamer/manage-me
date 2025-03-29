import type {Project} from "../model/Project.ts";

export const projectMock: Project = {
    id: "51c02075-c190-4437-8f24-c49949c06f62",
    name: "Tiramisu",
    description: "Ulubione przepisy w jednym miejscu.",
    stories: []
}

export const projectsMock: Project[] = [
    projectMock,
    {
        id: "fa81c411-47b5-4e7a-a279-e5ac496c7fb3",
        name: "AttendMe",
        description: "Zapisz obecność przy pomocy kod QR.",
        stories: []
    }
]
