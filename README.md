<img width="1401" height="924" alt="image" src="https://github.com/user-attachments/assets/d5ad1a33-4e05-4691-9275-74333ca11b36" />


# 💰 Finance App - Controle Financeiro Pessoal

> 🤖 **Projeto desenvolvido 100% com Claude AI (Anthropic)** - Este projeto foi criado inteiramente através de conversas com a inteligência artificial Claude, demonstrando as capacidades de desenvolvimento assistido por IA.

## 📋 Sobre o Projeto

Uma aplicação web moderna e minimalista para controle de finanças pessoais, permitindo que múltiplos usuários gerenciem suas receitas e despesas de forma independente. O projeto foi desenvolvido como um teste das capacidades da IA Claude em criar aplicações completas e funcionais.

### 🎯 Objetivo do Teste com IA

Este projeto serve como demonstração prática de como a IA Claude pode:
- Criar interfaces complexas e responsivas
- Implementar lógica de negócio robusta
- Desenvolver sistemas de autenticação
- Gerar visualizações de dados (gráficos)
- Manter consistência de design minimalista
- Solucionar bugs e otimizar código
- Iterar sobre feedback em tempo real

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação
- Login e cadastro de usuários
- Dados isolados por usuário
- Sessão persistente com LocalStorage
- Logout seguro

### 💸 Gestão Financeira
- ✅ Adicionar receitas e despesas
- ✅ Editar transações existentes
- ✅ Excluir com confirmação
- ✅ Categorização automática (8 categorias)
- ✅ Filtros por período (7 dias, 30 dias, todo período)

### 📊 Visualização de Dados
- Gráfico de pizza para gastos por categoria
- Gráfico de barras com histórico mensal
- Cards com resumo financeiro (receitas, despesas, saldo)
- Contador de transações por tipo

### 🎨 Design
- Interface minimalista e dark mode
- Animações suaves e transições
- Totalmente responsivo (mobile/desktop)
- Efeitos de hover e interatividade
- Background animado com gradientes

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilização
- **Lucide React** - Biblioteca de ícones
- **LocalStorage** - Persistência de dados no navegador

## 📦 Instalação e Uso

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/finance-app.git
cd finance-app
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o Tailwind CSS**

O projeto já vem com `tailwind.config.js` configurado. Certifique-se de que está assim:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: { 950: '#020617' }
      },
    },
  },
  plugins: [],
}
```

4. **Rode o projeto**
```bash
npm run dev
```

5. **Acesse no navegador**
```
http://localhost:5173
```

## 📱 Como Usar

1. **Primeiro Acesso**
   - Clique em "Não tem conta? Cadastre-se"
   - Crie um usuário e senha
   - Faça login automaticamente

2. **Adicionar Transação**
   - Clique em "Nova Transação"
   - Escolha tipo (Receita/Despesa)
   - Preencha descrição, valor, categoria e data
   - Clique em "Adicionar"

3. **Filtrar por Período**
   - Use os botões: "Últimos 7 dias", "Últimos 30 dias", "Todo Período"
   - Todos os gráficos e cards atualizam automaticamente

4. **Editar/Excluir**
   - Passe o mouse sobre uma transação
   - Clique no ícone de lápis (editar) ou lixeira (excluir)
   - Confirme a exclusão no modal

5. **Trocar de Usuário**
   - Clique em "Sair" no topo
   - Faça login com outro usuário ou crie um novo

## 🤖 Processo de Desenvolvimento com Claude AI

### Metodologia
O projeto foi desenvolvido através de iterações conversacionais com Claude, onde:

1. **Concepção Inicial** - Definição dos requisitos e funcionalidades
2. **Design System** - Escolha de paleta de cores minimalista
3. **Desenvolvimento Incremental** - Adição de features uma a uma
4. **Debugging Colaborativo** - Identificação e correção de bugs em tempo real
5. **Refinamento** - Ajustes de UX e performance baseados em feedback

### Desafios Superados com IA
- ✅ Implementação de gráficos SVG personalizados (sem bibliotecas externas)
- ✅ Sistema de autenticação com múltiplos usuários
- ✅ Gestão de estado complexo com React Hooks
- ✅ Design responsivo e acessível
- ✅ Animações CSS avançadas
- ✅ Debugging de eventos de clique problemáticos

### Lições Aprendidas
- A IA consegue criar projetos completos e funcionais
- Iteração rápida permite testar múltiplas abordagens
- Comunicação clara é essencial para bons resultados
- A IA pode sugerir soluções criativas para problemas técnicos

## 📂 Estrutura do Projeto

```
finance-app/
├── public/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Ponto de entrada
│   └── index.css        # Estilos globais + Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Categorias Disponíveis

- 🍔 Alimentação
- 🚗 Transporte
- 🏠 Moradia
- 💊 Saúde
- 📚 Educação
- 🎮 Lazer
- 🛍️ Compras
- 📦 Outros

## 🔒 Segurança e Privacidade

⚠️ **Importante**: Este é um projeto de demonstração educacional.

- As senhas são armazenadas em **texto plano** no LocalStorage
- **NÃO use este código em produção** sem implementar criptografia adequada
- Para produção, considere usar:
  - Backend com autenticação JWT
  - Hash de senhas (bcrypt)
  - HTTPS obrigatório
  - Banco de dados seguro

## 🤝 Contribuindo

Como este é um projeto de demonstração de IA, contribuições são bem-vindas para:
- Melhorar segurança
- Adicionar novas funcionalidades
- Otimizar performance
- Corrigir bugs
- Melhorar acessibilidade

## 📄 Licença

MIT License - Sinta-se livre para usar este projeto para aprendizado e experimentação.

## 🙏 Agradecimentos

- **Claude AI (Anthropic)** - Por todo o desenvolvimento e suporte
- **Comunidade Open Source** - Pelas ferramentas incríveis (React, Tailwind, Vite)

## 📞 Contato

**Desenvolvido com assistência de Claude AI**

- Teste você mesmo: [claude.ai](https://claude.ai)
- Documentação Claude: [docs.anthropic.com](https://docs.anthropic.com)

---

⭐ **Se este projeto foi útil, deixe uma estrela!**

💬 **Quer criar algo similar?** Experimente conversar com Claude AI e veja o que consegue construir!

## 🔮 Futuras Melhorias (Sugestões)

- [ ] Adicionar backend real (Node.js + MongoDB/PostgreSQL)
- [ ] Implementar exportação para Excel/PDF
- [ ] Adicionar metas financeiras
- [ ] Notificações de gastos excessivos
- [ ] Modo claro/escuro toggle
- [ ] PWA (Progressive Web App)
- [ ] Integração com bancos via API
- [ ] Relatórios avançados e insights

---

**🤖 100% Desenvolvido com Claude AI - Demonstrando o futuro do desenvolvimento assistido por IA**
