import { Book, Loan, Member, User } from '../types';

// --- Mock Data ---

// Helper for LocalStorage
const loadFromStorage = <T>(key: string, defaultData: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (e) {
    return defaultData;
  }
};

const saveToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

let MOCK_USERS: User[] = loadFromStorage('ls_users', [
  { id: 'u1', username: 'admin', name: 'Alice Admin', role: 'ADMIN', avatarUrl: 'https://picsum.photos/id/64/100/100', email: 'admin@librasync.com', bio: 'Administrator of the LibraSync system.' },
  { id: 'u2', username: 'lib', name: 'Larry Librarian', role: 'LIBRARIAN', avatarUrl: 'https://picsum.photos/id/65/100/100', email: 'librarian@librasync.com', bio: 'Dedicated to organizing knowledge.' },
]);

let MOCK_BOOKS: Book[] = [
  { id: 'b1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', category: 'Fiction', quantity: 5, available: 3, coverUrl: 'https://picsum.photos/id/24/200/300' },
  { id: 'b2', title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', category: 'Technology', quantity: 3, available: 1, coverUrl: 'https://picsum.photos/id/3/200/300' },
  { id: 'b3', title: '1984', author: 'George Orwell', isbn: '9780451524935', category: 'Fiction', quantity: 10, available: 8, coverUrl: 'https://picsum.photos/id/20/200/300' },
  { id: 'b4', title: 'Introduction to Algorithms', author: 'Cormen et al.', isbn: '9780262033848', category: 'Education', quantity: 2, available: 2, coverUrl: 'https://picsum.photos/id/1/200/300' },
  { id: 'b5', title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', category: 'History', quantity: 6, available: 4, coverUrl: 'https://picsum.photos/id/40/200/300' },
];

let MOCK_MEMBERS: Member[] = [
  { id: 'm1', name: 'John Doe', email: 'john@example.com', phone: '555-0101', joinDate: '2023-01-15', status: 'ACTIVE' },
  { id: 'm2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-0102', joinDate: '2023-03-10', status: 'ACTIVE' },
  { id: 'm3', name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0103', joinDate: '2022-11-05', status: 'SUSPENDED' },
];

let MOCK_LOANS: Loan[] = [
  { id: 'l1', bookId: 'b1', memberId: 'm1', loanDate: '2023-10-01', dueDate: '2023-10-15', status: 'OVERDUE', fine: 5.00 },
  { id: 'l2', bookId: 'b2', memberId: 'm2', loanDate: '2023-10-10', dueDate: '2023-10-24', status: 'ACTIVE', fine: 0 },
  { id: 'l3', bookId: 'b5', memberId: 'm1', loanDate: '2023-10-12', dueDate: '2023-10-26', status: 'ACTIVE', fine: 0 },
];

// --- Service Functions ---

export const AuthService = {
  login: (username: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Refresh from storage to be safe
        MOCK_USERS = loadFromStorage('ls_users', MOCK_USERS);
        const user = MOCK_USERS.find(u => u.username === username);
        if (user) resolve(user);
        else reject(new Error('Invalid credentials'));
      }, 500);
    });
  }
};

export const UserService = {
  update: (user: User) => {
    MOCK_USERS = MOCK_USERS.map(u => u.id === user.id ? user : u);
    saveToStorage('ls_users', MOCK_USERS);
    return user;
  }
};

export const BookService = {
  getAll: () => [...MOCK_BOOKS],
  add: (book: Omit<Book, 'id' | 'available'>) => {
    const newBook: Book = { ...book, id: Math.random().toString(36).substr(2, 9), available: book.quantity };
    MOCK_BOOKS = [...MOCK_BOOKS, newBook];
    return newBook;
  },
  update: (id: string, updates: Partial<Book>) => {
    MOCK_BOOKS = MOCK_BOOKS.map(b => b.id === id ? { ...b, ...updates } : b);
  },
  delete: (id: string) => {
    MOCK_BOOKS = MOCK_BOOKS.filter(b => b.id !== id);
  }
};

export const MemberService = {
  getAll: () => [...MOCK_MEMBERS],
  add: (member: Omit<Member, 'id' | 'status' | 'joinDate'>) => {
    const newMember: Member = { 
      ...member, 
      id: Math.random().toString(36).substr(2, 9), 
      status: 'ACTIVE',
      joinDate: new Date().toISOString().split('T')[0]
    };
    MOCK_MEMBERS = [...MOCK_MEMBERS, newMember];
    return newMember;
  },
  updateStatus: (id: string, status: 'ACTIVE' | 'SUSPENDED') => {
    MOCK_MEMBERS = MOCK_MEMBERS.map(m => m.id === id ? { ...m, status } : m);
  },
  delete: (id: string) => {
    MOCK_MEMBERS = MOCK_MEMBERS.filter(m => m.id !== id);
  }
};

export const LoanService = {
  getAll: () => [...MOCK_LOANS],
  
  create: (bookId: string, memberId: string) => {
    // Check availability
    const book = MOCK_BOOKS.find(b => b.id === bookId);
    if (!book || book.available <= 0) throw new Error("Book not available");

    const newLoan: Loan = {
      id: Math.random().toString(36).substr(2, 9),
      bookId,
      memberId,
      loanDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days
      status: 'ACTIVE',
      fine: 0
    };
    
    MOCK_LOANS = [...MOCK_LOANS, newLoan];
    // Decrease book availability
    MOCK_BOOKS = MOCK_BOOKS.map(b => b.id === bookId ? { ...b, available: b.available - 1 } : b);
    return newLoan;
  },

  returnBook: (loanId: string) => {
    const loan = MOCK_LOANS.find(l => l.id === loanId);
    if (!loan || loan.status === 'RETURNED') return;

    // Calculate fine if overdue
    const today = new Date();
    const due = new Date(loan.dueDate);
    let fine = 0;
    if (today > due) {
      const diffTime = Math.abs(today.getTime() - due.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      fine = diffDays * 0.50; // $0.50 per day
    }

    MOCK_LOANS = MOCK_LOANS.map(l => l.id === loanId ? { ...l, status: 'RETURNED', returnDate: today.toISOString().split('T')[0], fine } : l);
    // Increase book availability
    MOCK_BOOKS = MOCK_BOOKS.map(b => b.id === loan.bookId ? { ...b, available: b.available + 1 } : b);
  }
};
