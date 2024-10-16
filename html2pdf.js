<!-- مكتبة html2pdf.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <script>
        function updateTotals() {
            let subtotal = 0;
            const rows = document.querySelectorAll('#itemsBody tr');

            rows.forEach(row => {
                const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
                const unitPrice = parseFloat(row.querySelector('.unitPrice').value) || 0;
                const totalHT = quantity * unitPrice;
                row.querySelector('.totalHT').textContent = totalHT.toFixed(2);
                subtotal += totalHT;
            });

            const tax = subtotal * 0.2;
            const total = subtotal + tax;

            document.getElementById('subtotal').textContent = subtotal.toFixed(2);
            document.getElementById('tax').textContent = tax.toFixed(2);
            document.getElementById('total').textContent = total.toFixed(2);
        }

        function addItem() {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="text" class="ref" placeholder="Réf"></td>
                <td><input type="text" class="description" placeholder="Description"></td>
                <td><input type="number" class="quantity" placeholder="Quantité" oninput="updateTotals()"></td>
                <td><input type="number" class="unitPrice" placeholder="Prix unitaire HT" oninput="updateTotals()"></td>
                <td class="totalHT">0</td>
            `;
            document.getElementById('itemsBody').appendChild(row);
        }

        function downloadInvoice() {
            // Check if required fields are filled
            const requiredFields = document.querySelectorAll('.required');
            for (const field of requiredFields) {
                if (!field.value) {
                    alert("Veuillez remplir tous les champs obligatoires.");
                    return;
                }
            }

            const element = document.getElementById('invoice');
            const invoiceNumber = document.getElementById('invoiceNumber').textContent;
            const subtotal = document.getElementById('subtotal').textContent;
            const tax = document.getElementById('tax').textContent;
            const total = document.getElementById('total').textContent;

            // Add the total and other information to the invoice before downloading
            const downloadContent = `
                <h1>Devis</h1>
                <p>Date: ${document.getElementById('invoiceDate').textContent}</p>
                <p>Numéro de la facture: ${invoiceNumber}</p>
                <h2>Informations du client</h2>
                <p>Client: ${document.getElementById('clientName').value}</p>
                <p>Ice: ${document.getElementById('clientIce').value}</p>
                <p>Téléphone: ${document.getElementById('clientPhone').value}</p>
                <h2>Détails des articles</h2>
                <table class="items">
                    <thead>
                        <tr>
                            <th>Réf</th>
                            <th>Description</th>
                            <th>Quantité</th>
                            <th>Prix unitaire HT</th>
                            <th>Total HT</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${document.getElementById('itemsBody').innerHTML}
                    </tbody>
                </table>
                <div class="totals">
                    <p>Sous-total: ${subtotal} MAD</p>
                    <p>TVA (20%): ${tax} MAD</p>
                    <p>Total TTC: ${total} MAD</p>
                </div>
            `;

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = downloadContent;

            html2pdf().from(tempDiv).save(`devis_${invoiceNumber}.pdf`);
        }
    </script>
