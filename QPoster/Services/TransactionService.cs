using Newtonsoft.Json;
using QPoster.Database;
using QPoster.Database.Models;
using QPoster.Enums;
using QPoster.Models.RequestModels;
using QPoster.Models.ResponseModels;
using QPoster.Services.Interfaces;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace QPoster.Services
{
    public class TransactionService : ITransactionService
    {
        private IRepository<Transaction> _transactionRepository;

        public TransactionService(IRepository<Transaction> transactionRepo)
        {
            _transactionRepository = transactionRepo;
        }

        public async Task<string> CreateTransaction(CreateTransactionRequestModel model)
        {
            var client = new HttpClient();

            var url = "https://posterhack.joinposter.com/api/transactions.createTransaction?token=0014391df7bd6edecce3ec8f44f1ef54";

            var content = JsonConvert.SerializeObject(model);

            var response = await (await client.PostAsync(url, new StringContent(content, Encoding.UTF8, "application/json"))).Content.ReadAsStringAsync();

            var transaction = new Transaction
            {
                TransactionId = JsonConvert.DeserializeObject<FirstlyCreateTransactionResponseModel>(response).response.transaction_id,
                AccountName = model.accountname,
                SpotId = model.spot_id,
                SpotTabletId = model.spot_tablet_id,
                Token = model.token,
                TransactionStatus = TransactionStatus.Open
            };

            _transactionRepository.Insert(transaction);
            _transactionRepository.SaveChanges();
            
            return response;
        }
    }
}
