document.addEventListener('DOMContentLoaded', () => {
    // --- Data Mockup untuk Nominal dan Pembayaran ---
    const gameData = {
        'mlbb': {
            name: 'Mobile Legends',
            nominals: [
                { value: '59', price: 'Rp 15.000', count: '59 Diamonds' },
                { value: '112', price: 'Rp 28.000', count: '112 Diamonds' },
                { value: '257', price: 'Rp 65.000', count: '257 Diamonds' },
                { value: '514', price: 'Rp 129.000', count: '514 Diamonds' }
            ]
        },
        'pubg': {
            name: 'PUBG Mobile',
            nominals: [
                { value: '60', price: 'Rp 18.000', count: '60 UC' },
                { value: '300', price: 'Rp 88.000', count: '300 UC' },
                { value: '600', price: 'Rp 175.000', count: '600 UC' }
            ]
        }
    };
    
    const paymentMethods = [
        { value: 'dana', name: 'DANA', icon: 'fas fa-wallet' },
        { value: 'gopay', name: 'GoPay', icon: 'fas fa-mobile-alt' },
        { value: 'bca', name: 'Transfer BCA', icon: 'fas fa-university' },
        { value: 'alfamart', name: 'Alfamart', icon: 'fas fa-store' }
    ];

    // --- Elemen DOM ---
    const gameCards = document.querySelectorAll('.game-card');
    const gameNameSpan = document.getElementById('game-name');
    const nominalOptionsDiv = document.getElementById('nominal-options');
    const paymentOptionsDiv = document.getElementById('payment-options');
    const userIdInput = document.getElementById('user-id');
    const submitButton = document.querySelector('.submit-button');

    let selectedGame = 'mlbb'; // Default game
    let selectedNominal = null;
    let selectedPayment = null;

    // --- Fungsi Utama ---

    /**
     * Memuat dan menampilkan pilihan nominal dan pembayaran
     */
    function loadFormOptions() {
        // 1. Nominal Options
        nominalOptionsDiv.innerHTML = '';
        const currentNominals = gameData[selectedGame].nominals;
        
        currentNominals.forEach(nominal => {
            const card = document.createElement('label');
            card.classList.add('option-card');
            card.innerHTML = `
                <input type="radio" name="nominal" value="${nominal.value}" data-price="${nominal.price}">
                <span>${nominal.count}</span>
                <span class="price">${nominal.price}</span>
            `;
            nominalOptionsDiv.appendChild(card);
        });

        // 2. Payment Options
        paymentOptionsDiv.innerHTML = '';
        paymentMethods.forEach(method => {
            const card = document.createElement('label');
            card.classList.add('option-card');
            card.innerHTML = `
                <input type="radio" name="payment" value="${method.value}">
                <i class="${method.icon}"></i>
                <span>${method.name}</span>
            `;
            paymentOptionsDiv.appendChild(card);
        });

        // Update Game Name
        gameNameSpan.textContent = gameData[selectedGame].name;

        // Reset pilihan saat ganti game
        selectedNominal = null;
        selectedPayment = null;
        updateSubmitButtonState();
    }
    
    /**
     * Mengatur status tombol submit (enabled/disabled)
     */
    function updateSubmitButtonState() {
        const isUserIdValid = userIdInput.value.trim().length > 5; // Validasi ID minimal 5 karakter
        const isNominalSelected = selectedNominal !== null;
        const isPaymentSelected = selectedPayment !== null;

        if (isUserIdValid && isNominalSelected && isPaymentSelected) {
            submitButton.disabled = false;
            submitButton.textContent = `Bayar ${selectedNominal.price} Sekarang`;
        } else {
            submitButton.disabled = true;
            submitButton.textContent = 'LENGKAPI DATA DI ATAS';
        }
    }

    // --- Event Listeners ---

    // 1. Mengganti Game
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            gameCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            selectedGame = this.getAttribute('data-game');
            loadFormOptions();
        });
    });

    // 2. Memilih Nominal
    nominalOptionsDiv.addEventListener('click', (e) => {
        const card = e.target.closest('.option-card');
        if (card) {
            document.querySelectorAll('#nominal-options .option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            const radio = card.querySelector('input[name="nominal"]');
            selectedNominal = {
                value: radio.value,
                price: radio.getAttribute('data-price')
            };
            
            updateSubmitButtonState();
        }
    });

    // 3. Memilih Pembayaran
    paymentOptionsDiv.addEventListener('click', (e) => {
        const card = e.target.closest('.option-card');
        if (card) {
            document.querySelectorAll('#payment-options .option-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            const radio = card.querySelector('input[name="payment"]');
            selectedPayment = radio.value;
            
            updateSubmitButtonState();
        }
    });

    // 4. Input ID User
    userIdInput.addEventListener('input', updateSubmitButtonState);

    // 5. Submit Form (Simulasi)
    document.getElementById('order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // ... (di sini adalah tempat Anda mengirim data ke back-end)
        alert(`
            ✅ ORDER SIAP DIPROSES!
            ID Game: ${userIdInput.value.trim()}
            Nominal: ${selectedNominal.value} (${selectedNominal.price})
            Pembayaran: ${selectedPayment.toUpperCase()}
            
            Terima kasih telah berbelanja di ELVIN STORE TOPUP.
        `);
    });
    
    // Inisialisasi awal
    loadFormOptions();
    updateSubmitButtonState();
});