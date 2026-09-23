# Jessica Aline Nails

Site institucional com painel de administração. Sem build, sem npm — HTML, CSS e JavaScript puros usando Firebase.

```
index.html            página do site
admin.html            painel do administrador
assets/
  chaves.js           ← as chaves do Firebase vão AQUI
  firebase.js         tudo que fala com o banco
  padrao.js           conteúdo padrão + fontes disponíveis
  site.js             motor da página
  estilo.css          visual do site
firestore.rules       regras de segurança do banco
```

---

## Passo 1 — Criar o projeto no Firebase

1. Acesse <https://console.firebase.google.com> → **Adicionar projeto** → nome `jessica-aline-nails`.
2. Pode desligar o Google Analytics (não é usado aqui).
3. Dentro do projeto: **Criar** → ícone `</>` (Web) → apelido `site` → **Registrar app**.
4. O Firebase mostra um objeto `firebaseConfig`. Copie os valores.

## Passo 2 — Colar as chaves

Abra `assets/chaves.js` e substitua os `COLE_AQUI` pelos valores que apareceram:

```js
export const CHAVES_FIREBASE = {
  apiKey:            "AIza...",
  authDomain:        "jessica-aline-nails.firebaseapp.com",
  projectId:         "jessica-aline-nails",
  storageBucket:     "jessica-aline-nails.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId:             "1:1234567890:web:abc123"
};
```

Essas chaves são públicas por natureza — elas apenas identificam o projeto. Quem protege os dados são as regras do Passo 4.

## Passo 3 — Ligar Autenticação e Firestore

**Authentication** → *Vamos começar* → aba **Sign-in method** → ative **E-mail/senha** → Salvar.

**Firestore Database** → *Criar banco de dados* → região **southamerica-east1 (São Paulo)** → comece em **modo de produção** (as regras certas vêm no próximo passo).

## Passo 4 — Publicar as regras de segurança

Firestore Database → aba **Regras** → apague o que estiver lá → cole o conteúdo de `firestore.rules` → **Publicar**.

Sem esse passo o painel não consegue salvar nada, e sem ele o banco fica aberto. Não pule.

## Passo 5 — Publicar o site

**GitHub Pages:** envie os arquivos para o repositório `jessica-aline-nails` → Settings → Pages → Source: `Deploy from a branch` → branch `main`, pasta `/ (root)` → Save. O endereço sai em `https://SEU-USUARIO.github.io/jessica-aline-nails/`.

**Vercel:** New Project → importe o repositório → Framework: `Other` → Deploy.

Depois de publicar, volte no Firebase em **Authentication → Settings → Domínios autorizados** e adicione o domínio do site (o `github.io` ou o `vercel.app`). Sem isso o login não funciona.

> Para testar na sua máquina, não abra o `index.html` com dois cliques — os módulos JavaScript não funcionam em `file://`. Rode `npx serve` na pasta do projeto e acesse o endereço que ele mostrar.

## Passo 6 — Criar sua conta e fechar a porta ⚠️

1. Acesse `SEU-SITE/admin.html`.
2. Como ainda não existe nenhum administrador, a tela oferece **criar a conta**. Use um e-mail que você controla e uma senha forte.
3. Assim que a conta é criada, o sistema grava uma trava (`meta/bootstrap`) e **nunca mais** aceita um segundo cadastro pelo site.
4. Logo em seguida, vá em **Authentication → Settings → User actions** e desmarque **Enable create (sign-up)**.

**Por que a pressa:** entre publicar o site e criar sua conta, existe uma janela em que qualquer pessoa que descubra o endereço `/admin.html` pode se cadastrar e virar dona do painel. Faça o passo 5 e o 6 na mesma sessão.

Para adicionar outra administradora depois:

1. Authentication → **Add user** → crie o e-mail e a senha dela.
2. Copie o **UID** que aparece na lista.
3. Firestore → coleção `admins` → **Adicionar documento** → ID do documento = o UID → campo `email` (string) com o e-mail dela.

---

## O que preencher no painel antes de divulgar

O conteúdo veio com os campos de contato **em branco de propósito** — eles eram do estúdio anterior. Entre no painel e preencha:

- **Contato:** WhatsApp (só números, com 55 na frente), Instagram, endereço, link do Google Maps.
- **Equipe:** nome, foto, WhatsApp e Instagram de cada profissional.
- **Serviços:** nome, descrição, duração e preço.
- **Fotos:** abertura, sobre e galeria.

