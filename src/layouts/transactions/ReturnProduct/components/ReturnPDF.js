import { jsPDF } from "jspdf";

const generatePDF = (company, customer, invoice, items, totals, logo) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = margin;

    // Helper function for adding text with alignment
    const addText = (text, x, y, fontSize = 10, fontWeight = "normal", align = "left") => {
        doc.setFontSize(fontSize).setFont("helvetica", fontWeight);
        doc.text(text, x, y, { align });
    };

    // Helper function for drawing lines
    const drawLine = (y) => {
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageWidth - margin, y);
    };

    // Company Logo (Top Left)
    if (logo) {
        try {
            doc.addImage(logo, "JPEG", margin, yPos, 40, 40);
        } catch (err) {
            console.error("Error adding logo:", err);
        }
    }

    // Add "Invoice" heading
    const centerX = pageWidth / 2;

    // Adjust for text width (half the width of the text to center it)
    const textWidth = doc.getTextWidth("Invoice");
    const adjustedX = centerX - textWidth / 2; // Subtract half of the text width to center
    
    // Now place the "Invoice" text at the adjusted center
    yPos += 10; // Adjust after logo
    addText("Invoice", adjustedX, yPos, 16, "bold", "center");
    yPos += 10;

    // Invoice Number & Date (Left and Right Aligned)
    addText(`Invoice #: ${invoice.number}`, margin, yPos, 10, "normal");
    addText(`Date: ${invoice.date}`, pageWidth - margin - 50, yPos, 10, "normal", "right");
    yPos += 10;
    addText(`Due Date: ${invoice.dueDate}`, margin, yPos, 10, "normal");
    yPos += 20;

    // Company Info & Bill To Section (One Row, Split into Two Parts)
    const companyX = margin;
    const billToX = pageWidth / 2; // Starting point for "Bill To" section
    addText(company.name, companyX, yPos, 14, "bold");
    addText("Bill To:", billToX, yPos, 12, "bold");
    yPos += 10;
    addText(company.address, companyX, yPos, 10, "normal");
    addText(`${customer.name}\n${customer.address}\n${customer.email}`, billToX, yPos, 10, "normal");
    yPos += 30; // Increased spacing after the company and bill to section

    drawLine(yPos);
    yPos += 10;

    // Item Table (Column Headers and Rows)
    const colWidths = [30, 0.4 * (pageWidth - 60), 20, 25, 25, 25]; // Responsive widths
    const headers = ["Item #", "Description", "Qty", "Unit Price", "Discount", "Total"];
    let xPos = margin;
    headers.forEach((header, index) => {
        addText(header, xPos, yPos, 10, "bold", "center");
        xPos += colWidths[index];
    });
    yPos += 10;
    drawLine(yPos);
    yPos += 10;

    // Loop through items and add rows
    items.forEach((item, index) => {
        if (yPos > doc.internal.pageSize.getHeight() - margin - 100) {
            doc.addPage(); // Start a new page if the content is about to overflow
            yPos = margin; // Reset yPos to top of the page
            // Re-add header for every new page
            headers.forEach((header, index) => {
                addText(header, margin + colWidths.slice(0, index).reduce((a, b) => a + b, 0), yPos, 10, "bold", "center");
            });
            yPos += 20;
            drawLine(yPos);
            yPos += 10;
        }

        // Ensure default values for undefined fields
        const id = item.id || "N/A";
        const description = item.description || "N/A";
        const qty = item.qty || "0";
        const unitPrice = item.unitPrice || "0.00";
        const discount = item.discount || "0";
        const total = item.total || "0.00";

        xPos = margin;
        [id, description, qty, unitPrice, discount, total].forEach((text, colIndex) => {
            const align = colIndex === 1 ? "left" : "right";
            addText(text.toString(), xPos, yPos, 10, "normal", align);
            xPos += colWidths[colIndex];
        });
        yPos += 10;
    });

    drawLine(yPos);
    yPos += 10;

    // Totals Section (Right Aligned)
    const totalsX = pageWidth - margin - 100; // Adjust for totals positioning
    addText("Subtotal:", totalsX, yPos, 10, "bold", "right");
    addText(`$${totals.subtotal.toFixed(2)}`, pageWidth - margin - 20, yPos, 10, "normal", "right");
    yPos += 10;
    addText("Tax (GST):", totalsX, yPos, 10, "bold", "right");
    addText(`$${totals.tax.toFixed(2)}`, pageWidth - margin - 20, yPos, 10, "normal", "right");
    yPos += 10;
    addText("Grand Total:", totalsX, yPos, 12, "bold", "right");
    addText(`$${totals.grandTotal.toFixed(2)}`, pageWidth - margin - 20, yPos, 12, "bold", "right");
    yPos += 20;

    // Notes and Terms Section (Centered)
    addText("Notes:", margin, yPos, 10, "bold");
    yPos += 10;
    addText(invoice.notes || "", margin, yPos, 8);
    yPos += 20;
    addText("Terms and Conditions:", margin, yPos, 10, "bold");
    yPos += 10;
    addText(invoice.terms || "", margin, yPos, 8);

    doc.save(`Invoice_${invoice.number}.pdf`);
};

export default generatePDF;
