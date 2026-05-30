let archiveNodes = [];

async function loadLore() {
    try {
        const response = await fetch('./data/lore.json');
        const data = await response.json();
        archiveNodes = data.nodes;
        
        buildNavigation(archiveNodes);
        renderFragment(archiveNodes[0]); 
    } catch (error) {
        console.error('Archive corrupted: Unable to load data nodes.', error);
    }
}

function buildNavigation(nodes) {
    const nav = document.getElementById('nexus-nav');
    nav.innerHTML = ''; 
    
    nodes.forEach((node, index) => {
        const dot = document.createElement('div');
        dot.className = 'nav-node';
        dot.title = node.title; // Tooltip on hover
        
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.nav-node').forEach(n => n.classList.remove('active'));
            dot.classList.add('active');
            
            // Render new content
            renderFragment(node);
        });
        
        nav.appendChild(dot);
    });
}

// Update renderFragment in scripts/main.js
function renderFragment(node) {
    const container = document.getElementById('fragment-container');
    
    document.body.className = node.age;
    container.innerHTML = '';
    
    setTimeout(() => {
        const imageElement = node.image ? `<img src="${node.image}" alt="${node.title}" class="fragment-media">` : '';
        
        container.innerHTML = `
            <article class="fragment focus">
                <div class="fragment-texture"></div>
                ${imageElement}
                <h2 class="${node.type}">${node.title}</h2>
                <p>${node.content}</p>
            </article>
        `;
    }, 10);
}

document.addEventListener('DOMContentLoaded', loadLore);
