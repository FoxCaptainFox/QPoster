using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace QPoster.WebSockets
{
    public abstract class WebSocketHandler
    {
        protected ConnectionManager ConnectionManager { get; set; }

        public WebSocketHandler(ConnectionManager manager)
        {
            ConnectionManager = manager;
        }

        public virtual async Task<bool> Connect(ConnectionKey key, WebSocket socket)
        {
            return ConnectionManager.TryAdd(key, socket);
        }

        public virtual async Task Disconnect(WebSocket socket)
        {
            await ConnectionManager.RemoveSocketAsync(socket);
        }

        public async Task SendMessageAsync(string message, WebSocket socket)
        {
            if (socket.State != WebSocketState.Open)
            {
                await ConnectionManager.RemoveSocketAsync(socket);
                return;
            }

            var bytes = Encoding.UTF8.GetBytes(message);
            await socket.SendAsync(new ArraySegment<byte>(array: bytes,
                                                          offset: 0,
                                                          count: bytes.Length),
                                   WebSocketMessageType.Text,
                                   true,
                                   CancellationToken.None);
        }

        public abstract Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
}
