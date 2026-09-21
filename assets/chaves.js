/* ============================================================
   CHAVES DO FIREBASE
   Cole aqui o objeto que o Firebase mostra em:
   Console → ⚙️ Configurações do projeto → Seus apps → Web → Configuração do SDK

   ⚠️ Crie um projeto NOVO no Firebase para este site.
   Reaproveitar o projeto de outro estúdio faz o painel do outro
   site sobrescrever o conteúdo daqui — nome, cores, fotos e agenda.

   Estas chaves são públicas por natureza — quem protege os dados
   são as regras do Firestore (arquivo firestore.rules).

   Enquanto estiverem em branco o site abre normalmente com o
   conteúdo de padrao.js, mas o painel não salva e as avaliações
   e a agenda ficam indisponíveis.
   ============================================================ */
export const CHAVES_FIREBASE = {
  apiKey:            "COLE_AQUI",
  authDomain:        "COLE_AQUI",
  projectId:         "COLE_AQUI",
  storageBucket:     "COLE_AQUI",
  messagingSenderId: "COLE_AQUI",
  appId:             "COLE_AQUI"
};

/* Versão do SDK do Firebase. Se um dia precisar atualizar,
   troque só este número — ele vale para o site e para o painel. */
export const VERSAO_SDK = "12.17.1";
