import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Filter } from 'lucide-react';
import { Book, Role } from '../types';
import { Button, Input, Modal, Badge } from '../components/UI';
import { BookService } from '../services/store';

interface BooksViewProps {
  books: Book[];
  onUpdate: () => void;
  userRole: Role;
}

export const BooksView: React.FC<BooksViewProps> = ({ books, onUpdate, userRole }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<Book>>({});

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.isbn.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && currentBook.id) {
      BookService.update(currentBook.id, currentBook);
    } else {
      BookService.add(currentBook as Omit<Book, 'id' | 'available'>);
    }
    onUpdate();
    setIsModalOpen(false);
    setCurrentBook({});
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentBook({ title: '', author: '', isbn: '', category: '', quantity: 1, coverUrl: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (book: Book) => {
    setIsEditMode(true);
    setCurrentBook({ ...book });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      BookService.delete(id);
      onUpdate();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Books Inventory</h1>
          <p className="text-slate-500">Manage your library catalog.</p>
        </div>
        {userRole === 'ADMIN' && (
          <Button onClick={openAddModal}>
            <Plus size={18} /> Add Book
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4 items-center bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by title, author, or ISBN..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
            />
          </div>
          <Button variant="secondary" className="hidden sm:flex">
            <Filter size={18} /> Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Book Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">ISBN</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.map(book => (
                <tr key={book.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={book.coverUrl || 'https://via.placeholder.com/150'} alt="" className="w-10 h-14 object-cover rounded shadow-sm bg-slate-200" />
                      <div>
                        <p className="font-semibold text-slate-900">{book.title}</p>
                        <p className="text-xs text-slate-500">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{book.category}</td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{book.isbn}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Badge color={book.available > 0 ? 'green' : 'red'}>
                        {book.available > 0 ? 'Available' : 'Out of Stock'}
                      </Badge>
                      <span className="text-xs text-slate-400">{book.available} / {book.quantity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(book)} className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      {userRole === 'ADMIN' && (
                        <button onClick={() => handleDelete(book.id)} className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBooks.length === 0 && (
          <div className="p-12 text-center text-slate-400">
            No books found matching your search.
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isEditMode ? 'Edit Book' : 'Add New Book'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" value={currentBook.title || ''} onChange={e => setCurrentBook({...currentBook, title: e.target.value})} required />
          <Input label="Author" value={currentBook.author || ''} onChange={e => setCurrentBook({...currentBook, author: e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="ISBN" value={currentBook.isbn || ''} onChange={e => setCurrentBook({...currentBook, isbn: e.target.value})} required />
            <Input label="Category" value={currentBook.category || ''} onChange={e => setCurrentBook({...currentBook, category: e.target.value})} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Total Quantity" type="number" min="1" value={currentBook.quantity || ''} onChange={e => setCurrentBook({...currentBook, quantity: parseInt(e.target.value)})} required />
            <Input label="Cover URL" value={currentBook.coverUrl || ''} onChange={e => setCurrentBook({...currentBook, coverUrl: e.target.value})} />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">{isEditMode ? 'Save Changes' : 'Add Book'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
