namespace API.Database;

using MongoDB.Driver;

public static class Extensions
{
    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        var settings = new MongoDbSettings();
        configuration.GetSection("MongoDbSettings").Bind(settings);
        settings.Validate();

        var client = new MongoClient(settings.ConnectionString);
        services.AddSingleton<IMongoClient>(client);

        services.Configure<MongoDbSettings>(configuration.GetSection("MongoDbSettings"));
        return services;
    }
}