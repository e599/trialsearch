using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace KnowledgeGraph
{
    /// <summary>
    /// The Program class. Set options and initialization.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// The Main method to run the application.  Set options.
        /// </summary>
        /// <param name="args">Command line arguments.</param>
        public static void Main(string[] args) {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("hosting.json", optional: true)
                .Build();

            var host = CreateWebHostBuilder(args)
                .UseKestrel()
                .UseConfiguration(config)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }

        /// <summary>
        /// Create the Web Host Builder.
        /// </summary>
        /// <param name="args">The command line arguments.</param>
        /// <returns>The Web Host Builder.</returns>
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
