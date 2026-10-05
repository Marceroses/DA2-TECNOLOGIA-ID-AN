using System.Reflection;
using Cine.Plugins;

namespace Cine;

public static class PluginLoader
{
    public static List<IMoviePlugin> LoadPlugins()
    {
        var pluginsDirectory = Path.Combine(AppContext.BaseDirectory, "Plugins");
        if (!Directory.Exists(pluginsDirectory))
        {
            pluginsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Plugins");
        }

        var plugins = new List<IMoviePlugin>();
        if (!Directory.Exists(pluginsDirectory))
        {
            return plugins;
        }

        foreach (var dllPath in Directory.GetFiles(pluginsDirectory, "*.dll").OrderBy(path => path))
        {
            var assembly = Assembly.LoadFrom(dllPath);

            var pluginTypes = assembly
                .GetTypes()
                .Where(type =>
                    typeof(IMoviePlugin).IsAssignableFrom(type) &&
                    !type.IsInterface &&
                    !type.IsAbstract);

            foreach (var pluginType in pluginTypes)
            {
                if (Activator.CreateInstance(pluginType) is IMoviePlugin plugin)
                {
                    plugins.Add(plugin);
                }
            }
        }

        return plugins.OrderBy(plugin => plugin.Name).ToList();
    }
}
