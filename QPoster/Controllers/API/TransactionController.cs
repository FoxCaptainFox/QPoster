using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using QPoster.Database;
using QPoster.Database.Models;
using QPoster.Models.RequestModels;
using QPoster.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QPoster.Controllers.API
{
	[Route("api/[controller]")]
	public class TransactionController : _BaseApiController
	{
		private IRepository<Transaction> _transactionsRepository;
		private IRepository<TransactionProducts> _transactionProductsRepository;
		private ITransactionService _transactionService;

		public TransactionController(IRepository<Transaction> transactionsRepository, IRepository<TransactionProducts> transactionProductsRepository,
			ITransactionService transactionService)
		{
			_transactionsRepository = transactionsRepository;
			_transactionProductsRepository = transactionProductsRepository;
			_transactionService = transactionService;
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
				if(!ModelState.IsValid)
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
}