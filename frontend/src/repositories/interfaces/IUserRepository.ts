import type {IRepository} from "./IRepository.ts";
import type {UUIDTypes} from "uuid";
import type {User} from "../../model/entities/User.ts";

export interface IUserRepository extends IRepository<User, UUIDTypes> {
    getAll(): User[]
}