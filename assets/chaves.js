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
  apiKey: "AIzaSyBeywZHYyq52WOszUsFr9LN5drHEhgMjNw",
  authDomain: "jessicaalinenails.firebaseapp.com",
  projectId: "jessicaalinenails",
  storageBucket: "jessicaalinenails.firebasestorage.app",
  messagingSenderId: "133495226637",
  appId: "1:133495226637:web:f56417e53aa318da417044"
};

/* Versão do SDK do Firebase. Se um dia precisar atualizar,
   troque só este número — ele vale para o site e para o painel. */
export const VERSAO_SDK = "12.17.1";
