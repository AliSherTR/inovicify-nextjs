const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function main() {
    const userId = "YOUR USER ID"; // Replace this with the actual user ID

    await db.invoice.createMany({
        data: [
            {
                senderAddress: "123 Sender St",
                senderCity: "Sendertown",
                senderPostCode: "12345",
                senderCountry: "Sendland",
                receiverName: "Bob",
                receiverEmail: "bob@example.com",
                receiverAddress: "456 Receiver St",
                receiverCity: "Receivertown",
                receiverPostCode: "54321",
                receiverCountry: "Receiveland",
                status: "PAID",
                invoiceDate: new Date(),
                dueDate: new Date(
                    new Date().setDate(new Date().getDate() + 30)
                ),
                paymentTerms: "30 days",
                projectDescription: "Website Development",
                userId: userId,
            },
            {
                senderAddress: "123 Sender St",
                senderCity: "Sendertown",
                senderPostCode: "12345",
                senderCountry: "Sendland",
                receiverName: "Charlie",
                receiverEmail: "charlie@example.com",
                receiverAddress: "789 Receiver St",
                receiverCity: "Receivertown",
                receiverPostCode: "54321",
                receiverCountry: "Receiveland",
                status: "PENDING",
                invoiceDate: new Date(),
                dueDate: new Date(
                    new Date().setDate(new Date().getDate() + 15)
                ),
                paymentTerms: "15 days",
                projectDescription: "Mobile App Development",
                userId: userId,
            },
            {
                senderAddress: "456 Sender Ave",
                senderCity: "Senderville",
                senderPostCode: "67890",
                senderCountry: "Sendland",
                receiverName: "Eve",
                receiverEmail: "eve@example.com",
                receiverAddress: "123 Receiver Blvd",
                receiverCity: "Receiverville",
                receiverPostCode: "09876",
                receiverCountry: "Receiveland",
                status: "DRAFT",
                invoiceDate: new Date(),
                dueDate: new Date(
                    new Date().setDate(new Date().getDate() + 45)
                ),
                paymentTerms: "45 days",
                projectDescription: "SEO Optimization",
                userId: userId,
            },
            {
                senderAddress: "456 Sender Ave",
                senderCity: "Senderville",
                senderPostCode: "67890",
                senderCountry: "Sendland",
                receiverName: "Frank",
                receiverEmail: "frank@example.com",
                receiverAddress: "456 Receiver Blvd",
                receiverCity: "Receiverville",
                receiverPostCode: "09876",
                receiverCountry: "Receiveland",
                status: "PAID",
                invoiceDate: new Date(),
                dueDate: new Date(
                    new Date().setDate(new Date().getDate() + 60)
                ),
                paymentTerms: "60 days",
                projectDescription: "Marketing Campaign",
                userId: userId,
            },
            // Continue adding more invoices up to 10...
        ],
    });

    console.log("Invoices created with user ID");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
// seeds
