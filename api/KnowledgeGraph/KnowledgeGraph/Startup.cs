using KnowledgeGraph.Common;
using KnowledgeGraph.DataTransferObjects;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.IO;

namespace KnowledgeGraph
{
    /// <summary>
    /// Defines the configuration of the Web API applicaiton
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Startup"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        /// <param name="hostingEnvironment">The hosting environment.</param>
        public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment) {
            HostingEnvironment = hostingEnvironment;
            Configuration = configuration;
        }

        /// <summary>
        /// Gets the hosting environment.
        /// </summary>
        /// <value>
        /// The hosting environment.
        /// </value>
        public IHostingEnvironment HostingEnvironment { get; }

        /// <summary>
        /// Gets the configuration.
        /// </summary>
        /// <value>
        /// The configuration.
        /// </value>
        public IConfiguration Configuration { get; }


        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services">The services.</param>
        public void ConfigureServices(IServiceCollection services) {

            // SWAGGER: Register the swagger generator for a single document V1
            services.AddSwaggerGen(ConfigureSwaggerUI);

            // Configure CORS Policy
            //https://weblog.west-wind.com/posts/2016/sep/26/aspnet-core-and-cors-gotchas
            services.AddCors(options =>
            {
                options.AddPolicy(Constants.CORSPolicy,
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.AddMvc(config => config.Filters.Add(typeof(GlobalExceptionHandler)));

            // Add support for injection of IOptions<T>
            services.AddOptions();            

            // Add the class that represnets the settings for the Settings section 
            // in the JSON settings
            services.Configure<Settings>(Configuration.GetSection("Settings"));

            // Support Generic IConfiguration access for generic string access
            services.AddSingleton<IConfiguration>(Configuration);
        }

        /// <summary>
        /// SWAGGER: Configures the swagger UI.
        /// </summary>
        /// <param name="swaggerGenOptions">The swagger gen options.</param>
        private void ConfigureSwaggerUI(SwaggerGenOptions swaggerGenOptions) {
            swaggerGenOptions.SwaggerDoc("v1", new Info { Title = "KnowledgeGraph", Version = "v1" });

            var filePath = Path.Combine(HostingEnvironment.ContentRootPath, "KnowledgeGraphSwagger.config");
            swaggerGenOptions.IncludeXmlComments(filePath);
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app">The application.</param>
        /// <param name="env">The env.</param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment() || env.EnvironmentName == "Private") {
                app.UseDeveloperExceptionPage();
            }

            // Use CORS Policy
            app.UseCors(Constants.CORSPolicy);

            app.UseMvc();

            // SWAGGER: Insert middleware to expose the generated Swagger as JSON endpoints
            app.UseSwagger(c => {
                c.PreSerializeFilters.Add((swaggerDoc, httpReq) => {
                    // Necessary for API management so it has the proper values for the Backend service URL otherwise 
                    // you will see an error in trace similar to "Backend service URL is not defined"
                    swaggerDoc.Host = httpReq.Host.Value;
                });
            });

            // SWAGGER: swagger-ui-middleware to expose interactive documentation
            app.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Knowledge Graph Swagger");
            });

        }
    }
}
