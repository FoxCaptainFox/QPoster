using Microsoft.AspNetCore.Mvc;
using QPoster.Database;
using QPoster.Database.Models;
using System;
using System.Threading.Tasks;

namespace QPoster.Controllers.API
{
    [Route("api/[controller]")]
    public class TransactionController : _BaseApiController
    {
        private IRepository<Transaction> _transactionsRepository;
        private IRepository<TransactionProducts> _transactionProductsRepository;

        public TransactionController(IRepository<Transaction> transactionsRepository, IRepository<TransactionProducts> transactionProductsRepository)
        {
            _transactionsRepository = transactionsRepository;
            _transactionProductsRepository = transactionProductsRepository;
        }

        [HttpPost("AddTransaction")]
        public async Task<IActionResult> AddTransaction(/*model*/)
        {
            try
            {


                return Content(200, "abc");
            }
            catch (Exception ex)
            {
                return Content(400, ex);
            }
        }

        // todo: add product to transaction

        // todo: 
    }
}