Enquanto o WhatsApp estiver vazio, os botões de agendar avisam que falta configurar — nada quebra, mas a cliente não consegue enviar a mensagem.

## Como o conteúdo funciona

Enquanto nada foi salvo no painel, o site usa o conteúdo de `assets/padrao.js`. Assim que você salva pela primeira vez, tudo passa a vir do documento `config/site` no Firestore — e o padrão vira apenas a rede de segurança e o que o botão **Restaurar padrão** devolve.

**Fotos.** O painel comprime cada imagem no navegador e guarda dentro do próprio Firestore, sem precisar do Cloud Storage (que hoje exige plano pago). Funciona bem para as ~15 fotos do site. Se um dia a galeria crescer muito, coloque as imagens numa pasta `assets/fotos/` do repositório e, no painel, informe o caminho (`./assets/fotos/unha-01.jpg`) em vez de enviar o arquivo — os campos aceitam tanto foto enviada quanto endereço.

**Avaliações.** A cliente envia pelo site e o comentário entra como *pendente*. Nada aparece na página antes de você aprovar na aba **Avaliações**. A média com estrelas no topo da seção é calculada só com as aprovadas.

---

## Agenda: um índice a criar no Firestore

A agenda do painel consulta os agendamentos de uma profissional dentro de um período. O Firestore exige um índice combinado para esse tipo de consulta, e ele não é criado sozinho.

Na primeira vez que você abrir a aba **Agenda**, aparece um recado dizendo que falta o índice. Para criar:

1. Abra o console do navegador com **F12** → aba **Console**.
2. O erro do Firestore traz um link começando com `https://console.firebase.google.com/...indexes?create_composite=...` — clique nele.
3. A tela do Firebase abre já preenchida. Clique em **Criar índice**.
4. Espere de um a dois minutos (fica "Compilando") e recarregue o painel.

Se preferir criar na mão: Firestore Database → **Índices** → **Criar índice** → coleção `agendamentos`, campos `profissionalId` (crescente) e `data` (crescente) → Criar.

## Como funciona o agendamento

A cliente escolhe profissional, serviço, dia e hora no site. A grade de horários é montada a partir dos **horários de atendimento** de cada profissional (aba Agenda do painel) e da **duração do serviço** (aba Serviços): um serviço de 4 horas só aparece em horários onde caibam 4 horas seguidas antes do fechamento.

O pedido entra como **aguardando validação** e a cliente é levada ao WhatsApp da profissional com a mensagem pronta. Enquanto não for validado, o horário **continua disponível** para outras clientes — é a profissional que tranca a agenda ao clicar em **Validar**.

Situações possíveis: aguardando validação → agendado → concluído, ou cancelado a qualquer momento. Ao marcar **Concluir**, o painel pergunta o que foi feito e quanto entrou, e lança direto no faturamento daquela profissional.

## Clientes que pagam depois (a receber)

Ao registrar um atendimento — em **Financeiro → Lançamentos** ou ao **Concluir** um horário na agenda — escolha **Vai pagar depois** e informe a cliente, o valor e a **previsão de pagamento** (o WhatsApp é opcional).

Esse valor **não entra no faturamento** enquanto não for pago; ele fica na sub-aba **A receber**, ordenado pela previsão, com os atrasados em vermelho. O dashboard avisa quando há pagamento atrasado ou previsto para hoje.

Em cada cliente:
- **Recebi** — informe a data e o valor. Pagou tudo: entra no faturamento na data do pagamento. Pagou uma parte: a parte entra no faturamento e o restante continua pendente, com nova previsão se quiser.
- **Cobrar** — abre o WhatsApp dela com um lembrete educado já escrito (aparece só se o número foi preenchido).
- **Editar** — muda previsão, valor, nome etc.

Também não precisa de índice novo nem mudança nas regras.

## Compras parceladas

Em **Financeiro → Lançamentos → Registrar custo**, escolha **Parcelado**, informe o valor total, o número de parcelas e se a 1ª cai no mês da compra ou no seguinte. O painel mostra a prévia mês a mês antes de lançar.

Cada parcela vira um custo separado no mês dela, então o dashboard de cada mês mostra só o que cai naquele mês. Os centavos que sobram da divisão ficam na 1ª parcela (R$ 100 em 3x = 33,34 + 33,33 + 33,33).

