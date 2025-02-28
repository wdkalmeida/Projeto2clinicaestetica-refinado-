const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

const slideWidth = slides[0].getBoundingClientRect().width;

slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current');
    targetSlide.classList.add('current');
};

prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current');
    const prevSlide = currentSlide.previousElementSibling;

    if (prevSlide) {
        moveToSlide(track, currentSlide, prevSlide);
    }
});

nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.nextElementSibling;

    if (nextSlide) {
        moveToSlide(track, currentSlide, nextSlide);
    }
});

        // Smooth scrolling effect
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Scroll-to-top button functionality
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        function openPatientsModal() {
            fetch('fetch_patients.php')
                .then(response => response.json())
                .then(data => {
                    const tbody = document.querySelector('#patientsTable tbody');
                    tbody.innerHTML = ''; // Limpa a tabela antes de preencher
    
                    data.forEach(patient => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${patient.nome}</td>
                            <td>${patient.email}</td>
                            <td>${patient.telefone}</td>
                            <td>${patient.procedimento}</td>
                            <td><button onclick="viewPatientDetails(${patient.id})">Ver Detalhes</button></td>
                        `;
                        tbody.appendChild(row);
                    });
    
                    document.getElementById('patientsModal').classList.add('open');
                })
                .catch(error => console.error('Erro ao buscar pacientes:', error));
        }
    
        // Função para fechar o modal de pacientes
        function closePatientsModal() {
            document.getElementById('patientsModal').classList.remove('open');
            document.getElementById('patientDetails').style.display = 'none'; // Esconde os detalhes ao fechar o modal
        }
    
        // Função para visualizar detalhes do paciente
        function viewPatientDetails(patientId) {
            fetch(`fetch_patient_details.php?id=${patientId}`)
                .then(response => response.json())
                .then(patient => {
                    // Preenche os campos de detalhes
                    document.getElementById('detailNome').value = patient.nome;
                    document.getElementById('detailEmail').value = patient.email;
                    document.getElementById('detailTelefone').value = patient.telefone;
                    document.getElementById('detailProcedimento').value = patient.procedimento;
                    document.getElementById('detailMensagem').value = patient.mensagem;
    
                    // Exibe a seção de detalhes
                    document.getElementById('patientDetails').style.display = 'block';
                })
                .catch(error => console.error('Erro ao buscar detalhes do paciente:', error));
        }
    
        // Fechar o modal se o usuário clicar fora dele
        window.onclick = function(event) {
            const modal = document.getElementById('patientsModal');
            if (event.target == modal) {
                closePatientsModal();
            }
        }
        