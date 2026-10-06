//Respuestas predefinidas del chatbot.
const responses = {
    'hola': '¡Hola! ¿Cómo estás?',
    'adiós': '¡Adiós! Que tengas un buen día.',
    'cómo estás': 'Estoy bien, gracias por preguntar.',
    'qué puedes hacer': 'Puedo responder a tus preguntas básicas.',
    'cómo te llamas': 'Soy un chatbot simple hecho con HTML, CSS y JavaScript.',
    'gracias': '¡De nada! Estoy para ayudarte.',
    'buenos días': '¡Buenos días! ¿En qué te puedo ayudar?',
    'buenas noches': '¡Buenas noches! Que descanses.'
};

const defaultResponse = 'Lo siento, no entiendo tu mensaje. Prueba con "hola" o "qué puedes hacer".';

const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');


//Quitar mayusculas, acentos y signos para comparar los mensajes.
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[¿?¡!.,]/g, '')
        .trim();
}

//Agregar un mensaje al div de mensajes.
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

//Generar la respuesta del chatbot basada en el mensaje del usuario.
function generateResponse(userMessage) {
    const normalizedMessage = normalizeText(userMessage);

    for (const key in responses) {
        if (normalizeText(key) === normalizedMessage) {
            return responses[key];
        }
    }

    return defaultResponse;
}

//Enviar el mensaje del usuario y mostrar la respuesta del chatbot.
function sendMessage() {
    const userMessage = userInput.value.trim();

    if (userMessage === '') {
        return;
    }

    addMessage(userMessage, 'user');
    userInput.value = '';
    userInput.focus();

    const botResponse = generateResponse(userMessage);
    setTimeout(() => {
        addMessage(botResponse, 'bot');
    }, 400);
}


sendButton.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

addMessage('¡Hola! Soy tu chatbot. Escribe un mensaje para empezar.', 'bot');
