using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace QPoster.WebSockets
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder MapWebSocketManager(this IApplicationBuilder app, PathString path, WebSocketHandler handler)
        {
            return app.Map(path, (_app) => _app.UseMiddleware<WebSocketManagerMiddleware>(handler));
        }
    }
}
