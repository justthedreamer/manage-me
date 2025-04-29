import type {IUserRepository} from "./interfaces/IUserRepository.ts";
import type {UUIDTypes} from "uuid";
import {User} from "../model/entities/User.ts";
import {usersMocks} from "../mocks/UserMocks.ts";

export class UserLocalRepository implements IUserRepository {
    getById(id: UUIDTypes): User | null {
        return usersMocks.find((user) => user.id === id) ?? null;
    }

    add(entity: User) {
        console.log(entity)
        throw new Error("Method not implemented.");
    }

    update(entity: User) {
        console.log(entity)
        throw new Error("Method not implemented.");
    }

    remove(id: UUIDTypes) {
        console.log(id)
        throw new Error("Method not implemented.");
    }

    getAll(): User[] {
        return usersMocks;
    }
}