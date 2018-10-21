using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace QPoster.WebSockets
{
    public class NotificationSocketHandler : WebSocketHandler
    {
        public NotificationSocketHandler(ConnectionManager manager) : base (manager) { }
               
        //public override async Task ReceiveAsync(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        //{
        //    try
        //    {
        //        var buffetData = Encoding.UTF8.GetString(buffer).Trim('\0', ' ').Split('|');

        //        int terminalId = int.Parse(buffetData[0]);
        //        int tableId = int.Parse(buffetData[1]);
                
        //        await SendMessageToTerminalAsync(terminalId, tableId);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public async Task SendMessageToTerminalAsync(int terminalId, int tableId)
        //{
        //    var socket = ConnectionManager.Connections.Where(i => i.Key.TerminalId == terminalId).First();

        //    var jsonResponse = JsonConvert.SerializeObject(JsonConvert.SerializeObject(new { terminalId, tableId }));
            
        //    await SendMessageAsync(jsonResponse, socket.Value, terminalId, );
        //}
    }
}
