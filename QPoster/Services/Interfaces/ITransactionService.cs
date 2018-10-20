using QPoster.Models.RequestModels;
using System.Threading.Tasks;

namespace QPoster.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<string> CreateTransaction(CreateTransactionRequestModel model);
    }
}
