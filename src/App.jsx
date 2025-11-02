import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingDown, TrendingUp, Wallet, X, Edit2, Trash2, PieChart, BarChart3, Calendar, Filter, LogOut, User, Lock } from 'lucide-react';

const CATEGORIES = [
  { name: 'Alimentação', color: '#64748b', icon: '🍔' },
  { name: 'Transporte', color: '#475569', icon: '🚗' },
  { name: 'Moradia', color: '#334155', icon: '🏠' },
  { name: 'Saúde', color: '#1e293b', icon: '💊' },
  { name: 'Educação', color: '#0f172a', icon: '📚' },
  { name: 'Lazer', color: '#94a3b8', icon: '🎮' },
  { name: 'Compras', color: '#cbd5e1', icon: '🛍️' },
  { name: 'Outros', color: '#e2e8f0', icon: '📦' }
];

const FILTER_OPTIONS = [
  { id: 'all', label: 'Todo Período', days: null },
  { id: '7days', label: 'Últimos 7 dias', days: 7 },
  { id: '30days', label: 'Últimos 30 dias', days: 30 }
];

const PieChartComponent = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 200 200" className="transform -rotate-90">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const angle = (percentage / 100) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + angle;
          
          const startX = 100 + 90 * Math.cos((startAngle * Math.PI) / 180);
          const startY = 100 + 90 * Math.sin((startAngle * Math.PI) / 180);
          const endX = 100 + 90 * Math.cos((endAngle * Math.PI) / 180);
          const endY = 100 + 90 * Math.sin((endAngle * Math.PI) / 180);
          
          const largeArc = angle > 180 ? 1 : 0;
          const path = `M 100 100 L ${startX} ${startY} A 90 90 0 ${largeArc} 1 ${endX} ${endY} Z`;
          
          currentAngle += angle;
          
          return (
            <path
              key={index}
              d={path}
              fill={item.color}
              stroke="#0f172a"
              strokeWidth="2"
              className="hover:opacity-70 transition-opacity duration-300"
            />
          );
        })}
      </svg>
    </div>
  );
};

