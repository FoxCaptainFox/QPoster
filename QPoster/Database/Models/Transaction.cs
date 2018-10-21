using QPoster.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QPoster.Database.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int TransactionId { get; set; }

        [Required]
        public int SpotId { get; set; }

		[Required]
		public int TableId { get; set; }

		[Required]
        public int SpotTabletId { get; set; }

        [Required]
        public string Token { get; set; }

        [Required]
        public string AccountName { get; set; }

        [Required]
        public TransactionStatus TransactionStatus {get;set;}

        #region Navigation props

        public virtual ICollection<TransactionProducts> TransactionProducts { get; set; }

		#endregion

		public Transaction()
		{
			TransactionProducts = new List<TransactionProducts>();
		}
    }
}
