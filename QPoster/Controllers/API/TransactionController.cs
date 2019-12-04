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
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace QPoster.Controllers.API
{
    [Route("api/[controller]")]
    public class TransactionController : _BaseApiController
    {
        private readonly IRepository<Transaction> _transactionsRepository;
        private readonly IRepository<TransactionProducts> _transactionProductsRepository;
        private readonly ITransactionService _transactionService;
        private readonly WebSocketHandler _webSocketHandler;
        private readonly ConnectionManager _connectionManager;

        public TransactionController(
            IRepository<Transaction> transactionsRepository,
            IRepository<TransactionProducts> transactionProductsRepository,
            ITransactionService transactionService,
            WebSocketHandler webSocketHandler,
            ConnectionManager connectionManager)
        {
            _transactionsRepository = transactionsRepository;
            _transactionProductsRepository = transactionProductsRepository;
            _transactionService = transactionService;
            _webSocketHandler = webSocketHandler;
            _connectionManager = connectionManager;
        }

		[HttpPost("AddTransaction")]
		public IActionResult AddTransaction([FromBody] AddTransactionRequestModel model)
		{
            if (!ModelState.IsValid)
            {
                throw new Exception("Invalid model");
            }

            try
			{
				var posterResponse = _transactionService.AddTransaction(model);
                return Ok(posterResponse);
            }
            catch (Exception ex)
            {
                return Content(500, ex);
            }
        }

		[HttpPost("AddProducts")]
		public IActionResult AddProducts([FromBody] AddProductsRequestModel[] products)
		{
            if (!ModelState.IsValid)
            {
                throw new Exception("Invalid model");
            }

            try
			{
				_transactionService.AddProductsAsync(products);
				return Ok();
			}
			catch (Exception ex)
			{
				return Content(500, ex);
			}
		}

		[HttpGet("GetProducts/{transactionId}")]
		public IActionResult GetProducts(int transactionId)
		{
			try
			{
				var result = _transactionService.GetProducts(transactionId);
				return Ok(result);
			}
			catch (Exception ex)
			{
				return Content(500, ex);
			}
		}

		[HttpGet("CallWaiter")]
        public IActionResult CallWaiter(int transactionId)
        {
            //try
            //{
            //    var transaction = _transactionsRepository.First(i => i.TransactionId == transactionId);

            //    var terminalId = transaction.SpotTabletId;

            //    var tableId = transaction.TableId;

            //    var accountName = transaction.AccountName;

            //    var socketKey = _connectionManager.Connections.Keys.Where(i => i.TerminalId == terminalId).FirstOrDefault();
            //    var socket = _connectionManager.Connections[socketKey];

            //    var notificationMessage = new { tableId };
            //    var json = JsonConvert.SerializeObject(notificationMessage);

            //    if (socket != null)
            //        await _webSocketHandler.SendMessageAsync(json, socket, terminalId, accountName);
            //    else
            //        throw new Exception();

            //    return Ok();
            //}
            //catch (Exception ex)
            //{
            //    return Content(500, ex);
            //}

            return Ok();
        }

        [HttpGet("GetRequest")]
        public async Task<IActionResult> GetRequest(string siteAdress)
        {
            //var client = new HttpClient();
            //return Ok(await (await client.GetAsync(siteAdress)).Content.ReadAsStringAsync());

            var uri = new Uri(siteAdress);

            switch(uri.Segments.Last())
            {
                case "menu.getCategories":
                    return Ok(new { response = new object[] {
                        new { Category_id = 0, Category_name = "Hot drinks", Category_photo = "" },
                        new { Category_id = 1, Category_name = "Cold drinks", Category_photo = "" },
                    }});
                case "menu.getProducts":
                    return Ok(new { response = new object[] {
                        new { Product_id = 0, Product_name = "Pasta", Photo = "", Price = 50, Product_production_description = "Pasta with pieces of meat", count = 0 },
                    }});
                case "settings.getCompanyName":
                    return Ok(new { response = new {
                        value = "Poesh vkusno",
                    }});
                case "settings.getAllSettings":
                    return Ok(new { response = new {
                        logo = "",
                    }});
                default:
                    return BadRequest();
            }
        }
    }
}