O bloco **Compras parceladas** mostra quanto já foi pago, quanto falta e quanto vence no mês que vem. Ali dá para **Quitar restante** (traz as parcelas futuras para hoje) ou **Excluir compra** (apaga todas as parcelas). Editar uma parcela muda o valor e a data só dela; categoria e observação podem ser aplicadas à compra inteira.

Não precisa de índice novo nem mudança nas regras do Firestore.

## Divisão de faturamento com as profissionais ⚠️ republique as regras

> Esta versão mudou o `firestore.rules`. Depois de subir os arquivos, cole o conteúdo novo em **Firestore Database → Regras → Publicar**. Sem isso a dona não consegue ler o caixa das profissionais.

**Quem é quem.** A primeira conta criada é a **dona do studio**. As outras são **profissionais parceiras**, criadas pela dona em **Profissionais → Criar acesso para ela**. No cadastro a dona informa o **percentual do studio** (ex.: 40 → de cada R$ 100 que a profissional fatura, R$ 40 vão para a dona).

**O que cada uma vê.**
- **Dona:** o painel inteiro. No Financeiro, o dashboard soma os atendimentos dela + a **cota da equipe**, e a sub-aba **Studio e equipe** mostra cada profissional: atendimentos, faturamento bruto, cota do studio, parte dela e o **saldo a acertar**.
- **Profissional:** só Agenda, Serviços, Financeiro e Minha conta. O caixa dela já mostra bruto, cota do studio, a parte dela, custos, lucro e o saldo com o studio.

**Lançamentos.** Cada profissional lança os próprios atendimentos (ou pelo botão Concluir da agenda) e informa a forma de pagamento e **quem recebeu o dinheiro**:
- *Eu* (Pix/dinheiro na mão dela) → ela fica devendo a cota ao studio.
- *O studio* (maquininha/Pix do studio) → o studio fica devendo a parte dela.

O percentual fica **gravado em cada lançamento**. Se a dona mudar o percentual, vale só dali para frente — o passado não muda.

**Acertos.** Quando o dinheiro passa de uma para a outra, a dona registra em **Studio e equipe → Registrar acerto** (o valor já vem preenchido com o saldo). Saldo zerado = tudo acertado. Acertos só a dona grava; a profissional vê o histórico no dashboard dela.

**Fechamento do mês.** *Imprimir fechamento* gera uma folha com todos os atendimentos, a divisão, os acertos e espaço para as duas assinarem (dá para salvar em PDF pela janela de impressão). *Baixar planilha* exporta o mês em CSV, que abre no Excel ou Google Planilhas.

**Proteções no servidor (não só na tela):** a profissional não consegue lançar entrada com percentual diferente do que a dona definiu, não altera o percentual de um lançamento já feito, não mexe no percentual do próprio cadastro e não registra acertos.

Contas de profissional criadas antes desta versão ficam com percentual **0%** até a dona definir — o painel avisa em Studio e equipe. Lançamentos antigos sem percentual gravado usam o percentual atual da profissional.

Não precisa de índice novo.

---

## O visual

A identidade é montada em cima de cinco cores e duas fontes, todas trocáveis na aba **Aparência** do painel:

| Papel | Valor de fábrica |
|---|---|
| Fundo | `#EDEBF0` — pérola fria |
| Texto | `#191520` |
| Cor principal | `#8E2F4A` — cereja |
| Detalhes | `#9A90AE` — pérola lilás |
| Blocos escuros | `#201A2B` — tinta violeta |
| Títulos | Prata |
| Texto | Work Sans |

O restante da paleta (tons intermediários, fios, fundos de apoio) é calculado a partir dessas cinco pelo `site.js`, então mudar uma cor no painel reorganiza o site inteiro sem quebrar contraste.

O ícone da aba do navegador é um monograma **JA** desenhado em SVG dentro do próprio `index.html` e do `admin.html` — não existe arquivo `.ico` para trocar. Se quiser mudar a cor, procure por `rel="icon"` e altere os códigos `%23201A2B` (fundo) e `%23F9F8FB` (letras).

---

## Custos

Tudo cabe no plano gratuito (Spark) do Firebase: 50 mil leituras e 20 mil gravações por dia, 1 GB de banco e 10 GB de tráfego por mês. Um site desse porte usa uma fração disso. Não é preciso cadastrar cartão.
