using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;


namespace QPoster.WebSockets
{
    public class ConnectionManager
    {
        public ConcurrentDictionary<ConnectionKey, WebSocket> Connections { get; private set; } = new ConcurrentDictionary<ConnectionKey, WebSocket>();

        public bool TryAdd(ConnectionKey key, WebSocket socket)
        {
            return Connections.TryAdd(key, socket);
        }

        public ConnectionKey GetKeyBySocket(WebSocket socket)
        {
            return Connections.FirstOrDefault(s => s.Value == socket).Key;
        }

        public async Task RemoveSocketAsync(WebSocket socket)
        {
            WebSocket sock;
            Connections.TryRemove(Connections.FirstOrDefault(s => s.Value == socket).Key, out sock);

            if (sock != null)
            {
                await sock.CloseAsync(WebSocketCloseStatus.NormalClosure, "Connection closed", CancellationToken.None);
            }
        }

        public override bool Equals(object obj)
        {
            var manager = obj as ConnectionManager;
            return manager != null &&
                   EqualityComparer<ConcurrentDictionary<ConnectionKey, WebSocket>>.Default.Equals(Connections, manager.Connections);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Connections);
        }
    }
}
