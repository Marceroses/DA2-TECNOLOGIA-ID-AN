using Cine.Plugins;

namespace Cine.Plugins.ClassicMovies;

public class ClassicMoviesPlugin : IMoviePlugin
{
    public string Name => "Classic Movies";

    public string Execute()
    {
        return "Classics: Casablanca, The Godfather, Psycho";
    }
}
