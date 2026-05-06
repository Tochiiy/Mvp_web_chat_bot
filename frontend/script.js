document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatbotHeader = document.querySelector('.chatbot-header');
    const chatbotContainer = document.querySelector('.chatbot-container');

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);

        const avatarElement = document.createElement('div');
        avatarElement.classList.add('message-avatar');
        avatarElement.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        messageElement.appendChild(avatarElement);

        const contentElement = document.createElement('div');
        contentElement.classList.add('message-content');
        contentElement.textContent = text;
        messageElement.appendChild(contentElement);

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

   
    async function getLLMResponse(userMessage) {
        try {
            
            const response = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
               
                const errorData = await response.json();
                console.error('Backend error:', errorData.error);
                return "Sorry, I encountered an error trying to process your request.";
            }

            const data = await response.json();
            return data.reply; 

        } catch (error) {
            console.error('Network error:', error);
            return "Sorry, I'm having trouble connecting right now. Please try again later.";
        }
    }

    
    async function sendMessage() { 
        const messageText = userInput.value.trim();
        if (messageText) {
            addMessage(messageText, 'user');
            userInput.value = '';

            
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
            typingIndicator.innerHTML = '<div class="message-avatar"><i class="fas fa-robot"></i></div><div class="message-content"><i>Typing...</i></div>';
            chatMessages.appendChild(typingIndicator);

            
            const botResponse = await getLLMResponse(messageText);

            
            chatMessages.removeChild(typingIndicator);

            addMessage(botResponse, 'bot');
        }
    }

  
    sendBtn.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    
    const minimizeBtn = document.querySelector('.minimize-btn');
    minimizeBtn.addEventListener('click', () => {
        chatbotContainer.classList.toggle('minimized');
        const icon = minimizeBtn.querySelector('i');
        if (chatbotContainer.classList.contains('minimized')) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        } else {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        }
    });


    addMessage("Ask me anything!!!", 'bot');
});