using Cine.Plugins;

namespace Cine.Plugins.PopularMovies;

public class PopularMoviesPlugin : IMoviePlugin
{
    public string Name => "Popular Movies";

    public string Execute()
    {
        return "Popular: Dune, Barbie, Oppenheimer";
    }
}
