const search = document.getElementById('search');
search.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.item').forEach(it => {
        const title = it.querySelector('h3').innerText.toLowerCase();
        const desc = it.querySelector('p').innerText.toLowerCase();
        if (!q || title.includes(q) || desc.includes(q)) {
            it.style.display = '';
        } else {
            it.style.display = 'none';
        }
    })
})

function addItem(type) {
    const title = prompt("Name:");
    if (!title) return;
    const desc = prompt("Beschreibung:");
    const li = document.createElement('li');
    li.className = 'item ' + type;
    li.innerHTML = `
    <div class="badge">!</div>
    <div class="content">
      <h3 contenteditable="true">${title}</h3>
      <p contenteditable="true">${desc || ''}</p>
    </div>
    <div class="actions">
      <button class="btn ghost" onclick="editItem(this)">Bearbeiten</button>
      <button class="btn delete" onclick="deleteItem(this)">Löschen</button>
    </div>`;
    document.getElementById(type + "List").appendChild(li);
    saveData();
}

function editItem(btn) {
    const item = btn.closest('.item');
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');
    h3.setAttribute('contenteditable', 'true');
    p.setAttribute('contenteditable', 'true');
    h3.focus();
    saveData();
}

function markFixed(btn) {
    const li = btn.closest('.item');
    li.style.transition = 'opacity 400ms ease';
    li.style.opacity = '0.3';
    saveData();
}

function deleteItem(btn) {
    const li = btn.closest('.item');
    li.remove();
    saveData();
}

function toggleTheme() {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
}

function saveData() {
    const data = {
        fail: document.getElementById('failList').innerHTML,
        pfusch: document.getElementById('pfuschList').innerHTML
    };
    localStorage.setItem('lists', JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('lists'));
    if (data) {
        document.getElementById('failList').innerHTML = data.fail;
        document.getElementById('pfuschList').innerHTML = data.pfusch;
    }
    if (localStorage.getItem('theme') === 'light') {
        document.documentElement.classList.add('light');
    }
}

window.onload = loadData;