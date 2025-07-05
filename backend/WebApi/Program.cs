using API.Auth;
using API.Database;
using API.Extensions;
using API.Middleware;
using API.Repositories;
using API.Seed;
using API.Services;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;

var builder = WebApplication.CreateBuilder(args);

BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.Standard));

builder.Services.AddLogging(builder => builder.AddSystemdConsole(options => { options.IncludeScopes = true; }));
builder.Services.AddAuth(builder.Configuration);
builder.Services.AddDatabase(builder.Configuration);
builder.Services.AddRepositories();
builder.Services.AddServices();
builder.Services.AddAuthorization();
builder.Services.AddHostedService<DatabaseInitializer>();
builder.Services.AddCors(AllowFrontendCorsPolicy.Configure);
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(AllowFrontendCorsPolicy.POLICY_NAME);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();