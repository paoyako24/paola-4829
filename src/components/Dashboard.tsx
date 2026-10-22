import React, { useState } from 'react';
import type { User, SnailData } from '../types';
import { SnailPayModal } from './SnailPayModal';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const initialSnails: SnailData[] = [
  { id: '1', name: 'Turbo Snail', speed: 12, energy: 85 },
  { id: '2', name: 'Racer Garcaso', speed: 15, energy: 90 },
  { id: '3', name: 'Flash Caracol', speed: 18, energy: 95 },
];

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [snails] = useState<SnailData[]>(initialSnails);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const chartData = {
    labels: snails.map((s) => s.name),
    datasets: [
      {
        label: 'Velocidad (cm/s)',
        data: snails.map((s) => s.speed),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Energía (%)',
        data: snails.map((s) => s.energy),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
        <h2>Bienvenido, {user.username}</h2>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ marginRight: '1rem', padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Pagar con SnailPay
          </button>
          <button
            onClick={onLogout}
            style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <section style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>Rendimiento de Caracoles</h3>
        <div style={{ width: '100%', height: '350px', marginTop: '1rem' }}>
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </section>

      {isModalOpen && (
       <SnailPayModal snails={snails} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};