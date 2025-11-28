document.addEventListener('DOMContentLoaded', () => {
    let isAdminLoggedIn = false;
    let leafletMap = null;

    const mainContent = document.getElementById('main-content');
    const allPages = document.querySelectorAll('.page');
    const navButtons = document.querySelectorAll('.nav-button');
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');

    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const btnCancelLogin = document.getElementById('btn-cancel-login');
    const loginError = document.getElementById('login-error');

    const modalNovidade = document.getElementById('modal-add-novidade');
    const formNovidade = document.getElementById('form-add-novidade');
    const btnShowModalNovidades = document.getElementById('btn-show-modal-novidades');
    const btnCancelNovidade = document.getElementById('btn-cancel-novidade');

    const modalHorarios = document.getElementById('modal-set-horarios');
    const btnShowModalHorarios = document.getElementById('btn-show-modal-horarios');
    const btnCancelHorarios = document.getElementById('btn-cancel-horarios');

    async function carregarNovidades() {
        try {
            const response = await fetch('/api/novidades');
            const novidades = await response.json();
            renderNovidades(novidades);
        } catch (error) {
            console.error('Erro ao buscar novidades:', error);
            document.getElementById('novidades-lista').innerHTML = '<p class="text-red-500">Erro ao carregar novidades.</p>';
        }
    }

    async function carregarAtracoes() {
        try {
            const response = await fetch('/api/atracoes');
            const atracoes = await response.json();
            renderAtracoes(atracoes);
            window.dadosMapa = atracoes;
        } catch (error) {
            console.error('Erro ao buscar atrações:', error);
        }
    }

    async function carregarEventos() {
        try {
            const response = await fetch('/api/eventos');
            const eventos = await response.json();
            renderEventos(eventos);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    }

    function renderNovidades(listaNovidades) {
        const container = document.getElementById('novidades-lista');
        if (!container) return;
        container.innerHTML = '';

        const alertColors = {
            info: 'bg-blue-100 border-blue-500 text-blue-700',
            aviso: 'bg-yellow-100 border-yellow-500 text-yellow-700',
            perigo: 'bg-red-100 border-red-500 text-red-700'
        };
        const iconColors = {
            info: 'fa-info-circle text-blue-500',
            aviso: 'fa-exclamation-triangle text-yellow-500',
            perigo: 'fa-exclamation-circle text-red-500'
        };

        if (listaNovidades.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-sm">Nenhuma novidade no momento.</p>';
            return;
        }

        listaNovidades.forEach(item => {
            const card = document.createElement('div');
            card.className = `border-l-4 p-4 rounded-md shadow-sm ${alertColors[item.tipo] || alertColors.info}`;
            card.innerHTML = `
                <div class="flex items-start">
                    <i class="fas ${iconColors[item.tipo] || iconColors.info} text-xl mr-3 mt-1"></i>
                    <div>
                        <h4 class="font-bold">${item.titulo}</h4>
                        <p class="text-sm">${item.descricao}</p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function renderAtracoes(listaAtracoes) {
        const container = document.getElementById('atracoes-lista');
        if (!container) return;
        container.innerHTML = '';

        listaAtracoes.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1';
            const imgFallback = "this.onerror=null;this.src='https://placehold.co/600x400/e2e8f0/475569?text=Imagem+Indispon%C3%ADvel';";

            card.innerHTML = `
                <img src="${item.imagem}" onerror="${imgFallback}" alt="${item.titulo}" class="w-full h-40 object-cover">
                <div class="p-4">
                    <h3 class="text-lg font-bold text-gray-800">${item.titulo}</h3>
                    <p class="text-sm text-gray-600 mb-3">${item.descricao}</p>
                    <div class="flex justify-between items-center text-sm">
                        <span class="font-semibold text-green-700">${item.tipo}</span>
                        <div class="space-x-3">
                            <span class="text-gray-600"><i class="fas fa-tachometer-alt mr-1"></i> ${item.dificuldade}</span>
                            ${item.tempo ? `<span class="text-gray-600"><i class="fas fa-clock mr-1"></i> ${item.tempo}</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    function renderEventos(listaEventos) {
        const container = document.getElementById('eventos-lista');
        if (!container) return;
        container.innerHTML = '';

        if (listaEventos.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-sm">Nenhum evento programado.</p>';
            return;
        }

        listaEventos.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg shadow-md p-4';
            card.innerHTML = `
                <h3 class="text-lg font-bold text-gray-800">${item.titulo}</h3>
                <p class="text-sm font-semibold text-green-600 mb-1"><i class="fas fa-calendar-alt mr-2"></i>${item.data}</p>
                <p class="text-sm text-gray-500 mb-2"><i class="fas fa-map-marker-alt mr-2"></i>${item.local}</p>
                <p class="text-sm text-gray-600">${item.descricao}</p>
            `;
            container.appendChild(card);
        });
    }

    function initMap() {
        if (leafletMap) return;
        try {
            leafletMap = L.map('map').setView([-22.425, -42.985], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(leafletMap);

            const atracoes = window.dadosMapa || [];
            atracoes.forEach(item => {
                if (item.lat && item.lng) {
                    const iconHTML = item.tipo === 'Trilha'
                        ? '<i class="fas fa-hiking text-white"></i>'
                        : '<i class="fas fa-water text-white"></i>';
                    const customIcon = L.divIcon({
                        html: `<div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                            item.tipo === 'Trilha' ? 'bg-green-600' : 'bg-blue-600'
                        }">${iconHTML}</div>`,
                        className: 'bg-transparent border-none',
                        iconSize: [32, 32],
                        iconAnchor: [16, 16]
                    });
                    L.marker([item.lat, item.lng], { icon: customIcon })
                        .addTo(leafletMap)
                        .bindPopup(`<b>${item.titulo}</b><br>${item.dificuldade}`);
                }
            });
        } catch (e) {
            console.error('Erro ao inicializar mapa:', e);
        }
    }

    function navigateTo(pageId) {
        allPages.forEach(p => {
            p.classList.add('hidden');
            p.classList.remove('active');
        });
        const target = document.getElementById(`page-${pageId}`);
        if (target) {
            target.classList.remove('hidden');
            target.classList.add('active');
            mainContent.scrollTop = 0;
        }
        navButtons.forEach(b => {
            if (b.dataset.page === pageId) {
                b.classList.add('active');
            } else {
                b.classList.remove('active');
            }
        });
        if (pageId === 'mapa') {
            setTimeout(() => {
                if (!leafletMap) initMap();
                else leafletMap.invalidateSize();
            }, 100);
        }
    }

    function showModal(el) {
        el.classList.remove('invisible', 'opacity-0');
    }

    function hideModal(el) {
        el.classList.add('invisible', 'opacity-0');
        if (loginError) loginError.classList.add('hidden');
    }

    function handleAdminLogin(e) {
        e.preventDefault();
        if (loginForm.username.value === 'admin' && loginForm.password.value === '1234') {
            isAdminLoggedIn = true;
            hideModal(loginModal);
            adminLoginBtn.classList.add('hidden');
            adminLogoutBtn.classList.remove('hidden');
            navigateTo('admin');
        } else {
            loginError.classList.remove('hidden');
        }
    }

    async function handleAddNovidade(e) {
        e.preventDefault();
        const novaNovidade = {
            titulo: formNovidade['novidade-titulo'].value,
            descricao: formNovidade['novidade-descricao'].value,
            tipo: formNovidade['novidade-tipo'].value
        };

        try {
            const response = await fetch('/api/novidades', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaNovidade)
            });

            if (response.ok) {
                alert('Novidade publicada com sucesso!');
                formNovidade.reset();
                hideModal(modalNovidade);
                carregarNovidades();
            } else {
                alert('Erro ao salvar no servidor.');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            alert('Erro de conexão com o servidor.');
        }
    }

    navButtons.forEach(btn => btn.addEventListener('click', () => {
        const pid = btn.dataset.page;
        (isAdminLoggedIn && pid === 'inicio') ? navigateTo('admin') : navigateTo(pid);
    }));

    adminLoginBtn.addEventListener('click', () => showModal(loginModal));
    btnCancelLogin.addEventListener('click', () => hideModal(loginModal));
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) hideModal(loginModal);
    });
    loginForm.addEventListener('submit', handleAdminLogin);
    adminLogoutBtn.addEventListener('click', () => {
        isAdminLoggedIn = false;
        adminLoginBtn.classList.remove('hidden');
        adminLogoutBtn.classList.add('hidden');
        navigateTo('inicio');
    });

    btnShowModalNovidades.addEventListener('click', () => showModal(modalNovidade));
    btnCancelNovidade.addEventListener('click', () => hideModal(modalNovidade));
    modalNovidade.addEventListener('click', (e) => {
        if (e.target === modalNovidade) hideModal(modalNovidade);
    });
    formNovidade.addEventListener('submit', handleAddNovidade);

    btnShowModalHorarios.addEventListener('click', () => showModal(modalHorarios));
    btnCancelHorarios.addEventListener('click', () => hideModal(modalHorarios));
    modalHorarios.addEventListener('click', (e) => {
        if (e.target === modalHorarios) hideModal(modalHorarios);
    });

    function initApp() {
        carregarNovidades();
        carregarAtracoes();
        carregarEventos();
        navigateTo('inicio');
    }

    initApp();
});