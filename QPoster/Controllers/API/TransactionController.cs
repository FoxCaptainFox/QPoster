using Microsoft.AspNetCore.Mvc;
using QPoster.Database;
using QPoster.Database.Models;
using QPoster.Models.RequestModels;
using QPoster.Services.Interfaces;
using QPoster.WebSockets;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QPoster.Controllers.API
{
    [Route("api/[controller]")]
    public class TransactionController : _BaseApiController
    {
        private IRepository<Transaction> _transactionsRepository;
        private IRepository<TransactionProducts> _transactionProductsRepository;
        private ITransactionService _transactionService;
        private WebSocketHandler _webSocketHandler;
        private ConnectionManager _connectionManager;

        public TransactionController(IRepository<Transaction> transactionsRepository, IRepository<TransactionProducts> transactionProductsRepository,
            ITransactionService transactionService, WebSocketHandler webSocketHandler, ConnectionManager connectionManager)
        {
            _transactionsRepository = transactionsRepository;
            _transactionProductsRepository = transactionProductsRepository;
            _transactionService = transactionService;
            _webSocketHandler = webSocketHandler;
            _connectionManager = connectionManager;
        }

        [HttpPost("AddTransaction")]
        public async Task<IActionResult> AddTransaction(CreateTransactionRequestModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    throw new Exception("Invalid model");

                var posterResponse = await _transactionService.CreateTransaction(model);

                return Content(200, posterResponse);
            }
            catch (Exception ex)
            {
                return Content(400, ex);
            }
        }

        [HttpGet("CallWaiter")]
        public async Task<IActionResult> CallWaiter(int tableId)
        {
            try
            {
                var socketKey = _connectionManager.Connections.Keys.Where(i => i.TableId == tableId).FirstOrDefault();
                var socket = _connectionManager.Connections[socketKey];

                if (socket != null)
                    await _webSocketHandler.SendMessageAsync(tableId.ToString(), socket);
                else
                    throw new Exception();

                return Ok();
            }
            catch (Exception ex)
            {
                return Content(400, ex);
            }
        }
    }
}