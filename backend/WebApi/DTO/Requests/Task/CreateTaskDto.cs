namespace API.DTO.Requests.Task;

using System.ComponentModel.DataAnnotations;
using global::API.Database.Entities.Enums;

public class CreateTaskDto
{
    [Required]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public Priority Priority { get; set; }

    [Required]
    public int EstimatedFinishTimeHours { get; set; }
}