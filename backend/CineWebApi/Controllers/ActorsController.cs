using Cine.BusinessLogic.Abstractions;
using Cine.Contracts;
using Cine.Mappings;
using Microsoft.AspNetCore.Mvc;

namespace Cine.Controllers;

[Route("api/[controller]")]
[ApiController]
public sealed class ActorsController(IActorService actorService) : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<ActorDto>> GetAll()
    {
        return Ok(actorService.GetAll().Select(actor => actor.ToDto()));
    }

    [HttpGet("{id:int}")]
    public ActionResult<ActorDto> GetById([FromRoute] int id)
    {
        var actor = actorService.GetById(id);
        if (actor is null)
        {
            return NotFound();
        }

        return Ok(actor.ToDto());
    }
}