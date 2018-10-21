using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QPoster.Models.RequestModels
{
	public class PosterAddTransactionProductReqestModel
	{
		[Required]
		public int spot_id { get; set; }

		[Required]
		public int spot_tablet_id { get; set; }

		[Required]
		public int transaction_id { get; set; }

		[Required]
		public int product_id { get; set; }
	}
}
