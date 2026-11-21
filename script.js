
// ============================================
// MIGUEL PEDRO STUDIOS
// SISTEMA DE SOLICITAÇÃO DE SERVIÇOS
// ============================================

console.log("Miguel Pedro Studios iniciado!");

// ============================================
// ANO AUTOMÁTICO NO RODAPÉ
// ============================================

const footer = document.querySelector("footer");

if (footer) {
    footer.innerHTML =
        `© ${new Date().getFullYear()} Miguel Pedro Studios. Todos os direitos reservados.`;
}

// ============================================
// NÚMERO OFICIAL DO WHATSAPP
// ============================================

const WHATSAPP_NUMBER = "244953890020";

// ============================================
// CATÁLOGO CENTRAL DE SERVIÇOS E PREÇOS
// ============================================

const SERVICE_CATALOG = {

    "Vídeos Publicitários": {

        displayPrice: "A partir de 12.000 Kz",

        packages: [

            {
                name: "Vídeo Publicitário Simples",
                price: "12.000 Kz",
                description:
                    "Vídeo comercial com duração máxima de 1 minuto, design moderno, boa qualidade de imagem, uma animação no vídeo, contacto do WhatsApp no rodapé e chamada para ação."
            },

            {
                name: "Vídeo Publicitário Profissional",
                price: "20.000 Kz",
                description:
                    "Inclui tudo do pacote simples, com animações no vídeo, animação do logotipo no final, maior qualidade de áudio e vídeo, arte criada para implementar no vídeo e produção mais detalhada e estratégica para vender mais. Duração: 1 a 2 minutos."
            },

            {
                name: "Vídeo Publicitário Premium",
                price: "35.000 Kz",
                description:
                    "Inclui tudo do pacote profissional e ainda patrocínio de 5 dias para ampliar o alcance da publicidade."
            }

        ]
    },

    "Animações Publicitárias": {

        displayPrice: "10.000 Kz",

        packages: [

            {
                name: "Animação Publicitária",
                price: "10.000 Kz",
                description:
                    "Animação profissional de logótipos, flyers e banners, com movimentos criativos, efeitos visuais e apresentação dinâmica para valorizar a comunicação da sua marca."
            }

        ]
    },

    "Design Gráfico": {

        displayPrice: "Logótipo: 8.000 Kz\nFlyer: 5.000 Kz",

        packages: [

            {
                name: "Criação de Logótipo",
                price: "8.000 Kz",
                description:
                    "Criação de logótipo profissional para representar a identidade da sua empresa, transmitir credibilidade e destacar a sua marca no mercado."
            },

            {
                name: "Criação de Flyer",
                price: "5.000 Kz",
                description:
                    "Criação de flyer profissional e atrativo para divulgar produtos, serviços, promoções e eventos, com comunicação visual pensada para captar a atenção do público."
            }

        ]
    },

    "Gestão de Redes Sociais": {

        displayPrice: "100.000 Kz / mês",

        packages: [

            {
                name: "Gestão Mensal de Redes Sociais",
                price: "100.000 Kz / mês",
                description:
                    "Transformamos as redes sociais da sua empresa numa poderosa ferramenta de crescimento. Criamos e organizamos conteúdos estratégicos para aumentar a visibilidade, fortalecer a imagem da marca, conquistar credibilidade, atrair potenciais clientes e gerar mais oportunidades de venda. Uma presença digital profissional ajuda a empresa a ganhar a confiança do público, destacar-se da concorrência e construir uma comunidade em torno dos seus produtos e serviços."
            }

        ]
    },

    "Publicidade Patrocinada": {

        displayPrice: "5 dias: 20.000 Kz, \n15 dias: 50.000 Kz",

        packages: [

            {
                name: "Patrocínio de 5 dias",
                price: "20.000 Kz",
                description:
                    "Divulgação patrocinada durante 5 dias para aumentar o alcance da publicação, apresentar a sua marca a mais pessoas e atrair potenciais clientes."
            },

            {
                name: "Patrocínio de 15 dias",
                price: "50.000 Kz",
                description:
                    "Divulgação patrocinada durante 15 dias para ampliar a visibilidade da sua empresa, alcançar mais pessoas e gerar novas oportunidades de negócio."
            }

        ]
    },

    "Criação de Documentos": {

        displayPrice: "4.000 Kz",

        packages: [

            {
                name: "Criação de Documentos",
                price: "4.000 Kz",
                description:
                    "Criação e formatação de documentos com qualidade, organização e apresentação profissional, para trabalhos académicos, documentos empresariais e outros materiais."
            }

        ]
    }

};

// ============================================
// MOSTRAR PREÇOS AUTOMATICAMENTE NOS CARTÕES
// ============================================

