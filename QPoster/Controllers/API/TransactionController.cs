﻿using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QPoster.Database;
using QPoster.Database.Models;
using QPoster.Models.RequestModels;
using QPoster.Services.Interfaces;
using QPoster.WebSockets;
using System;
using System.Collections.Generic;
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
		public async Task<IActionResult> AddTransaction([FromBody] AddTransactionRequestModel model)
		{
			try
			{
				if (!ModelState.IsValid)
					throw new Exception("Invalid model");

				var posterResponse = await _transactionService.AddTransaction(model);

                return Content(200, posterResponse);
            }
            catch (Exception ex)
            {
                return Content(500, ex);
            }
        }

		[HttpPost("AddProducts")]
		public async Task<IActionResult> AddProducts([FromBody] List<AddProductsRequestModel> products)
		{
			try
			{
				if (!ModelState.IsValid)
					throw new Exception("Invalid model");

				await _transactionService.AddProductsAsync(products);

				return Content(200, null);
			}
			catch (Exception ex)
			{
				return Content(500, ex);
			}
		}
	}

	[HttpGet("CallWaiter")]
        public async Task<IActionResult> CallWaiter(int terminalId, int tableId)
        {
            try
            {
                var socketKey = _connectionManager.Connections.Keys.Where(i => i.TerminalId == terminalId).FirstOrDefault();
                var socket = _connectionManager.Connections[socketKey];

                var notificationMessage = new
                {
                    terminalId,
                    tableId
                };
                var json = JsonConvert.SerializeObject(notificationMessage);

                if (socket != null)
                    await _webSocketHandler.SendMessageAsync(json, socket);
                else
                    throw new Exception();

                return Ok();
            }
            catch (Exception ex)
            {
                return Content(500, ex);
            }
        }
    }
}