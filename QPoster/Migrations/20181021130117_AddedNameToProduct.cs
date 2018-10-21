using Microsoft.EntityFrameworkCore.Migrations;

namespace QPoster.Migrations
{
    public partial class AddedNameToProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionProducts_Transactions_TransactionId",
                table: "TransactionProducts");

            migrationBuilder.AlterColumn<int>(
                name: "TransactionId",
                table: "TransactionProducts",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "TransactionProducts",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionProducts_Transactions_TransactionId",
                table: "TransactionProducts",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionProducts_Transactions_TransactionId",
                table: "TransactionProducts");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "TransactionProducts");

            migrationBuilder.AlterColumn<int>(
                name: "TransactionId",
                table: "TransactionProducts",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionProducts_Transactions_TransactionId",
                table: "TransactionProducts",
                column: "TransactionId",
                principalTable: "Transactions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
