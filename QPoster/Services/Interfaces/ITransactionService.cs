using QPoster.Database.Models;
using QPoster.Models.RequestModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QPoster.Services.Interfaces
{
    public interface ITransactionService
    {
        string AddTransaction(AddTransactionRequestModel model);
		void AddProductsAsync(IEnumerable<AddProductsRequestModel> products);
		List<TransactionProducts> GetProducts(int transactionId);
	}
}
