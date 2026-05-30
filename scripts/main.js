async function loadLore() {
    try {
        const response = await fetch('./data/lore.json');
        const data = await response.json();
        renderFragment(data.nodes[0]); 
    } catch (error) {
        console.error('Archive corrupted: Unable to load data nodes.', error);
    }
}

function renderFragment(node) {
    const container = document.getElementById('fragment-container');
    
    document.body.className = node.age;

    container.innerHTML = `
        <article class="fragment focus">
            <div class="fragment-texture"></div>
            <h2 class="${node.type}">${node.title}</h2>
            <p>${node.content}</p>
        </article>
    `;
}

document.addEventListener('DOMContentLoaded', loadLore);
