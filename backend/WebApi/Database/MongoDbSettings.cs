namespace API.Database;

using global::API.Database.Entities;

public class MongoDbSettings
{
    public string ConnectionString { get; init; }
    public string DatabaseName { get; init; }
    public string UserCollectionName { get; init; }
    public string ProjectCollectionName { get; init; }
    public string TaskCollectionName { get; init; }
    public string StoryCollectionName { get; init; }

    public string GetCollectionName<TEntity>()
    {
        var type = typeof(TEntity);

        switch (type)
        {
            case Type when type == typeof(User):
                return this.UserCollectionName;
            case Type when type == typeof(Project):
                return this.ProjectCollectionName;
            case Type when type == typeof(Story):
                return this.StoryCollectionName;
            case Type when type == typeof(Task):
                return this.TaskCollectionName;
            default:
                throw new InvalidOperationException($"Unknown entity type: {type.Name}");
        }
    }

    public void Validate()
    {
        if (string.IsNullOrEmpty(this.ConnectionString))
        {
            throw new InvalidOperationException("Connection string is required.");
        }

        if (string.IsNullOrEmpty(this.DatabaseName))
        {
            throw new InvalidOperationException("Database name is required.");
        }

        if (string.IsNullOrEmpty(this.UserCollectionName))
        {
            throw new InvalidOperationException("User name is required.");
        }

        if (string.IsNullOrEmpty(this.ProjectCollectionName))
        {
            throw new InvalidOperationException("Project name is required.");
        }

        if (string.IsNullOrEmpty(this.TaskCollectionName))
        {
            throw new InvalidOperationException("Task name is required.");
        }

        if (string.IsNullOrEmpty(this.StoryCollectionName))
        {
            throw new InvalidOperationException("Story name is required.");
        }
    }
}