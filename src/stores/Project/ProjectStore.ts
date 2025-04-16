import type {Project} from "../../model/Project.ts";
import {defineStore} from "pinia";
import {projectRepository} from "../../repositories";
import {useUserStore} from "../User/UserStore.ts";
import type {Story} from "../../model/Story.ts";
import {newGuid} from "../../helpers/GuidHelper.ts";
import {useUIMessageStore} from "../Common/UIMessageStore.ts";

export interface ProjectState {
    allAssociatedProjects: Project[]
    attachedProject: Project | null
}

export const useProjectStore = defineStore('project', {
    state: (): ProjectState => {
        return {
            allAssociatedProjects: [],
            attachedProject: null,
        }
    },
    actions: {
        syncAttachedProject() {
            const userStore = useUserStore();
            if (!userStore.user) return;
            if (!userStore.user.attachedProjectId) return;

            this.attachedProject = projectRepository.getById(userStore.user.attachedProjectId)
        },

        syncAllAssociatedProjects() {
            this.allAssociatedProjects = projectRepository.getAll()
        },

        addProjectStory(story: Omit<Story, 'id' | 'createdAt' | 'userId' | 'projectId'>) {
            ensureProjectAttached(this.attachedProject)

            const userStore = useUserStore();
            const user = userStore.getUserSession;

            const newStory: Story = {
                id: newGuid(),
                createdAt: new Date(),
                userId: user.id,
                projectId: this.attachedProject!.id,
                ...story,
            }

            this.attachedProject.stories.push(newStory);
            this.updateAttachedProject();
        },

        removeProjectStory(story: Story): void {
            this.attachedProject!.stories.splice(this.attachedProject!.stories.indexOf(story), 1);
            this.updateAttachedProject();
        },

        updateAttachedProject(): void {
            ensureProjectAttached(this.attachedProject)
            projectRepository.update(this.attachedProject)
        },
    }
})

function ensureProjectAttached(attachedProject: Project | null): asserts attachedProject {
    const messageStore = useUIMessageStore();

    if (!attachedProject) {
        messageStore.queue({
            type: "failure",
            message: "Project is not attached.",
        })
        throw new Error("Project is not attached.");
    }
}
