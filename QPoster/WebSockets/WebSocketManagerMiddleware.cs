using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace QPoster.WebSockets
{
    public class WebSocketManagerMiddleware
    {
        private readonly RequestDelegate _next;
        private WebSocketHandler _webSocketHandler { get; set; }
        private IServiceProvider _serviceProvider { get; set; }

        public WebSocketManagerMiddleware(RequestDelegate next, WebSocketHandler webSocketHandler, IServiceProvider serviceProvider)
        {
            _next = next;
            _webSocketHandler = webSocketHandler;
            _serviceProvider = serviceProvider;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
                return;
            
            StringValues token = "";
            bool tokenResult = context.Request.Headers.TryGetValue("Sec-WebSocket-Protocol", out token);

            if (!tokenResult || string.IsNullOrEmpty(token))
                return;

            var socket = await context.WebSockets.AcceptWebSocketAsync(token);

            var socketSubProtocol = socket.SubProtocol.ToString().Split('|');

            bool connectionResult = await _webSocketHandler.Connect(new ConnectionKey
            {
                TerminalId = int.Parse(socketSubProtocol[0]),
                AccountName = socketSubProtocol[1]
            }, socket);

            if (!connectionResult)
            {
                await socket.CloseAsync(WebSocketCloseStatus.ProtocolError, "Connection failed", CancellationToken.None);
                return;
            }
            
            await Receive(socket, async (result, buffer) =>
            {
                if (result.MessageType == WebSocketMessageType.Text)
                {
                    await _webSocketHandler.ReceiveAsync(socket, result, buffer);
                    return;
                }
                else if (result.MessageType == WebSocketMessageType.Close)
                {
                    await _webSocketHandler.Disconnect(socket);
                    return;
                }
            });
        }
        
        private async Task Receive(WebSocket socket, Action<WebSocketReceiveResult, byte[]> messageHandler)
        {
            var buffer = new byte[1024 * 4];

            while (socket.State == WebSocketState.Open)
            {
                Array.Clear(buffer, 0, buffer.Length);

                var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                messageHandler(result, buffer);
            }
        }

    }
}
