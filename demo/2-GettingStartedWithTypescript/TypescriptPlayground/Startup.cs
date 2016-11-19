using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TypescriptPlayground.Startup))]
namespace TypescriptPlayground
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {}
    }
}
