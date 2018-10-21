using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QPoster.Models.RequestModels
{
	public class AddProductsRequestModel
	{
		[Required]
		public int transactionId { get; set; }

		[Required]
		public int productId { get; set; }

		[Required]
		public int count { get; set; }

		[Required]
		public int price { get; set; }
	}
}
