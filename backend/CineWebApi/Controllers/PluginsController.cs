using Microsoft.AspNetCore.Mvc;

namespace Cine.Controllers;

[Route("api/plugins")]
[ApiController]
public sealed class PluginsController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<PluginResponse>> Get()
    {
        var plugins = PluginLoader.LoadPlugins()
            .Select(plugin => new PluginResponse(plugin.Name, plugin.Execute()));

        return Ok(plugins);
    }
}

public sealed record PluginResponse(string Name, string Response);
