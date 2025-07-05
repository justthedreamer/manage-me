namespace API.Controllers;

using Microsoft.AspNetCore.Mvc;

public static class Extensions
{
    public static string GetUserLogin(this ControllerBase controller) => controller.User.Identity!.Name!;
}