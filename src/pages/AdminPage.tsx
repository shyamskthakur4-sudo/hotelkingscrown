import React, { useState, useEffect } from 'react';
import { 
  Search, 
  RefreshCw, 
  MessageSquare, 
  Trash2, 
  Lock, 
  LogOut, 
  CheckCircle2, 
  Phone, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { 
  type BookingEnquiry, 
  type EnquiryStatus, 
  fetchBookingEnquiries, 
  updateEnquiryStatus, 
  deleteEnquiry,
  supabase 
} from '../lib/supabase';
import { getRoomCategoryLabel } from '../lib/whatsapp';

interface AdminPageProps {
  onBackToHome: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data State
  const [enquiries, setEnquiries] = useState<BookingEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Check existing session
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
      }
    };
    checkSession();
  }, []);

  // Fetch enquiries when authenticated
  const loadData = async () => {
    setIsLoading(true);
    setActionMessage(null);
    try {
      const data = await fetchBookingEnquiries();
      setEnquiries(data);
    } catch (err: any) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoggingIn(true);

    try {
      // 1. Try Supabase Auth
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (!error) {
        setIsAuthenticated(true);
        return;
      }

      // 2. Fallback PIN / Staff passcode for local testing: 'kingscrown2026' or 'admin123'
      if (loginPassword === 'kingscrown2026' || loginPassword === 'admin123') {
        setIsAuthenticated(true);
        return;
      }

      setAuthError('Invalid credentials. For staff demo access, use passcode: kingscrown2026');
    } catch (err: any) {
      if (loginPassword === 'kingscrown2026' || loginPassword === 'admin123') {
        setIsAuthenticated(true);
      } else {
        setAuthError(err.message || 'Authentication failed');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    const success = await updateEnquiryStatus(id, newStatus);
    if (success) {
      setEnquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      setActionMessage(`Status updated to "${newStatus}".`);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleDelete = async (id: string, guestName: string) => {
    if (window.confirm(`Are you sure you want to remove the enquiry from ${guestName}?`)) {
      const success = await deleteEnquiry(id);
      if (success) {
        setEnquiries((prev) => prev.filter((item) => item.id !== id));
        setActionMessage('Enquiry removed successfully.');
        setTimeout(() => setActionMessage(null), 3000);
      }
    }
  };

  const createWhatsAppReplyLink = (enquiry: BookingEnquiry) => {
    const phone = enquiry.contact_number.replace(/\D/g, '');
    const text = `Hello ${enquiry.guest_name}, thank you for enquiring with Hotel Kings Crown, Jaipur. Regarding your requested stay from ${enquiry.check_in} to ${enquiry.check_out} for ${getRoomCategoryLabel(enquiry.room_category)}, we would like to confirm that...`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  // Filtered list
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSearch =
      item.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.contact_number.includes(searchQuery) ||
      (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // If not logged in, render authentication modal
  if (!isAuthenticated) {
    return (
      <div className="admin-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '440px', width: '100%', backgroundColor: '#FFFFFF', padding: '2.5rem', borderRadius: '4px', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.8rem', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
              <Lock size={28} />
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>Staff Portal Login</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Hotel Kings Crown Management Access
            </p>
          </div>

          {authError && (
            <div className="alert alert-error" style={{ padding: '0.8rem 1rem', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <div>{authError}</div>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label htmlFor="loginEmail" className="form-label">
                Staff Email (or Username)
              </label>
              <input
                type="text"
                id="loginEmail"
                placeholder="staff@hotelkingscrown.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div style={{ marginBottom: '1.8rem' }}>
              <label htmlFor="loginPassword" className="form-label">
                Password / Staff Passcode
              </label>
              <input
                type="password"
                id="loginPassword"
                placeholder="Enter password or passcode"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="form-input"
                required
              />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                Quick staff demo passcode: <strong>kingscrown2026</strong>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '1rem' }}
            >
              {isLoggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>

            <button
              type="button"
              className="btn btn-outline"
              style={{ width: '100%' }}
              onClick={onBackToHome}
            >
              Back to Public Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      {/* Admin Navbar */}
      <header className="admin-header">
        <div className="container admin-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span className="admin-title">Hotel Kings Crown</span>
            <span className="admin-badge">Admin Dashboard</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              onClick={loadData}
              className="btn btn-outline btn-sm"
              style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
              title="Refresh database records"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="btn btn-outline btn-sm"
              style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              View Site
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}
            >
              <LogOut size={14} />
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="container" style={{ marginTop: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span className="eyebrow">RESERVATIONS MANAGEMENT</span>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>Incoming Booking Enquiries</h1>
            <p style={{ fontSize: '0.92rem' }}>
              Connected to live Supabase database (<code style={{ backgroundColor: '#E4DDD3', padding: '2px 5px', borderRadius: '3px' }}>booking_enquiries</code>).
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <div style={{ padding: '0.6rem 1.2rem', backgroundColor: '#FFFFFF', borderRadius: '4px', border: '1px solid var(--border-soft)', fontSize: '0.85rem' }}>
              Total: <strong>{enquiries.length}</strong> enquiries
            </div>
          </div>
        </div>

        {actionMessage && (
          <div className="alert alert-success" style={{ padding: '0.8rem 1.2rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            <CheckCircle2 size={18} />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Table Card */}
        <div className="admin-table-card">
          <div className="admin-toolbar">
            {/* Search Box */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search guest name, phone, message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-search-input"
                style={{ paddingLeft: '2.2rem' }}
              />
            </div>

            {/* Status Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['all', 'pending', 'contacted', 'confirmed', 'cancelled'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`btn btn-sm ${statusFilter === st ? 'btn-primary' : 'btn-outline'}`}
                  style={{ textTransform: 'capitalize' }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Data Table */}
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Contact / WhatsApp</th>
                  <th>Dates (In / Out)</th>
                  <th>Room Type</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Received</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '3rem' }}>
                      <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 0.8rem auto', display: 'block', color: 'var(--accent-gold)' }} />
                      Loading enquiries from database...
                    </td>
                  </tr>
                ) : filteredEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                      No booking enquiries found matching the selected filter.
                    </td>
                  </tr>
                ) : (
                  filteredEnquiries.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <strong>{item.guest_name}</strong>
                        {item.message && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '240px' }}>
                            "{item.message}"
                          </div>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Phone size={13} style={{ color: 'var(--accent-gold)' }} />
                          <span>{item.contact_number}</span>
                        </div>
                        <a
                          href={createWhatsAppReplyLink(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px',
                            color: 'var(--whatsapp-green)',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            marginTop: '4px'
                          }}
                        >
                          <MessageSquare size={12} />
                          Reply on WhatsApp
                        </a>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                          <Calendar size={13} style={{ color: 'var(--accent-gold)' }} />
                          <span>{item.check_in} to {item.check_out}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                          {getRoomCategoryLabel(item.room_category)}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem' }}>
                          {item.adults} Adults{item.children > 0 ? `, ${item.children} Ch.` : ''}
                        </span>
                      </td>
                      <td>
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as EnquiryStatus)}
                          className={`status-pill status-${item.status}`}
                          style={{ border: 'none', cursor: 'pointer', outline: 'none' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.guest_name)}
                          title="Remove enquiry"
                          style={{ color: '#C0392B', padding: '4px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
