using Newtonsoft.Json;
using QPoster.Database;
using QPoster.Database.Models;
using QPoster.Enums;
using QPoster.Models.RequestModels;
using QPoster.Models.ResponseModels;
using QPoster.Services.Interfaces;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System;

namespace QPoster.Services
{
    public class TransactionService : ITransactionService
    {
        private IRepository<Transaction> _transactionRepository;
		private IRepository<TransactionProducts> _transactionProductsRepository;

		public TransactionService(IRepository<Transaction> transactionRepo, IRepository<TransactionProducts> transactionProductsRepository)
        {
            _transactionRepository = transactionRepo;
			_transactionProductsRepository = transactionProductsRepository;
		}

		public async Task AddProductsAsync(List<AddProductsRequestModel> products)
		{

			var client = new HttpClient();
			
			var transaction = _transactionRepository.Find(t => t.TransactionId == products.First().transactionId).First();

			var url = "https://" + transaction.AccountName + ".joinposter.com/api/transactions.addTransactionProduct?token=" + transaction.Token;
			
			foreach (var product in products)
			{
				TransactionProducts transactionProducts = new TransactionProducts()
				{
					Count = product.count,
					Price = product.price,
					ProductId = product.productId,
					TransactionId = product.transactionId,
					Name = product.name
				};
				PosterAddTransactionProductReqestModel posterModel = new PosterAddTransactionProductReqestModel()
				{
					product_id = product.productId,
					transaction_id = product.transactionId,
					spot_id = transaction.SpotId,
					spot_tablet_id = transaction.SpotTabletId
				};
				for (int i = 0; i < product.count; i++)
				{
					var content = JsonConvert.SerializeObject(posterModel);
					var abc = await client.PostAsync(url, new StringContent(content, Encoding.UTF8, "application/json"));
					_transactionProductsRepository.Insert(transactionProducts);
				}
			}			
			_transactionRepository.SaveChanges();
			
			return;
		}

		public async Task<string> AddTransaction(AddTransactionRequestModel model)
        {
            var client = new HttpClient();

            var url = "https://" + model.accountname + ".joinposter.com/api/transactions.createTransaction?token=" + model.token;

            var content = JsonConvert.SerializeObject(model);

            var response = await (await client.PostAsync(url, new StringContent(content, Encoding.UTF8, "application/json"))).Content.ReadAsStringAsync();

            var transaction = new Transaction
            {
                TransactionId = JsonConvert.DeserializeObject<FirstlyCreateTransactionResponseModel>(response).response.transaction_id,
                AccountName = model.accountname,
                SpotId = model.spot_id,
                SpotTabletId = model.spot_tablet_id,
                Token = model.token,
                TransactionStatus = TransactionStatus.Open,
				TableId = model.table_id
            };

            _transactionRepository.Insert(transaction);
            _transactionRepository.SaveChanges();
            
            return response;
        }
    }
}
