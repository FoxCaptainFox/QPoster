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
		public string Name { get; set; }

		[Required]
		public int TransactionId { get; set; }

		[Required]
		public int ProductId { get; set; }

		[Required]
		public int Count { get; set; }

		[Required]
		public int Price { get; set; }
	}
}
