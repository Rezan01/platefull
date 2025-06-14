 document.addEventListener('DOMContentLoaded', () => {
    const carouselSlides = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    let currentSlide = 0;
    const totalSlides = slides.length;

    const updateSlidePosition = () => {
        carouselSlides.style.transform = `translateX(${-currentSlide * 100}%)`;
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Ensures it loops back correctly
        updateSlidePosition();
    };
    nextArrow.addEventListener('click', nextSlide);
    prevArrow.addEventListener('click', prevSlide);

 
});


//chatbot
const messages = [
    {
        role: "system",
        content: `
You are an AI assistant for the initiative "Plateful". You should ONLY answer questions based on the initiative information below, but you can use the information in a friendly and conversational way, and you may also answer greetings and pleasantries.

If a question is unrelated or off-topic, kindly say:  
"I'm here to talk about Plateful. Please ask something related to our mission or services."

Initiative Information:  
Plateful is a compassionate tech-driven initiative founded in 2025 by Rezan Mohammed. We focus on reducing food waste by collecting untouched leftover food from hotels, events, and restaurants, and redistributing it to shelters and people in need.

What we do:
- Partner with food establishments to collect quality leftover meals
- Verify and safely store the food for redistribution
- Deliver it to shelters, orphanages, and individuals experiencing food insecurity

Key Links on Our Website:
- **Donate Food**: For hotels, restaurants, and event organizers to schedule pickups  
- **Request Help**: Shelters or individuals in need can reach out for assistance  
- **Volunteer with Us**: Join our mission by helping with logistics and distribution  

Location: Based in Ethiopia, serving urban and surrounding communities  
Team Values: Compassion, Efficiency, Sustainability

To support Plateful:
- Share our mission online and offline  
- Connect us with food establishments  
- Volunteer or donate logistics support

Our vision is to create a world where no good food goes to waste, and every plate is full.

Contact us at: **plateful@gmail.com**

        `,
    },
];

const messagesDiv = document.getElementById("messages");
const inputMessage = document.getElementById("input-message");
const sendButton = document.getElementById("send-button");

function addMessage(msg, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    if (isUser) {
        messageDiv.classList.add("user-message");
    } else {
        messageDiv.classList.add("bot-message");
    }
    messageDiv.textContent = msg;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to latest message
}

document.addEventListener("DOMContentLoaded", () => {
    addMessage("Hello! I'm your WubStyle assistant. How can I help you today?", false);
});

async function sendMessage() {
    const userMessage = inputMessage.value.trim();
    if (!userMessage) {
        return; 
    }
    addMessage(userMessage, true); 
    inputMessage.value = "";
    messages.push({ content: userMessage, role: "user" });
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot-message');
    typingIndicator.textContent = 'Typing...';
    messagesDiv.appendChild(typingIndicator);
    messagesDiv.scrollTop = messagesDiv.scrollTop; 
    if (typeof puter !== "undefined") {
        try {
            const response = await puter.ai.chat(messages);
            typingIndicator.remove();

            const reply = response.message?.content || "No response from AI.";
            addMessage(reply, false); 
            messages.push({ content: reply, role: "assistant" }); 

        } catch (error) {
            console.error("AI response error:", error);
            typingIndicator.remove();
            addMessage("Error talking to AI. Please try again later.", false);
        }
    } else {
        typingIndicator.remove();
        addMessage("Puter SDK not loaded. Chatbot is unavailable.", false);
    }
}

sendButton.addEventListener("click", sendMessage);
inputMessage.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