document.querySelectorAll(".open-service-modal").forEach(button => {

    const service = button.dataset.service;
    const serviceData = SERVICE_CATALOG[service];

    if (!serviceData) return;

    const card = button.closest(".service-card");

    if (!card) return;

    // Evitar duplicação de preços
    const existingPrice = card.querySelector(".service-price");

    if (existingPrice) {
        existingPrice.remove();
    }

    const priceElement = document.createElement("div");

    priceElement.className = "service-price";
    priceElement.textContent = serviceData.displayPrice;

    card.insertBefore(priceElement, button);

});

// ============================================
// ELEMENTOS DO MODAL
// ============================================

const modal = document.getElementById("serviceModal");
const closeModal = document.getElementById("closeServiceModal");
const serviceInput = document.getElementById("selectedService");
const packageSelect = document.getElementById("selectedPackage");
const priceDisplay = document.getElementById("servicePrice");
const serviceForm = document.getElementById("serviceForm");
const packageDescription = document.getElementById("packageDescription");

// ============================================
// ABRIR MODAL
// ============================================

function openServiceModal(service) {

    if (!modal || !serviceInput || !packageSelect) return;

    serviceInput.value = service;
    packageSelect.innerHTML = "";

    const serviceData = SERVICE_CATALOG[service];
    const packages = serviceData ? serviceData.packages : [];

    const firstOption = document.createElement("option");

    firstOption.value = "";
    firstOption.textContent = packages.length
        ? "Selecione o pacote pretendido"
        : "Pacotes e preços a definir";

    packageSelect.appendChild(firstOption);

    packages.forEach((item, index) => {

        const option = document.createElement("option");

        option.value = index;
        option.textContent = `${item.name} — ${item.price}`;

        packageSelect.appendChild(option);

    });

    priceDisplay.textContent = "Selecione um pacote";

    if (packageDescription) {
        packageDescription.textContent =
            "Selecione um pacote para conhecer os detalhes.";
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

// ============================================
// ATUALIZAR PREÇO E DESCRIÇÃO
// ============================================

function updateServicePrice() {

    const service = serviceInput.value;
    const serviceData = SERVICE_CATALOG[service];

    const packages = serviceData ? serviceData.packages : [];

    const selected = packages[packageSelect.value];

    if (selected) {

        priceDisplay.textContent = selected.price;

        if (packageDescription) {
            packageDescription.textContent = selected.description;
        }

    } else {

        priceDisplay.textContent = "Selecione um pacote";

        if (packageDescription) {
            packageDescription.textContent =
                "Selecione um pacote para conhecer os detalhes.";
        }
    }
}

// ============================================
// EVENTOS DOS BOTÕES SOLICITAR SERVIÇO
// ============================================

document.querySelectorAll(".open-service-modal").forEach(button => {

    button.addEventListener("click", event => {

        event.preventDefault();

        const service = button.dataset.service;

        openServiceModal(service);

    });

});

// Alterar pacote
if (packageSelect) {
    packageSelect.addEventListener("change", updateServicePrice);
}

// ============================================
// FECHAR MODAL
// ============================================

function hideServiceModal() {

    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
}

if (closeModal) {
    closeModal.addEventListener("click", hideServiceModal);
}

const modalOverlay = document.querySelector(".modal-overlay");

if (modalOverlay) {
    modalOverlay.addEventListener("click", hideServiceModal);
}

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        hideServiceModal();
    }

});

// ============================================
// ENVIAR PEDIDO PELO WHATSAPP
// ============================================

if (serviceForm) {

    serviceForm.addEventListener("submit", event => {

        event.preventDefault();

        const service = serviceInput.value;
        const serviceData = SERVICE_CATALOG[service];

        const packages = serviceData ? serviceData.packages : [];

        const selectedPackage = packages[packageSelect.value];

        if (!selectedPackage) {
            alert("Por favor, selecione um pacote.");
            return;
        }

        const name = document.getElementById("clientName").value;
        const company = document.getElementById("companyName").value;
        const phone = document.getElementById("clientPhone").value;
        const details = document.getElementById("projectDetails").value;

        const message =
`Olá, Miguel Pedro Studios!

Gostaria de solicitar um serviço.

SERVIÇO: ${service}

PACOTE: ${selectedPackage.name}
PREÇO: ${selectedPackage.price}

DESCRIÇÃO:
${selectedPackage.description}

DADOS DO CLIENTE:
Nome: ${name}
Empresa: ${company || "Não informado"}
WhatsApp: ${phone}

DETALHES DO PROJETO:
${details || "Não informado"}

Aguardo o vosso contacto. Obrigado!`;

        if (WHATSAPP_NUMBER.includes("X")) {

            alert("Adicione primeiro o número oficial de WhatsApp no script.js.");
            return;

        }

        const whatsappURL =
            "https://wa.me/" + WHATSAPP_NUMBER +
            "?text=" + encodeURIComponent(message);

        window.open(whatsappURL, "_blank");

    });

}
