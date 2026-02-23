// Initialize AOS with crisp, sharp settings
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-expo',
    offset: 100
});

document.addEventListener('DOMContentLoaded', () => {
    // Report form submission logic
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const msgDiv = document.getElementById('reportMsg');
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            const formData = {
                name: document.getElementById('name').value,
                issue: document.getElementById('issue').value
            };

            try {
                submitBtn.disabled = true;
                submitBtn.innerText = 'TRANSMITTING...';

                const response = await fetch('/report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    msgDiv.className = 'px-10 pb-10 text-center font-bold uppercase tracking-widest text-[10px] text-india-green';
                    msgDiv.textContent = 'SIGNAL RECEIVED SUCCESSFULLY';
                    e.target.reset();
                } else {
                    msgDiv.className = 'px-10 pb-10 text-center font-bold uppercase tracking-widest text-[10px] text-red-600';
                    msgDiv.textContent = 'ERROR: ' + result.message;
                }
            } catch (err) {
                msgDiv.className = 'px-10 pb-10 text-center font-bold uppercase tracking-widest text-[10px] text-red-600';
                msgDiv.textContent = 'CONNECTION ERROR';
            } finally {
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                }, 2000);
            }
        });
    }

    // Material Hover Effects for Cards (Subtle GSAP)
    const cards = document.querySelectorAll('.card-material');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -5, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
    });

    // Button Click Ripples (Simplified)
    const buttons = document.querySelectorAll('.btn-material');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            gsap.to(btn, { scale: 0.98, duration: 0.1 });
        });
        btn.addEventListener('mouseup', () => {
            gsap.to(btn, { scale: 1, duration: 0.1 });
        });
    });
});
