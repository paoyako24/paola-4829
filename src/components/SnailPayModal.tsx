import { useState } from 'react';
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
    try {
      const response = await fetch('http://localhost:3001/api/snailpay/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100,
          plan: 'suscripcion_caracoles',
          scenario: 'scenario_1',
          cardNumber: '1234123412341234',
          expirationDate: '12/26',
          cvv: '543',
          fullName: 'Paola Paredes'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('snailpay_balance', data.newBalance ? data.newBalance.toString() : '900');
        
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
        onClose();
      } else {
        console.error("Error en la transacción:", data.error || data.message || data.status_detail);
      }
    } catch (error) {
      console.error("No se pudo conectar con el servidor backend:", error);
    } finally {
      setLoading(false);
    }
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
          <button 
            onClick={handlePay} 
            disabled={loading}
            style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {loading ? 'Procesando...' : 'Pagar Ahora'}
          </button>
          <button 
            onClick={onClose} 
            disabled={loading}
            style={{ padding: '8px 16px', background: '#e5e7eb', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}