/**
 *Generic repository interface.
 */
export interface IRepository<TEntity, EntityKeyType> {
    /**
     * Gets entity by its unique ID.
     * @param {EntityKeyType} id - Unique entity ID.
     * @returns {TEntity | null} - Entity or null if was not found.
     */
    getById(id: EntityKeyType): TEntity | null;

    /**
     *Adds entity to the repository.
     * @param {TEntity} entity - Entity to add.
     * @throws {AlreadyExistsError} - If entity already exists.
     */
    add(entity: TEntity): void;

    /**
     *Updates entity in repository.
     * @param {TEntity} entity
     * @throws {NotFoundError} - If entity was not found.
     */
    update(entity: TEntity): void;

    /**
     *Removes entity from repository.
     * @param {EntityKeyType} id
     * @throws {NotFoundError} - If entity was not found.
     */
    remove(id: EntityKeyType): void;
}
