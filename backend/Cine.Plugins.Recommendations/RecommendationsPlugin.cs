using Cine.Plugins;

namespace Cine.Plugins.Recommendations;

public class RecommendationsPlugin : IMoviePlugin
{
    public string Name => "Movie Recommendations";

    public string Execute()
    {
        return "Recommended: Inception, The Matrix, Spirited Away";
    }
}
