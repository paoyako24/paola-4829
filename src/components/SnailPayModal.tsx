import React, { useState } from 'react';
import type { SnailData } from '../types';

interface SnailPayModalProps {
  snails?: SnailData[];
  isOpen?: boolean;
  onClose: () => void;
  onPaymentSuccess?: () => void;
}

export function SnailPayModal({ snails, isOpen = true, onClose, onPaymentSuccess }: SnailPayModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handlePay = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onPaymentSuccess) onPaymentSuccess();
      onClose();
    }, 1500);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', width: '320px', color: '#333' }}>
        <h3>Pasarela SnailPay</h3>
        <p>Procesar suscripción para caracoles</p>
        
        {snails && (
          <p style={{ fontSize: '14px', color: '#666' }}>
            Caracoles activos: {snails.length}
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={handlePay} disabled={loading}>
            {loading ? 'Procesando...' : 'Pagar Ahora'}
          </button>
          <button onClick={onClose} disabled={loading}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}