using Microsoft.EntityFrameworkCore.Migrations;

namespace QPoster.Migrations
{
    public partial class NavigationPropsRemove : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionProducts_Transactions_TransactionId",
                table: "TransactionProducts");

            migrationBuilder.DropIndex(
                name: "IX_TransactionProducts_TransactionId",
                table: "TransactionProducts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_TransactionProducts_TransactionId",
                table: "TransactionProducts",
                column: "TransactionId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionProducts_Transactions_TransactionId",
                table: "TransactionProducts",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
