using QPoster.Enums;
using System.ComponentModel.DataAnnotations;

namespace QPoster.Database.Models
{
    public class TransactionProducts
    {
        [Key]
        public int Id { get; set; }

		[Required]
		public string Name { get; set; }

		[Required]
        public int ProductId { get; set; }

        [Required]
        public int Count { get; set; }

		[Required]
		public int Price { get; set; }

		[Required]
		public int TransactionId { get; set; }

		[Required]
        public TransactionProductStatus Status { get; set; }

        #region Navigation props

        //public virtual Transaction Transaction { get; set; }

        #endregion
    }
}
