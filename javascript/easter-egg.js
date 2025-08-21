// =====================
// Easter Egg Universal (Funciona em todas as páginas)
// =====================
(function() {
    // Verifica se já existe uma instância do easter egg
    if (window.hasRunEasterEgg) {
        return;
    }
    window.hasRunEasterEgg = true;
    
    let clickCount = 0;
    let clickTimer;
    let isMatrixActive = false;
    let matrixInterval;

    // Elementos que podem ativar o easter egg
    const possibleTriggers = [
        '.profile-img', 
        '.logo', 
        'h1', 
        'header',
        '.projects-container h2'
    ];

    // Encontra o primeiro elemento disponível na página
    function findTriggerElement() {
        for (const selector of possibleTriggers) {
            const element = document.querySelector(selector);
            if (element) return element;
        }
        return document.body;
    }

    // Configura os gatilhos do easter egg
    function setupEasterEggTriggers() {
        const triggerElement = findTriggerElement();
        
        // Clicar no elemento 5 vezes
        triggerElement.addEventListener('click', () => {
            clickCount++;
            if (clickTimer) clearTimeout(clickTimer);
            clickTimer = setTimeout(() => { clickCount = 0; }, 1000);
            if (clickCount === 5) { 
                triggerEasterEgg(); 
                clickCount = 0; 
            }
        });

        // Segurar M por 3 segundos
        let mTimer, mHeld = false;
        window.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'm' && !mHeld && !isMatrixActive) {
                mHeld = true;
                mTimer = setTimeout(() => { 
                    triggerEasterEgg(); 
                    mHeld = false; 
                }, 3000);
            }
        });
        
        window.addEventListener('keyup', (e) => {
            if (e.key.toLowerCase() === 'm') { 
                mHeld = false; 
                clearTimeout(mTimer); 
            }
        });

        // Tecla ESC para sair do modo hacker
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMatrixActive) {
                disableMatrixMode();
            }
        });
    }

    function triggerEasterEgg() {
        if (document.querySelector('.secret-msg') || isMatrixActive) return;

        // Confetes
        const confettiContainer = document.createElement('div');
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = 0;
        confettiContainer.style.left = 0;
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = 9999;
        document.body.appendChild(confettiContainer);

        const shapes = ['circle', 'square', 'triangle'];
        for (let i = 0; i < 200; i++) {
            const confetti = document.createElement('div');
            const size = Math.random() * 10 + 5;
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            confetti.style.position = 'absolute';
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.top = `${Math.random() * 100}%`;
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.opacity = 0.9;
            confetti.style.backgroundColor = `hsl(${Math.random()*360}, 80%, 60%)`;

            if (shape === 'circle') confetti.style.borderRadius = '50%';
            if (shape === 'triangle') {
                confetti.style.width = 0;
                confetti.style.height = 0;
                confetti.style.borderLeft = `${size/2}px solid transparent`;
                confetti.style.borderRight = `${size/2}px solid transparent`;
                confetti.style.borderBottom = `${size}px solid hsl(${Math.random()*360}, 80%, 60%)`;
                confetti.style.background = 'transparent';
            }

            confettiContainer.appendChild(confetti);

            const duration = Math.random()*2 + 3;
            const horizontalMovement = (Math.random()-0.5)*100;
            confetti.animate([
                { transform: `translate(0,0) rotate(0deg)` },
                { transform: `translate(${horizontalMovement}px, ${window.innerHeight + 50}px) rotate(${Math.random()*720}deg)` }
            ], {
                duration: duration*1000,
                iterations: 1,
                easing: 'ease-out'
            });
        }

        // Mensagem secreta
        const secretMsg = document.createElement('div');
        secretMsg.classList.add('secret-msg');
        secretMsg.innerText = "🎉 Parabéns! Modo Hacker ativado! 👨‍💻";
        secretMsg.style.position = 'fixed';
        secretMsg.style.top = '10%';
        secretMsg.style.left = '50%';
        secretMsg.style.transform = 'translate(-50%, -50%)';
        secretMsg.style.background = 'rgba(0,0,0,0.85)';
        secretMsg.style.color = '#0f0';
        secretMsg.style.padding = '20px 30px';
        secretMsg.style.borderRadius = '16px';
        secretMsg.style.fontSize = '18px';
        secretMsg.style.textAlign = 'center';
        secretMsg.style.zIndex = 10000;
        secretMsg.style.boxShadow = '0 4px 25px rgba(0,0,0,0.6)';
        secretMsg.style.fontFamily = 'monospace';
        secretMsg.style.border = '1px solid #0f0';
        secretMsg.style.animation = 'glitch 0.5s infinite alternate';
        document.body.appendChild(secretMsg);

        // Adiciona os estilos necessários se não existirem
        addMatrixStyles();

        // Depois de 5 segundos → ativa Matrix
        setTimeout(() => {
            confettiContainer.remove();
            secretMsg.remove();
            isMatrixActive = true;
            startMatrixBackground();

            // Aplica o modo hacker
            document.body.classList.add('matrix-mode');

        }, 5000);
    }

    function addMatrixStyles() {
        // Adiciona estilos CSS necessários
        if (!document.getElementById('matrix-styles')) {
            const styles = `
                @keyframes glitch {
                    0% { text-shadow: 1px 1px 0 rgba(255,0,0,0.7), -1px -1px 0 rgba(0,0,255,0.7); }
                    100% { text-shadow: -1px -1px 0 rgba(255,0,0,0.7), 1px 1px 0 rgba(0,0,255,0.7); }
                }
                
                .matrix-mode {
                    cursor: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBvbHlnb24gcG9pbnRzPSIwLDAgMCwzMiAxMiwyMCAyMCwzMiAyMCwyMCAzMiwyMCAwLDAiIHN0eWxlPSJmaWxsOiMwRjA7c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxIi8+PC9zdmc+'), auto !important;
                }
                
                .matrix-mode a, 
                .matrix-mode button, 
                .matrix-mode [role="button"] {
                    cursor: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0iIzBGMCIgLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiBmaWxsPSJibGFjayIvPjwvc3ZnPg==') 12 12, pointer !important;
                }
                
                #matrix-canvas {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    pointer-events: none;
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.id = 'matrix-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }

    function startMatrixBackground() {
        // Remove canvas existente se houver
        const existingCanvas = document.getElementById('matrix-canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
        
        // Cria um novo canvas para o efeito Matrix
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext("2d");
        
        // Ajusta o tamanho do canvas para cobrir toda a viewport
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Configuração do efeito Matrix
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        
        // Array de gotas - cada coluna tem uma posição vertical
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
        }
        
        // Função para desenhar o efeito Matrix
        function drawMatrix() {
            // Fundo semi-transparente para criar rastro
            ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "#0F0"; // Cor verde
            ctx.font = `${fontSize}px monospace`;
            
            // Para cada coluna
            for (let i = 0; i < drops.length; i++) {
                // Caractere aleatório
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // Posição x da coluna, posição y da gota
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                // Desenha o caractere
                ctx.fillText(text, x, y);
                
                // Move a gota para baixo
                drops[i]++;
                
                // Se a gota sair da tela ou aleatoriamente, reinicia no topo
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
            }
        }
        
        // Limpa qualquer intervalo anterior
        if (matrixInterval) {
            clearInterval(matrixInterval);
        }
        
        // Inicia a animação
        matrixInterval = setInterval(drawMatrix, 50);
    }

    function disableMatrixMode() {
        isMatrixActive = false;
        document.body.classList.remove('matrix-mode');
        
        // Para a animação da matrix
        if (matrixInterval) {
            clearInterval(matrixInterval);
            matrixInterval = null;
        }
        
        // Remove o canvas da matrix
        const matrixCanvas = document.getElementById('matrix-canvas');
        if (matrixCanvas) {
            matrixCanvas.remove();
        }
    }

    // Inicializa quando o documento estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupEasterEggTriggers);
    } else {
        setupEasterEggTriggers();
    }
})();