const BarChartComponent = ({ data }) => {
  const maxValue = Math.max(...data.flatMap(d => [d.income, d.expense]));
  const chartHeight = 200;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[500px] p-4">
        <div className="flex items-end justify-around h-64 border-b border-slate-700">
          {data.map((item, index) => {
            const incomeHeight = (item.income / maxValue) * chartHeight;
            const expenseHeight = (item.expense / maxValue) * chartHeight;
            
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="flex gap-2 items-end h-56">
                  <div className="relative group">
                    <div 
                      className="w-10 bg-slate-600 rounded-t transition-all duration-500 hover:bg-slate-500"
                      style={{ height: `${incomeHeight}px` }}
                    ></div>
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap border border-slate-700">
                      R$ {item.income.toFixed(2)}
                    </div>
                  </div>
                  <div className="relative group">
                    <div 
                      className="w-10 bg-slate-400 rounded-t transition-all duration-500 hover:bg-slate-300"
                      style={{ height: `${expenseHeight}px` }}
                    ></div>
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap border border-slate-700">
                      R$ {item.expense.toFixed(2)}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-slate-400">{item.label}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 justify-center mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-600 rounded-sm"></div>
            <span className="text-xs text-slate-400">Receitas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-slate-400 rounded-sm"></div>
            <span className="text-xs text-slate-400">Despesas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    
    if (!formData.username || !formData.password) {
      setError('Preencha todos os campos');
      return;
    }

    const users = JSON.parse(localStorage.getItem('finance_users') || '{}');

    if (isLogin) {
      if (!users[formData.username]) {
        setError('Usuário não encontrado');
        return;
      }
      if (users[formData.username].password !== formData.password) {
        setError('Senha incorreta');
        return;
      }
      onLogin(formData.username);
    } else {
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }
      if (users[formData.username]) {
        setError('Usuário já existe');
        return;
      }
      users[formData.username] = { password: formData.password };
      localStorage.setItem('finance_users', JSON.stringify(users));
      onLogin(formData.username);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8 w-full max-w-md shadow-2xl relative z-10">
        <div className="flex items-center justify-center mb-8">
          <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
            <Wallet className="w-10 h-10 text-slate-400" />
          </div>
        </div>

        <h1 className="text-3xl font-light text-center mb-2 text-slate-100">Finanças</h1>
        <p className="text-center text-slate-500 mb-8 text-sm">
          {isLogin ? 'Entre com sua conta' : 'Crie sua conta'}
        </p>

        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-sm font-light">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-light mb-2 text-slate-400">Usuário</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-slate-600 transition-all duration-300 text-slate-200 font-light"
                placeholder="Digite seu usuário"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-light mb-2 text-slate-400">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-slate-600 transition-all duration-300 text-slate-200 font-light"
                placeholder="Digite sua senha"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-light mb-2 text-slate-400">Confirmar Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-slate-600 transition-all duration-300 text-slate-200 font-light"
                  placeholder="Confirme sua senha"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 py-3 rounded-lg font-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-900/50"
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>

          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ username: '', password: '', confirmPassword: '' });
            }}
            className="w-full text-slate-400 hover:text-slate-300 text-sm font-light transition-colors duration-300"
          >
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function FinanceApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Alimentação',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('finance_current_user');
    if (savedUser) {
      setCurrentUser(savedUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const stored = localStorage.getItem(`finance_transactions_${currentUser}`);
      if (stored) {
        setTransactions(JSON.parse(stored));
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`finance_transactions_${currentUser}`, JSON.stringify(transactions));
    }
  }, [transactions, currentUser]);

  const handleLogin = (username) => {
    setCurrentUser(username);
    localStorage.setItem('finance_current_user', username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('finance_current_user');
    setTransactions([]);
  };

  const filterTransactions = (trans) => {
    if (activeFilter === 'all') return trans;
    
    const filter = FILTER_OPTIONS.find(f => f.id === activeFilter);
    if (!filter || !filter.days) return trans;
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - filter.days);
    
    return trans.filter(t => {
      const transDate = new Date(t.date + 'T00:00:00');
      return transDate >= cutoffDate;
    });
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.amount) return;
    
    const transaction = {
      id: editingId || Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
      category: formData.type === 'income' ? 'Receita' : formData.category
    };

    if (editingId) {
      setTransactions(transactions.map(t => t.id === editingId ? transaction : t));
    } else {
      setTransactions([transaction, ...transactions]);
    }

    setFormData({
      description: '',
      amount: '',
      category: 'Alimentação',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
    setShowModal(false);
    setEditingId(null);
  };

  const handleEdit = (transaction) => {
    setFormData({
      description: transaction.description,
      amount: transaction.amount.toString(),
      category: transaction.category,
      type: transaction.type,
      date: transaction.date
    });
    setEditingId(transaction.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const filteredTransactions = filterTransactions(transactions);
  const expenses = filteredTransactions.filter(t => t.type === 'expense');
  const income = filteredTransactions.filter(t => t.type === 'income');
  
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const categoryData = CATEGORIES.map(cat => ({
    name: cat.name,
    color: cat.color,
    icon: cat.icon,
    value: expenses.filter(t => t.category === cat.name).reduce((sum, t) => sum + t.amount, 0)
  })).filter(cat => cat.value > 0);

  const monthlyData = filteredTransactions.reduce((acc, t) => {
    const month = t.date.substring(0, 7);
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    acc[month][t.type] += t.amount;
    return acc;
  }, {});

  const chartData = Object.keys(monthlyData).sort().slice(-6).map(m => {
    const [year, month] = m.split('-');
    return {
      label: `${month}/${year}`,
      income: monthlyData[m].income,
      expense: monthlyData[m].expense
    };
  });

  const getFilterLabel = () => {
    const filter = FILTER_OPTIONS.find(f => f.id === activeFilter);
    return filter ? filter.label : 'Todo Período';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-slate-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                <Wallet className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h1 className="text-2xl font-light tracking-wide text-slate-100">Finanças</h1>
                <p className="text-xs text-slate-500">Olá, {currentUser}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-lg font-light text-sm border border-slate-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-900/50"
              >
                <PlusCircle className="w-4 h-4" />
                Nova Transação
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-slate-800 hover:bg-red-900/50 px-5 py-3 rounded-lg font-light text-sm border border-slate-700 hover:border-red-800 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </header>

        <div className="mb-6 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-light text-slate-400">Filtrar por período</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-light transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-slate-700 border-slate-600 text-slate-200'
                    : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800'
                } border`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {filter.label}
                </div>
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-3">
            Exibindo: {getFilterLabel()} • {filteredTransactions.length} transação(ões)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400 font-light">Receitas</span>
              <TrendingUp className="w-5 h-5 text-slate-600" />
            </div>
            <p className="text-2xl font-light text-slate-200">R$ {totalIncome.toFixed(2)}</p>
            <p className="text-xs text-slate-600 mt-1">{income.length} transação(ões)</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400 font-light">Despesas</span>
              <TrendingDown className="w-5 h-5 text-slate-600" />
            </div>
            <p className="text-2xl font-light text-slate-200">R$ {totalExpenses.toFixed(2)}</p>
            <p className="text-xs text-slate-600 mt-1">{expenses.length} transação(ões)</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400 font-light">Saldo</span>
              <Wallet className="w-5 h-5 text-slate-600" />
            </div>
            <p className={`text-2xl font-light ${balance >= 0 ? 'text-slate-200' : 'text-slate-400'}`}>
              R$ {balance.toFixed(2)}
            </p>
            <p className="text-xs text-slate-600 mt-1">
              {balance >= 0 ? 'Positivo' : 'Negativo'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {categoryData.length > 0 ? (
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 transition-all duration-300 hover:border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <PieChart className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-light text-slate-300">Gastos por Categoria</h2>
              </div>
              <PieChartComponent data={categoryData} />
              <div className="mt-6 space-y-2">
                {categoryData.map(cat => (
                  <div key={cat.name} className="flex items-center justify-between bg-slate-800/30 rounded-lg p-3 border border-slate-800/50 transition-all duration-300 hover:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                      <span className="text-sm text-slate-400">{cat.icon}</span>
                      <span className="text-sm font-light text-slate-300">{cat.name}</span>
                    </div>
                    <span className="font-light text-slate-400">R$ {cat.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-600 font-light">Nenhuma despesa no período</p>
              </div>
            </div>
          )}

          {chartData.length > 0 ? (
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 transition-all duration-300 hover:border-slate-700">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-light text-slate-300">Histórico Mensal</h2>
              </div>
              <BarChartComponent data={chartData} />
            </div>
          ) : (
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-600 font-light">Nenhum dado no período</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 transition-all duration-300 hover:border-slate-700">
          <h2 className="text-lg font-light mb-4 text-slate-300">Transações Recentes</h2>
          <div className="space-y-2">
            {filteredTransactions.slice(0, 10).map(t => {
              const cat = CATEGORIES.find(c => c.name === t.category);
              const displayIcon = t.type === 'income' ? '➕' : (cat?.icon || '📦');
              const displayCategory = t.type === 'income' ? 'Receita' : t.category;
              
              return (
                <div key={t.id} className="flex items-center justify-between bg-slate-800/30 rounded-lg p-4 border border-slate-800/50 transition-all duration-300 hover:bg-slate-800/50 group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl opacity-70">{displayIcon}</span>
                    <div>
                      <p className="font-light text-slate-200">{t.description}</p>
                      <p className="text-xs text-slate-500">{new Date(t.date + 'T00:00:00').toLocaleDateString('pt-BR')} • {displayCategory}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-light ${t.type === 'income' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                    </span>
                    <button 
                      onClick={() => handleEdit(t)} 
                      className="p-2 hover:bg-slate-700 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <Edit2 className="w-4 h-4 text-slate-500" />
                    </button>
                    <button 
                      onClick={() => confirmDelete(t.id)} 
                      className="p-2 hover:bg-red-900/50 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              );
            })}
            {filteredTransactions.length === 0 && (
              <p className="text-center text-slate-600 py-12 font-light">Nenhuma transação no período selecionado</p>
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-light text-slate-200">{editingId ? 'Editar' : 'Nova'} Transação</h2>
                <button onClick={() => { setShowModal(false); setEditingId(null); }} className="p-2 hover:bg-slate-800 rounded-lg transition-all duration-300">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-light mb-2 text-slate-400">Descrição</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-600 transition-all duration-300 text-slate-200 font-light"
                    placeholder="Ex: Supermercado"
                  />
                </div>

                <div>
                  <label className="block text-xs font-light mb-2 text-slate-400">Valor</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-600 transition-all duration-300 text-slate-200 font-light"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-xs font-light mb-2 text-slate-400">Tipo</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFormData({...formData, type: 'expense'})}
                      className={`py-3 rounded-lg font-light text-sm transition-all duration-300 ${formData.type === 'expense' ? 'bg-slate-700 border-slate-600' : 'bg-slate-800 border-slate-700 hover:bg-slate-750'} border`}
                    >
                      Despesa
                    </button>
                    <button
                      onClick={() => setFormData({...formData, type: 'income'})}
                      className={`py-3 rounded-lg font-light text-sm transition-all duration-300 ${formData.type === 'income' ? 'bg-slate-700 border-slate-600' : 'bg-slate-800 border-slate-700 hover:bg-slate-750'} border`}
                    >
                      Receita
                    </button>
                  </div>
                </div>

                {formData.type === 'expense' && (
                  <div>
                    <label className="block text-xs font-light mb-2 text-slate-400">Categoria</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-600 transition-all duration-300 text-slate-200 font-light"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-light mb-2 text-slate-400">Data</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-slate-600 transition-all duration-300 text-slate-200 font-light"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 py-3 rounded-lg font-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-900/50"
                >
                  {editingId ? 'Atualizar' : 'Adicionar'}
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-sm shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-900/20 rounded-lg">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-xl font-light text-slate-200">Excluir Transação</h2>
              </div>
              
              <p className="text-slate-400 font-light mb-6">
                Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteId(null);
                  }}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 py-3 rounded-lg font-light transition-all duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 bg-red-900/50 hover:bg-red-900/70 border border-red-800 py-3 rounded-lg font-light transition-all duration-300 text-red-200"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}