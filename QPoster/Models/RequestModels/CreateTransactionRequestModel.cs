using System.ComponentModel.DataAnnotations;

namespace QPoster.Models.RequestModels
{
    public class CreateTransactionRequestModel
    {
        [Required]
        public string accountname { get; set; }

        [Required]
        public string token { get; set; }

        [Required]
        public int spot_id { get; set; }

        [Required]
        public int spot_tablet_id { get; set; }

        [Required]
        public int table_id { get; set; }

        [Required]
        public int user_id { get; set; }
        
        [Required]
        public int guests_count { get; set; }
    }
}
