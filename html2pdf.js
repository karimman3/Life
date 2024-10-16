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
            const element = document.getElementById('invoice');
            html2pdf().from(element).save('devis.pdf');
        }
    </script>
