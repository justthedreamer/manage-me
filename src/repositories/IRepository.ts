export interface IRepository<TEntity, EntityKeyType> {
    getById(id: EntityKeyType): TEntity | null

    add(entity: TEntity): void

    update(entity: TEntity): void

    remove(id: EntityKeyType): void
}