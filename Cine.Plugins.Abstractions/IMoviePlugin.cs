namespace Cine.Plugins;

public interface IMoviePlugin
{
    string Name { get; }

    string Execute();
}
