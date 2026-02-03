
        let noCount = 0;
        let yesPressed = false;

        const noMessages = [
            "No",
            "Are you sure?",
            "Really sure?",
            "Think again!",
            "Last chance!",
            "Surely not?",
            "You might regret this!",
            "Give it another thought!",
            "Are you absolutely certain?",
            "This could be a mistake!",
            "Pretty please?",
            "I'm getting sad :(",
            "Okay I'm crying now",
        ];

        const container = document.getElementById('container');
        const card = document.getElementById('card');
        const yesButton = document.getElementById('yesButton');
        const noButton = document.getElementById('noButton');
        const initialView = document.getElementById('initialView');
        const successView = document.getElementById('successView');

        // Create background hearts
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'bg-heart';
            heart.textContent = '❤️';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * 100}%`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            container.insertBefore(heart, card);
        }

        function moveNoButton() {
            // Get actual card dimensions (inner content area)
            const cardWidth = card.clientWidth;
            const cardHeight = card.clientHeight;
            
            const yesRect = yesButton.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const noRect = noButton.getBoundingClientRect();
            
            const buttonWidth = noRect.width || 150;
            const buttonHeight = noRect.height || 60;
            const padding = 30; // Keep button away from edges
            const safeDistance = 60; // Distance from Yes button

            // Calculate max positions within the card (accounting for padding)
            const maxX = cardWidth - buttonWidth - padding;
            const maxY = cardHeight - buttonHeight - padding;

            let randomX, randomY;
            let attempts = 0;
            const maxAttempts = 100;

            do {
                // Generate random position within card bounds
                randomX = padding + Math.random() * (maxX - padding);
                randomY = padding + Math.random() * (maxY - padding);

                // Convert to absolute positions for overlap checking with Yes button
                const noLeft = cardRect.left + randomX;
                const noTop = cardRect.top + randomY;
                const noRight = noLeft + buttonWidth;
                const noBottom = noTop + buttonHeight;

                // Check if new position overlaps with Yes button (with safe distance)
                const overlaps = !(
                    noRight + safeDistance < yesRect.left ||
                    noLeft - safeDistance > yesRect.right ||
                    noBottom + safeDistance < yesRect.top ||
                    noTop - safeDistance > yesRect.bottom
                );

                // If no overlap, we found a good position
                if (!overlaps) {
                    break;
                }

                attempts++;
            } while (attempts < maxAttempts);

            // Position the button absolutely within the card
            noButton.style.position = 'absolute';
            noButton.style.left = `${randomX}px`;
            noButton.style.top = `${randomY}px`;
            noButton.style.zIndex = '9999';
            noButton.style.transition = 'none';
        }

        function handleNoClick() {
            noCount++;
            noButton.textContent = noMessages[Math.min(noCount, noMessages.length - 1)];
            
            // Increase Yes button size
            const scale = 1 + noCount * 0.2;
            yesButton.style.transform = `scale(${scale})`;
            
            moveNoButton();
        }

        function handleYesClick() {
            yesPressed = true;
            initialView.classList.add('hidden');
            successView.classList.remove('hidden');

            // Create floating hearts
            for (let i = 0; i < 30; i++) {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️'];
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.fontSize = `${Math.random() * 2 + 1}rem`;
                heart.style.animationDelay = `${Math.random() * 5}s`;
                heart.style.animationDuration = `${5 + Math.random() * 5}s`;
                container.insertBefore(heart, card);
            }
        }

        yesButton.addEventListener('click', handleYesClick);
        noButton.addEventListener('click', handleNoClick);
        noButton.addEventListener('mouseenter', moveNoButton);
    
