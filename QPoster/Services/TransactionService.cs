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

		public void AddProductsAsync(IEnumerable<AddProductsRequestModel> products)
		{
			var client = new HttpClient();	
			var transaction = _transactionRepository.Find(t => t.TransactionId == products.First().TransactionId).First();
			//var url = "https://" + transaction.AccountName + ".joinposter.com/api/transactions.addTransactionProduct?token=" + transaction.Token;
			
			foreach (var product in products)
			{
				var transactionProducts = new TransactionProducts()
				{
					Count = product.Count,
					Price = product.Price,
					ProductId = product.ProductId,
					TransactionId = product.TransactionId,
					Name = product.Name,
				};
				//var posterModel = new PosterAddTransactionProductReqestModel()
				//{
				//	product_id = product.productId,
				//	transaction_id = product.transactionId,
				//	spot_id = transaction.SpotId,
				//	spot_tablet_id = transaction.SpotTabletId
				//};

				//for (int i = 0; i < product.count; i++)
				//{
				//	var content = JsonConvert.SerializeObject(posterModel);
				//	var abc = await client.PostAsync(url, new StringContent(content, Encoding.UTF8, "application/json"));
				//}

				var cba = _transactionProductsRepository.Find(x => x.ProductId == transactionProducts.ProductId && x.TransactionId == transactionProducts.TransactionId);
				if (cba.Count() == 0)
				{
					//no occurences
					_transactionProductsRepository.Insert(transactionProducts);
				}
				else
				{
					var ab = cba.First();
					ab.Count += transactionProducts.Count;
					_transactionProductsRepository.Update(ab);
				}
			}

			_transactionRepository.SaveChanges();

			return;
		}

		public string AddTransaction(AddTransactionRequestModel model)
        {
            var client = new HttpClient();
            //var url = "https://" + model.accountname + ".joinposter.com/api/transactions.createTransaction?token=" + model.token;
            //var content = JsonConvert.SerializeObject(model);
            //var response = await (await client.PostAsync(url, new StringContent(content, Encoding.UTF8, "application/json"))).Content.ReadAsStringAsync();

            var transaction = new Transaction
            {
                TransactionId = 1950, // JsonConvert.DeserializeObject<FirstlyCreateTransactionResponseModel>(response).response.transaction_id,
                AccountName = model.accountname,
                SpotId = model.spot_id,
                SpotTabletId = model.spot_tablet_id,
                Token = model.token,
                TransactionStatus = TransactionStatus.Open,
				TableId = model.table_id,
            };

            _transactionRepository.Insert(transaction);
            _transactionRepository.SaveChanges();

            return "{ \"response\": { \"transaction_id\": 1950, \"transaction_tablet_id\": 1508850241000 } }";
        }

		public List<TransactionProducts> GetProducts(int transactionId)
		{
			var result = _transactionProductsRepository.Find(x => x.TransactionId == transactionId).ToList();
			return result;
		}
	}
}
