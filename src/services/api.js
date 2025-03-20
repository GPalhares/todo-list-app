import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getToken = () => localStorage.getItem('demariaToken');

// Cria uma instância do Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepta todas as requisições para incluir o token
api.interceptors.request.use(
  (config) => {
    // Verifica se a rota é de autenticação (login, por exemplo)
    if (!config.url.includes('/auth')) {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepta respostas para tratar erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Verifica se a URL da requisição contém 'auth'
    if (error.config.url.includes('/auth')) {
      // Se for uma requisição de autenticação, não faz nada no interceptor
      return Promise.reject(error);
    }

    // Para outras rotas, trata o erro normalmente
    if (error.response?.status === 401) {
      // Checando a mensagem de erro para saber se é uma falha de autenticação
      if (error.response?.data?.message?.includes('senha incorreta')) {
        toast.error('Senha incorreta. Tente novamente!');
      } else {
        console.error(
          'Token inválido ou expirado. Redirecionando para login...'
        );
        localStorage.removeItem('demariaToken');
        // window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);
export default api;
