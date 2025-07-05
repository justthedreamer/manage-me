namespace API.Middleware;

using System.Net;
using System.Security.Authentication;

public class ExceptionMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await next(httpContext);
        }
        catch (Exception e)
        {
            HandleExceptionAsync(httpContext, e);
        }
    }

    private static void HandleExceptionAsync(HttpContext httpContext, Exception exception)
    {
        httpContext.Response.ContentType = "application/json";

        switch (exception)
        {
            case InvalidOperationException:
            {
                var response = new { message = exception.Message };
                var json = System.Text.Json.JsonSerializer.Serialize(response);

                httpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                httpContext.Response.WriteAsync(json);
                break;
            }
            case InvalidCredentialException:
            {
                var response = new { message = exception.Message };
                var json = System.Text.Json.JsonSerializer.Serialize(response);

                httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                httpContext.Response.WriteAsync(json);
                break;
            }
            default:
            {
                var response = new { message = "An unexpected error occurred." };
                var json = System.Text.Json.JsonSerializer.Serialize(response);

                httpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                httpContext.Response.WriteAsync(json);
                break;
            }
        }
    }
}