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

function renderFragment(node) {
    const container = document.getElementById('fragment-container');
    
    // Shifts the CSS theme variables based on the Age
    document.body.className = node.age;

    // Forces the animation to re-trigger
    container.innerHTML = '';
    
    setTimeout(() => {
        container.innerHTML = `
            <article class="fragment focus">
                <div class="fragment-texture"></div>
                <h2 class="${node.type}">${node.title}</h2>
                <p>${node.content}</p>
            </article>
        `;
    }, 10);
}

document.addEventListener('DOMContentLoaded', loadLore);
