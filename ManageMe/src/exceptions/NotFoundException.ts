export class NotFoundException<TEntity> extends Error {
    constructor(entity: new () => TEntity, id?: string) {
        const entityName = entity.name;
        const message = id ? `${entityName} with ID: ${id} was not found` : `${entityName} was not found`;
        
        super(message);
        this.name = "NotFoundException";
    }
}