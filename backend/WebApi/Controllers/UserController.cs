namespace API.Controllers;

using global::API.API;
using global::API.Database.Entities;
using global::API.Database.Repositories.Interfaces;
using global::API.DTO.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/users")]
public class UserController(IUserRepository userRepository) : ControllerBase
{
    [Authorize]
    [HttpGet("find")]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsersByRole(
        [FromQuery] bool isDevops,
        [FromQuery] bool isDeveloper,
        [FromQuery] string? searchingPhrase = null)
    {
        return this.Ok(
            (await userRepository.GetUsersByRoleAsync(
                new GetUsersByRolesRequest(isDevops, isDeveloper, searchingPhrase))).Select(
                UserDto.FromUser));
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetUser()
    {
        var userLogin = this.GetUserLogin();

        if (userLogin is null)
        {
            return this.BadRequest("Cannot find user id claim.");
        }

        var user = await userRepository.GetUserByLoginAsync(userLogin);

        if (user is null)
        {
            return this.Unauthorized();
        }

        return this.Ok(UserDto.FromUser(user));
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<UserDto>> GetUserById(Guid id)
    {
        return this.Ok(UserDto.FromUser(await userRepository.GetByIdAsync(id)));
    }
}