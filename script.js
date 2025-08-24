    // Current date for calendar
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Smooth scroll to demo
    function scrollToDemo() {
      document.getElementById("demo").scrollIntoView({ behavior: "smooth" });
    }

    // Toggle mobile menu
    function toggleMenu() {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('active');
    }

    // Tab navigation
    function openTab(evt, tabId) {
      // Hide all tab contents
      const tabContents = document.getElementsByClassName("tab-content");
      for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
      }
      
      // Remove active class from all buttons
      const tabButtons = document.getElementsByClassName("tab-btn");
      for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
      }
      
      // Show the specific tab content and mark button as active
      document.getElementById(tabId).classList.add("active");
      evt.currentTarget.classList.add("active");
    }

    // Show toast notification
    function showToast(message, type = "default") {
      const toast = document.getElementById("toast");
      toast.textContent = message;
      
      // Add type class for different colors
      if (type === "error") {
        toast.style.background = "var(--terracotta)";
      } else if (type === "success") {
        toast.style.background = "var(--sage)";
      } else if (type === "warning") {
        toast.style.background = "var(--mustard)";
      } else {
        toast.style.background = "var(--dark)";
      }
      
      toast.className = "toast show";
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        toast.className = "toast";
      }, 3000);
    }

    // Voice Input using Web Speech API
    function startVoiceInput() {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showToast("Speech Recognition not supported in this browser.", "error");
        return;
      }

      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = document.getElementById("voiceLang").value;
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.start();

      document.getElementById("voiceOutput").innerHTML = "<p><i class='fas fa-microphone-alt'></i> Listening... Please describe your craft...</p>";
      document.getElementById("voiceLoading").style.display = "block";

      recognition.onresult = function(event) {
        const speech = event.results[0][0].transcript;
        
        document.getElementById("voiceLoading").style.display = "none";
        
        // Simulate AI processing with a delay
        setTimeout(() => {
          document.getElementById("voiceOutput").innerHTML = `
            <p><i class='fas fa-check-circle' style='color: var(--sage)'></i> <strong>You said:</strong> "${speech}"</p>
            <hr style='margin: 10px 0; opacity: 0.3'>
            <p><i class='fas fa-robot' style='color: var(--terracotta)'></i> <strong>AI Description:</strong> "${speech}" - a beautifully handcrafted piece made with traditional techniques and attention to detail. This craft tells a story of cultural heritage and skilled craftsmanship.</p>
          `;
          
          // Also update the market output with a suggestion
          document.getElementById("marketOutput").innerHTML = `
            <p><i class='fas fa-lightbulb' style='color: var(--mustard)'></i> <strong>AI Suggestion:</strong> This craft would appeal to customers interested in authentic handmade goods. Consider highlighting the traditional techniques used in its creation.</p>
          `;
        }, 1500);
      };

      recognition.onerror = function(event) {
        document.getElementById("voiceLoading").style.display = "none";
        
        let errorMessage = "Error capturing speech. Please try again.";
        if (event.error === 'no-speech') {
          errorMessage = "No speech was detected. Please try again.";
        } else if (event.error === 'audio-capture') {
          errorMessage = "No microphone was found. Please ensure a microphone is connected.";
        } else if (event.error === 'not-allowed') {
          errorMessage = "Permission to use microphone is blocked. Please allow microphone access.";
        }
        
        document.getElementById("voiceOutput").innerHTML = `<p><i class='fas fa-exclamation-circle' style='color: var(--terracotta)'></i> ${errorMessage}</p>`;
      };
    }

    // Market customization
    function customizeMarket() {
      let market = document.getElementById("marketSelect").value;
      let output = "";

      if (market === "north") output = "Focus on the vibrant colors and intricate embroidery that characterize North Indian traditions. Highlight suitability for weddings and festive occasions.";
      else if (market === "south") output = "Emphasize the fine craftsmanship, traditional motifs, and cultural significance of this craft in South Indian ceremonies and daily life.";
      else if (market === "west") output = "Showcase the craft's versatility for both traditional and contemporary settings, appealing to Western India's diverse aesthetic preferences.";
      else if (market === "east") output = "Highlight the connection to nature and spiritual symbolism that resonates with Eastern Indian cultural traditions.";
      else if (market === "global") output = "Focus on the universal appeal of handmade craftsmanship, sustainability, and the story behind the artisan. Use terms like 'ethically made' and 'fair trade'.";
      else if (market === "europe") output = "Emphasize the craft's authenticity, traditional techniques, and uniqueness. European markets value products with stories and cultural significance.";
      else if (market === "usa") output = "Highlight the craft's uniqueness, craftsmanship, and how it supports artisan communities. American consumers appreciate products with social impact stories.";
      else output = "Please select a market to see customized recommendations.";

      document.getElementById("marketOutput").innerHTML = output ? 
        `<p><i class='fas fa-globe' style='color: var(--terracotta)'></i> <strong>Market Customization:</strong> ${output}</p>` : 
        "<p>Please select a market to see customized recommendations...</p>";
    }

    // Image upload preview
    function previewImage(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Check if file is an image
      if (!file.type.match('image.*')) {
        showToast("Please select an image file.", "error");
        return;
      }

      const img = document.getElementById("preview");
      img.style.display = "block";
      img.src = URL.createObjectURL(file);
      
      // Also set as poster image if available
      if (document.getElementById("posterImg")) {
        document.getElementById("posterImg").src = URL.createObjectURL(file);
      }
      
      showToast("Image uploaded successfully!", "success");
    }

    // Generate poster
    function generatePoster() {
      const poster = document.getElementById("poster");
      const title = document.getElementById("posterTitle").value;
      const description = document.getElementById("posterDesc").value;
      
      if (!title.trim() || !description.trim()) {
        showToast("Please provide both a title and description for your poster.", "error");
        return;
      }
      
      // Update poster content
      document.getElementById("posterCaption").textContent = title;
      document.getElementById("posterDescription").textContent = description;
      
      // Show poster and download button
      poster.style.display = "block";
      document.getElementById("downloadBtn").style.display = "block";
      
      showToast("Poster generated successfully!", "success");
    }

    // Download poster as image
    function downloadPoster() {
      const poster = document.getElementById("poster");
      html2canvas(poster).then(canvas => {
        const link = document.createElement("a");
        link.download = "artisan-poster.png";
        link.href = canvas.toDataURL();
        link.click();
      });
      
      showToast("Poster downloaded!", "success");
    }

    // AI Storytelling
    function generateStory() {
      const product = document.getElementById("storyInput").value.trim();
      if (!product) {
        showToast("Please enter a craft name first!", "error");
        return;
      }

      document.getElementById("storyLoading").style.display = "block";
      document.getElementById("storyOutput").innerHTML = "<p>Generating your story...</p>";

      // Simulate AI processing with a delay
      setTimeout(() => {
        const stories = {
          "handwoven basket": `This ${product} is woven by skilled artisans using techniques passed down through generations. Each basket tells a story of cultural heritage and connection to nature, with patterns that reflect the artisan's environment and traditions.`,
          "pottery": `This ${product} is hand-thrown by skilled artisans using techniques that date back thousands of years. The clay is sourced locally from riverbanks, and each piece is sun-dried before being fired in traditional wood-burning kilns. The unique patterns are created using natural dyes and represent the artisan's connection to their environment and cultural symbols.`,
          "jewelry": `Crafted by hand using techniques perfected over centuries, this ${product} tells a story of cultural identity and artistic expression. The artisan has incorporated traditional motifs that symbolize protection, prosperity, and connection to nature, creating a piece that is both beautiful and meaningful.`,
          "": "Please enter a craft name to generate a story."
        };

        const story = stories[product.toLowerCase()] || 
          `This ${product} was handcrafted by skilled artisans using traditional techniques passed down through generations. Each piece tells a story of cultural heritage, meticulous craftsmanship, and the artisan's connection to their community and traditions. The attention to detail and use of natural materials make it a unique piece that carries the soul of its maker.`;

        document.getElementById("storyLoading").style.display = "none";
        document.getElementById("storyOutput").innerHTML = `
          <p><i class='fas fa-book-open' style='color: var(--terracotta)'></i> <strong>Story for ${product}:</strong></p>
          <p>${story}</p>
        `;
      }, 2000);
    }

    // Pricing calculation
    function calculatePricing() {
      const productName = document.getElementById("productName").value;
      const costPrice = parseFloat(document.getElementById("costPrice").value);
      const hoursWorked = parseFloat(document.getElementById("hoursWorked").value);
      
      if (!productName || isNaN(costPrice) || isNaN(hoursWorked)) {
        showToast("Please fill all fields correctly for pricing calculation", "error");
        return;
      }
      
      if (costPrice <= 0 || hoursWorked <= 0) {
        showToast("Cost price and hours worked must be positive numbers", "error");
        return;
      }
      
      // Simple pricing algorithm
      const hourlyRate = 200; // Fair wage per hour
      const materialCost = costPrice;
      const laborCost = hoursWorked * hourlyRate;
      const totalCost = materialCost + laborCost;
      const wholesalePrice = totalCost * 1.5;
      const retailPrice = wholesalePrice * 2;
      
      document.getElementById("pricingOutput").innerHTML = `
        <p><strong>Pricing suggestions for ${productName}:</strong></p>
        <ul>
          <li>Material Cost: ₹${materialCost.toFixed(2)}</li>
          <li>Labor Cost (${hoursWorked} hours): ₹${laborCost.toFixed(2)}</li>
          <li>Total Cost: ₹${totalCost.toFixed(2)}</li>
          <li><strong>Wholesale Price: ₹${wholesalePrice.toFixed(2)}</strong></li>
          <li><strong>Retail Price: ₹${retailPrice.toFixed(2)}</strong></li>
        </ul>
        <p><i>Note: These are suggested prices based on fair wage principles.</i></p>
      `;
    }

    // Market analysis
    function showMarketAnalysis() {
      const category = document.getElementById("productCategory").value;
      
      if (!category) {
        showToast("Please select a product category first", "error");
        return;
      }
      
      const analyses = {
        "textiles": "The textile market is growing at 8% annually, with increased demand for handmade, sustainable products. Popular price points: ₹2000-8000. Best selling seasons: Festival and wedding months (October-March).",
        "pottery": "Artisanal pottery has seen a 15% increase in demand, particularly for functional home goods. Popular price points: ₹500-3000. Customers value uniqueness and craftsmanship over perfect symmetry.",
        "jewelry": "Handmade jewelry market is expanding rapidly, especially pieces with cultural stories. Popular price points: ₹1000-5000. Silver and brass pieces with traditional motifs are particularly popular.",
        "home": "Home decor artisans are benefiting from the 'conscious consumer' trend. Popular price points: ₹1500-10000. Natural materials and cultural stories enhance perceived value.",
        "art": "Art market is recovering post-pandemic, with growing interest in cultural art forms. Popular price points: ₹5000-30000. Online galleries and social media are effective sales channels."
      };
      
      document.getElementById("analysisOutput").innerHTML = `
        <p><strong>Market Analysis for ${category}:</strong></p>
        <p>${analyses[category]}</p>
        <p><i>Source: ArtisanAI Market Trends Report 2023</i></p>
      `;
    }

    // Marketing tips
    function generateMarketingTips() {
      const businessSize = document.getElementById("businessSize").value;
      
      if (!businessSize) {
        showToast("Please select your business size first", "error");
        return;
      }
      
      const tips = {
        "individual": "As an individual artisan, focus on telling your personal story. Use social media to showcase your process. Consider collaborating with other artisans for pop-up events. High-quality photography is essential - natural light works best.",
        "small": "With a small team, you can specialize in custom orders. Develop a signature style and build a loyal customer base. Consider teaching workshops to diversify income. Create a simple website with an about page for each artisan.",
        "medium": "As a medium enterprise, you can invest in professional product photography. Develop collections around themes or festivals. Explore wholesale opportunities with boutiques. Consider participating in craft fairs and exhibitions.",
        "large": "As a large cooperative, you can develop a brand identity with consistent packaging. Invest in an e-commerce website with multiple payment options. Explore export opportunities with cultural organizations. Consider developing training programs to preserve traditional techniques."
      };
      
      document.getElementById("tipsOutput").innerHTML = `
        <p><strong>Marketing Tips for Your Business:</strong></p>
        <p>${tips[businessSize]}</p>
      `;
    }

    // AI Virtual Assistant Chat
    function sendChatMessage() {
      const input = document.getElementById("chatInput");
      const message = input.value.trim();
      
      if (!message) return;
      
      const chatMessages = document.getElementById("chatMessages");
      
      // Add user message
      chatMessages.innerHTML += `
        <div class="message user-message">
          ${message}
        </div>
      `;
      
      // Clear input
      input.value = "";
      
      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Simulate AI response after a delay
      setTimeout(() => {
        // Simple response logic
        let response = "";
        
        if (message.toLowerCase().includes("price") || message.toLowerCase().includes("cost")) {
          response = "Pricing depends on materials, time investment, and market factors. I can help you calculate a fair price using our pricing tool.";
        } else if (message.toLowerCase().includes("market") || message.toLowerCase().includes("sell")) {
          response = "Based on current trends, handmade products are in high demand globally. Consider targeting markets that value sustainability and cultural authenticity.";
        } else if (message.toLowerCase().includes("story") || message.toLowerCase().includes("describe")) {
          response = "A good product story includes information about materials, techniques, cultural significance, and the artisan's personal connection to the craft.";
        } else if (message.toLowerCase().includes("photo") || message.toLowerCase().includes("image")) {
          response = "For product photography, use natural light and a simple background. Show details and the product in use. Our platform can help you create professional-looking images.";
        } else {
          response = "I'm here to help with your artisan business. You can ask me about pricing, marketing, storytelling, or product presentation.";
        }
        
        // Add bot response
        chatMessages.innerHTML += `
          <div class="message bot-message">
            ${response}
          </div>
        `;
        
        // Scroll to bottom again
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    }

    // Allow pressing Enter to send chat message
    document.getElementById("chatInput").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        sendChatMessage();
      }
    });

    // Generate Sample Inventory with editable stock
    function generateSampleInventory() {
      const inventoryGrid = document.getElementById("inventoryGrid");
      
      const sampleItems = [
        { name: "Handwoven Sari", stock: 5, image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23D7C0AA'/><text x='100' y='75' font-family='Arial' font-size='16' fill='%232C272E' text-anchor='middle'>Handwoven Sari</text></svg>" },
        { name: "Clay Pottery Set", stock: 3, image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23B85C38'/><text x='100' y='75' font-family='Arial' font-size='16' fill='white' text-anchor='middle'>Clay Pottery Set</text></svg>" },
        { name: "Brass Earrings", stock: 12, image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%23E3B448'/><text x='100' y='75' font-family='Arial' font-size='16' fill='white' text-anchor='middle'>Brass Earrings</text></svg>" },
        { name: "Wooden Sculpture", stock: 2, image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'><rect width='200' height='150' fill='%232D4263'/><text x='100' y='75' font-family='Arial' font-size='16' fill='white' text-anchor='middle'>Wooden Sculpture</text></svg>" }
      ];
      
      // Load from localStorage if available
      const savedInventory = JSON.parse(localStorage.getItem('inventory')) || sampleItems;
      
      let inventoryHTML = "";
      
      savedInventory.forEach((item, index) => {
        inventoryHTML += `
          <div class="inventory-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="inventory-details">
              <h4>${item.name}</h4>
              <p>Stock: <input type="number" value="${item.stock}" onchange="updateStock(${index}, this.value)"></p>
            </div>
          </div>
        `;
      });
      
      inventoryGrid.innerHTML = inventoryHTML;
      showToast("Inventory loaded! Edit stock as needed.", "success");
    }

    // Update stock in localStorage
    function updateStock(index, newStock) {
      const savedInventory = JSON.parse(localStorage.getItem('inventory')) || [];
      if (index >= 0 && index < savedInventory.length) {
        savedInventory[index].stock = parseInt(newStock) || 0;
        localStorage.setItem('inventory', JSON.stringify(savedInventory));
        showToast("Stock updated!", "success");
      }
    }

    // Activate AR Preview
    function activateAR() {
      const arPlaceholder = document.getElementById("arPlaceholder");
      arPlaceholder.innerHTML = `
        <i class="fas fa-spinner fa-spin" style="font-size: 3rem; margin-bottom: 15px;"></i>
        <p>Loading AR experience...</p>
      `;
      
      // Simulate AR loading with improved message
      setTimeout(() => {
        arPlaceholder.innerHTML = `
          <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 15px; color: var(--sage);"></i>
          <p>AR experience loaded</p>
          <p style="font-size: 0.8rem; margin-top: 10px;">Move your device to view product in AR. (Simulation: Imagine your product here!)</p>
        `;
        
        showToast("AR experience activated!", "success");
      }, 2000);
    }

    // Dynamic Calendar
    function generateCalendar(month, year) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      document.getElementById("calendarMonthYear").textContent = `${monthNames[month]} ${year}`;

      const firstDay = new Date(year, month, 1).getDay(); // 0=Sun, 6=Sat
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let calendarHTML = "<div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>";

      // Empty cells
      for (let i = 0; i < firstDay; i++) {
        calendarHTML += "<div class='calendar-cell'></div>";
      }

      // Days
      const today = new Date();
      for (let day = 1; day <= daysInMonth; day++) {
        let cellClass = "calendar-cell";
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          cellClass += " today";
        }
        calendarHTML += `<div class="${cellClass}">${day}</div>`;
      }

      document.getElementById("calendarGrid").innerHTML = calendarHTML;
    }

    function prevMonth() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      generateCalendar(currentMonth, currentYear);
    }

    function nextMonth() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      generateCalendar(currentMonth, currentYear);
    }

    // New Feature: Confirm Generate Image
    function confirmGenerateImage() {
      const desc = document.getElementById("imageDesc").value.trim();
      if (!desc) {
        showToast("Please enter a description first!", "error");
        return;
      }

      if (confirm(`Do you want to generate an image for: "${desc}"?`)) {
        // Simulate generation
        document.getElementById("imagePreview").style.display = "block";
        showToast("Image generated! (Placeholder shown)", "success");
      } else {
        showToast("Image generation cancelled.");
      }
    }

    // New Feature: Calculate Sustainability
    function calculateSustainability() {
      const materials = parseFloat(document.getElementById("materialsUsed").value);
      const water = parseFloat(document.getElementById("waterUsed").value);

      if (isNaN(materials) || isNaN(water) || materials < 0 || water < 0) {
        showToast("Please enter valid positive numbers!", "error");
        return;
      }

      // Simple calculation
      const treesSaved = (materials * 0.5).toFixed(1); // Arbitrary formula
      const carbonReduced = (water * 0.002).toFixed(2);

      document.getElementById("sustainOutput").innerHTML = `
        <p><strong>Sustainability Impact:</strong></p>
        <ul>
          <li>Trees Saved: ${treesSaved}</li>
          <li>Carbon Reduced: ${carbonReduced}T</li>
        </ul>
      `;
    }

    // Material Calculator
    function calculateMaterials() {
      const projectType = document.getElementById("projectType").value;
      const length = parseFloat(document.getElementById("projectLength").value) || 0;
      const width = parseFloat(document.getElementById("projectWidth").value) || 0;
      const height = parseFloat(document.getElementById("projectHeight").value) || 0;
      const quantity = parseInt(document.getElementById("projectQuantity").value) || 1;
      
      if (!projectType) {
        showToast("Please select a project type first", "error");
        return;
      }
      
      let result = "";
      let costEstimate = "";
      let timeEstimate = "";
      
      // Different calculations based on project type
      switch(projectType) {
        case "weaving":
          const area = length * width / 10000; // in m²
          const yarnNeeded = area * 200; // approx 200g per m²
          result = `You'll need approximately <strong>${(yarnNeeded * quantity).toFixed(0)}g</strong> of yarn for ${quantity} item(s).`;
          costEstimate = `Estimated material cost: ₹${(yarnNeeded * quantity * 0.02).toFixed(2)}`;
          timeEstimate = `Estimated time: ${(quantity * 120).toFixed(0)} minutes`;
          break;
          
        case "pottery":
          const volume = (Math.PI * Math.pow(width/2, 2) * height) / 1000; // in cm³ to liters
          const clayNeeded = volume * 1.5; // approx 1.5kg per liter
          result = `You'll need approximately <strong>${(clayNeeded * quantity).toFixed(2)}kg</strong> of clay for ${quantity} item(s).`;
          costEstimate = `Estimated material cost: ₹${(clayNeeded * quantity * 80).toFixed(2)}`;
          timeEstimate = `Estimated time: ${(quantity * 90).toFixed(0)} minutes (plus drying/firing time)`;
          break;
          
        case "woodworking":
          const boardFeet = (length * width * height) / 144; // in board feet
          result = `You'll need approximately <strong>${(boardFeet * quantity).toFixed(2)} board feet</strong> of wood for ${quantity} item(s).`;
          costEstimate = `Estimated material cost: ₹${(boardFeet * quantity * 150).toFixed(2)}`;
          timeEstimate = `Estimated time: ${(quantity * 180).toFixed(0)} minutes`;
          break;
          
        case "jewelry":
          result = `Based on your dimensions, you'll need materials for ${quantity} piece(s).`;
          costEstimate = `Estimated material cost: ₹${(quantity * 250).toFixed(2)} (varies by materials)`;
          timeEstimate = `Estimated time: ${(quantity * 45).toFixed(0)} minutes`;
          break;
      }
      
      document.getElementById("materialResult").innerHTML = result;
      document.getElementById("supplyCosts").innerHTML = costEstimate;
      document.getElementById("timeEstimate").innerHTML = timeEstimate;
    }
    
    // Find Suppliers
    function findSuppliers() {
      const projectType = document.getElementById("projectType").value;
      
      if (!projectType) {
        showToast("Please select a project type first", "error");
        return;
      }
      
      showToast("Searching for local suppliers...");
      
      // Simulate API call delay
      setTimeout(() => {
        let suppliers = "";
        
        switch(projectType) {
          case "weaving":
            suppliers = "<ul><li>Delhi Yarn Emporium - 2.3km away</li><li>Handloom Materials Depot - 3.7km away</li><li>Natural Fibers Co-op - 5.1km away</li></ul>";
            break;
          case "pottery":
            suppliers = "<ul><li>Clay & Craft Supplies - 1.8km away</li><li>Potter's Wheel Materials - 4.2km away</li><li>Artisan Clay Depot - 3.5km away</li></ul>";
            break;
          case "woodworking":
            suppliers = "<ul><li>Hardwood Suppliers - 5.3km away</li><li>Traditional Wood Depot - 2.9km away</li><li>Artisan Lumber Co. - 4.7km away</li></ul>";
            break;
          case "jewelry":
            suppliers = "<ul><li>Beads & Findings - 1.2km away</li><li>Precious Metals Inc - 3.4km away</li><li>Artisan Jewelry Supply - 2.1km away</li></ul>";
            break;
        }
        
        document.getElementById("supplyCosts").innerHTML = suppliers;
        showToast("Local suppliers found!", "success");
      }, 1500);
    }
    
    // Add to Calendar
    function addToCalendar() {
      const projectType = document.getElementById("projectType").value;
      const skillLevel = document.getElementById("skillLevel").value;
      
      if (!projectType) {
        showToast("Please select a project type first", "error");
        return;
      }
      
      // Calculate time based on skill level
      let timeMultiplier = 1;
      if (skillLevel === "beginner") timeMultiplier = 1.5;
      if (skillLevel === "advanced") timeMultiplier = 0.7;
      
      showToast("Added time estimate to your calendar", "success");
    }
    
    // AI Design Tools
    function generateColorPalette() {
      const style = document.getElementById("colorStyle").value;
      
      if (!style) {
        showToast("Please select a color style first", "error");
        return;
      }
      
      const palettes = {
        traditional: ["#D7C0AA", "#B85C38", "#8CA88E", "#E3B448", "#2D4263"],
        modern: ["#F5F1E6", "#2C272E", "#B85C38", "#8CA88E", "#E3B448"],
        vibrant: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#6B5B95", "#88D8B0"],
        earthy: ["#A97C50", "#BD8E62", "#7E8D85", "#6B5B95", "#3C2F2F"],
        festive: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#6B5B95", "#88D8B0"]
      };
      
      const palette = palettes[style] || palettes.traditional;
      
      let paletteHTML = "";
      palette.forEach(color => {
        paletteHTML += `<div class="color-item" style="background: ${color};">${color}</div>`;
      });
      
      document.getElementById("colorPalette").innerHTML = paletteHTML;
      showToast("Color palette generated!", "success");
    }
    
    function generateDesignSuggestions() {
      const category = document.getElementById("designCategory").value;
      const brief = document.getElementById("designBrief").value;
      
      if (!category || !brief) {
        showToast("Please fill in all fields", "error");
        return;
      }
      
      document.getElementById("designOutput").innerHTML = "<p>Generating design suggestions...</p>";
      
      // Simulate AI processing
      setTimeout(() => {
        const suggestions = {
          textiles: [
            "Consider incorporating traditional motifs with a modern twist",
            "Experiment with natural dye techniques for unique color variations",
            "Try blending different textile textures for visual interest"
          ],
          pottery: [
            "Explore organic forms inspired by nature",
            "Consider adding subtle texture with imprint techniques",
            "Experiment with contrasting glazes for dramatic effects"
          ],
          jewelry: [
            "Combine mixed metals for contemporary appeal",
            "Incorporate natural elements like stones or wood",
            "Explore asymmetrical designs for modern aesthetics"
          ],
          wood: [
            "Highlight the natural grain with oil finishes",
            "Combine wood with other materials like metal or glass",
            "Explore joinery techniques as decorative elements"
          ]
        };
        
        const categorySuggestions = suggestions[category] || [
          "Focus on creating pieces that tell a story",
          "Consider the functional aspects alongside aesthetics",
          "Experiment with scale and proportion for visual impact"
        ];
        
        let outputHTML = "<p><strong>Design suggestions based on your project:</strong></p><ul>";
        categorySuggestions.forEach(suggestion => {
          outputHTML += `<li>${suggestion}</li>`;
        });
        outputHTML += "</ul>";
        
        document.getElementById("designOutput").innerHTML = outputHTML;
      }, 2000);
    }
    
    function predictTrends() {
      const category = document.getElementById("trendCategory").value;
      
      if (!category) {
        showToast("Please select a category first", "error");
        return;
      }
      
      document.getElementById("trendOutput").innerHTML = "<p>Analyzing market trends...</p>";
      
      // Simulate AI processing
      setTimeout(() => {
        const trends = {
          textiles: "Textiles with cultural storytelling and sustainable production methods are trending upwards. Look for increased interest in handmade pieces with natural dyes.",
          pottery: "Organic, imperfect forms and matte glazes are gaining popularity. Functional art pieces that blend tradition with contemporary aesthetics are in high demand.",
          jewelry: "Personalized, meaningful jewelry with cultural motifs is trending. Mixed materials and sustainable sourcing are important factors for consumers.",
          home: "Artisanal home decor that combines function with artistry is increasingly popular. Pieces that tell a story or represent specific cultural traditions are in demand."
        };
        
        document.getElementById("trendOutput").innerHTML = `
          <p><strong>Trend predictions for ${category}:</strong></p>
          <p>${trends[category] || "Sustainable, handmade pieces with cultural significance are trending across all categories."}</p>
        `;
      }, 2000);
    }
    
    // AI Pricing Optimizer
    function optimizePricing() {
      const product = document.getElementById("pricingProduct").value;
      const currentPrice = parseFloat(document.getElementById("currentPrice").value);
      
      if (!product || isNaN(currentPrice)) {
        showToast("Please fill in all fields", "error");
        return;
      }
      
      // Simulate AI analysis
      const economyPrice = currentPrice * 0.7;
      const recommendedPrice = currentPrice * 1.1;
      const premiumPrice = currentPrice * 1.5;
      
      document.getElementById("pricingStrategy").innerHTML = `
        <p><strong>Pricing strategy for ${product}:</strong></p>
        <p>Based on market analysis, we recommend pricing at ₹${recommendedPrice.toFixed(0)} for optimal balance of volume and profit margin.</p>
        <p>This price positions your product competitively while maintaining the perceived value of handcrafted quality.</p>
      `;
    }
    
    // AI Customer Insights
    function generateCustomerInsights() {
      const product = document.getElementById("customerProduct").value;
      
      if (!product) {
        showToast("Please select a product category", "error");
        return;
      }
      
      document.getElementById("customerInsights").innerHTML = "<p>Generating customer insights...</p>";
      
      // Simulate AI processing
      setTimeout(() => {
        const insights = {
          textiles: "Your typical customer values sustainability and cultural authenticity. They are willing to pay premium prices for pieces with stories and traditional techniques.",
          pottery: "Your customers appreciate functional art and the uniqueness of handcrafted pieces. They value knowing about the artisan and the creation process.",
          jewelry: "Your audience seeks meaningful, unique pieces that reflect personal style and cultural heritage. They value craftsmanship and material quality.",
          home: "Your customers are looking for statement pieces that add character to their spaces. They value artisanal quality and cultural authenticity."
        };
        
        document.getElementById("customerInsights").innerHTML = `
          <p><strong>Customer insights for ${product}:</strong></p>
          <p>${insights[product] || "Your customers value handmade quality, cultural authenticity, and sustainable practices."}</p>
        `;
      }, 2000);
    }
    
    // AI Design Recommendations
    function generateDesignRecommendations() {
      const designType = document.getElementById("designType").value;
      const goals = document.getElementById("designGoals").value;
      
      if (!designType || !goals) {
        showToast("Please fill in all fields", "error");
        return;
      }
      
      document.getElementById("designRecommendations").innerHTML = "<p>Generating design recommendations...</p>";
      document.getElementById("designPreview").innerHTML = "<p>Creating preview...</p>";
      
      // Simulate AI processing
      setTimeout(() => {
        const recommendations = {
          pattern: "Consider geometric patterns inspired by traditional motifs but with modern simplicity. Use a limited color palette for contemporary appeal.",
          product: "Focus on ergonomic designs that blend form and function. Consider how the product feels in use as well as how it looks.",
          packaging: "Use sustainable materials that reflect your brand values. Consider how unboxing can be part of the customer experience.",
          display: "Create displays that tell a story about your craft. Use levels and textures to create visual interest."
        };
        
        document.getElementById("designRecommendations").innerHTML = `
          <p><strong>Design recommendations for ${designType}:</strong></p>
          <p>${recommendations[designType] || "Focus on creating a cohesive design language that reflects your brand values and craft tradition."}</p>
        `;
        
        document.getElementById("designPreview").innerHTML = `
          <p style="text-align: center; font-weight: bold;">Design Preview</p>
          <p style="text-align: center;">Based on your goals: "${goals}"</p>
        `;
      }, 2000);
    }
    
    // AI Market Trend Prediction
    function predictMarketTrends() {
      const region = document.getElementById("trendRegion").value;
      const timeframe = parseInt(document.getElementById("timeframe").value) || 6;
      
      if (!region) {
        showToast("Please select a region", "error");
        return;
      }
      
      document.getElementById("trendPredictions").innerHTML = "<p>Analyzing market trends...</p>";
      
      // Simulate AI processing
      setTimeout(() => {
        const trends = {
          local: "Local markets are showing increased interest in hyper-local crafts that represent specific regional traditions. Consumers are seeking connection to their community through artisan products.",
          national: "Nationally, there's growing appreciation for diverse cultural crafts. Pieces that represent specific traditions while having contemporary appeal are trending.",
          global: "Globally, sustainable and ethically made crafts are in high demand. Pieces with authentic stories and cultural significance are valued by international consumers."
        };
        
        document.getElementById("trendPredictions").innerHTML = `
          <p><strong>Market trends for ${region} region (next ${timeframe} months):</strong></p>
          <p>${trends[region] || "Sustainable, culturally authentic crafts with contemporary appeal are trending across all markets."}</p>
        `;
      }, 2000);
    }
    
    // Offer Countdown Timer
    function updateOfferTimer() {
      const now = new Date();
      const endDate = new Date();
      endDate.setDate(now.getDate() + 2); // 2 days from now
      
      const timeRemaining = endDate - now;
      
      if (timeRemaining <= 0) {
        document.getElementById("offer-timer").textContent = "00:00:00";
        return;
      }
      
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      
      document.getElementById("offer-timer").textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
      // Set some sample values for demo purposes
      document.getElementById("storyInput").value = "Handwoven Basket";
      document.getElementById("posterTitle").value = "Handcrafted with Love";
      document.getElementById("posterDesc").value = "A unique artisan craft that tells a story of tradition and craftsmanship";
      
      // Generate calendar
      generateCalendar(currentMonth, currentYear);

      // Update offer timer every second
      setInterval(updateOfferTimer, 1000);
      updateOfferTimer();

      // Show a welcome toast after page loads
      setTimeout(() => {
        showToast("Welcome to ArtisanAI! Explore our features below.");
      }, 1000);
    });