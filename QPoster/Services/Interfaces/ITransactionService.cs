using QPoster.Database.Models;
using QPoster.Models.RequestModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QPoster.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<string> AddTransaction(AddTransactionRequestModel model);
		Task AddProductsAsync(List<AddProductsRequestModel> products);
		Task<List<TransactionProducts>> GetProducts(int transactionId);
	}
}
