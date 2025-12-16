import React from 'react';

export type Role = 'ADMIN' | 'LIBRARIAN';

export interface User {
  id: string;
  username: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  email?: string;
  bio?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
  available: number;
  coverUrl?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  status: 'ACTIVE' | 'SUSPENDED';
}

export interface Loan {
  id: string;
  bookId: string;
  memberId: string;
  loanDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE';
  fine: number;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color: 'blue' | 'green' | 'red' | 'amber';
}