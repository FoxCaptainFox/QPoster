using Microsoft.EntityFrameworkCore.Migrations;

namespace QPoster.Migrations
{
    public partial class AddTransactionId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TransactionId",
                table: "Transactions",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TransactionId",
                table: "Transactions");
        }
    }
}
