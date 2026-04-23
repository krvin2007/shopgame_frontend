'use client';

import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // THÔNG TIN DỰ ÁN CỦA TÀI
  const PACKAGE_ID = "0x7d000af25d938545ad1eab9e211a48f14320a0242eaaf80ea56b4f70a7608b97";
  const ADMIN_CAP_ID = "0xf907838383fd6578d35bdceea1f571a1e43ccf694d76a036f3c22f0105d9621b";

  const handleBuyKey = (tier: string) => {
    if (!account) {
      alert("Ông ơi, kết nối ví Sui trước đã!");
      return;
    }

    const txb = new Transaction();
    txb.moveCall({
      target: `${PACKAGE_ID}::game_license::mint_key`,
      arguments: [
        txb.object(ADMIN_CAP_ID),      // Thẻ Admin của ông
        txb.pure.address(account.address), // Ví người mua (là chính ông khi test)
        txb.pure.string(tier),         // Hạng "VIP" hoặc "Standard"
      ],
    });

    signAndExecute(
      { transaction: txb },
      {
        onSuccess: () => alert(`Chúc mừng Tài! Đã đúc thành công thẻ ${tier} vào ví!`),
        onError: (err) => console.error("Lỗi rồi:", err),
      }
    );
  };

  return (
    <main className="position-relative overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* THAY THẾ TOÀN BỘ ĐOẠN PARTICLES CŨ BẰNG ĐOẠN NÀY */}
      {isMounted && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          zIndex: 0, // Nằm dưới cùng
          pointerEvents: 'none',
          overflow: 'hidden'
        }}>
          {[...Array(50)].map((_, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                background: 'rgba(0, 242, 255, 0.7)', // Màu xanh neon
                borderRadius: '50%',
                boxShadow: '0 0 10px #00f2ff', // Phát sáng nhẹ
                bottom: '-20px',
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                // Animation custom bằng biến CSS
                animation: `float-up ${Math.random() * 10 + 5}s infinite linear`,
                animationDelay: `${Math.random() * 5}s`,
                ['--drift' as any]: `${Math.random() * 200 - 100}px`, // Biến drift dùng cho CSS animation
              } as any}
            />
          ))}
        </div>
      )}

      {/* Nội dung cửa hàng của ông nằm dưới này */}
      <div className="container position-relative py-5" style={{ zIndex: 1 }}>
        <nav className="d-flex justify-content-between align-items-center mb-5 p-3 rounded" style={{ background: '#1a1d23' }}>
          <h2 className="text-info m-0">SUI GAME KEY</h2>
          <ConnectButton />
        </nav>

        <div className="text-center mb-5">
          <h1
            className="display-4 fw-bold mb-3"
            style={{
              background:
                'linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'rgb-move 3s linear infinite',
              textShadow: '0 0 15px rgba(0, 242, 255, 0.3)',
            }}
          >
            CỬA HÀNG BẢN QUYỀN GAME
          </h1>
          <p className="lead">Hệ thống bảo mật Blockchain - Chống gian lận tuyệt đối</p>
        </div>

        <div className="row g-4 justify-content-center position-relative" style={{ zIndex: 1 }}>
          {/* Gói Standard */}
          <div className="col-md-5">
            <div className="card game-card standard-card h-100 p-4 text-white d-flex flex-column">
              <h2 className="fw-bold mb-3" style={{ color: '#00f2ff' }}>Gói Standard</h2>
              <p className="text-muted flex-grow-1">
                • Nhận ngay License Key cơ bản<br />
                • Hỗ trợ cập nhật 12 tháng<br />
                • Truy cập server Standard
              </p>
              <div className="mt-4">
                <h4 className="mb-3 fw-bold" style={{ color: '#00f2ff' }}>1 SUI</h4>
                <button onClick={() => handleBuyKey("Standard")} className="btn btn-buy-standard w-100 fw-bold py-2">MUA NGAY</button>
              </div>
            </div>
          </div>

          {/* Gói VIP */}
          <div className="col-md-5">
            <div className="card game-card vip-card h-100 p-4 text-white position-relative d-flex flex-column">
              <div className="badge bg-primary position-absolute top-0 end-0 m-3">HOT</div>
              <h2 className="fw-bold mb-3" style={{ color: '#bc13fe' }}>Gói VIP</h2>
              <p className="text-muted flex-grow-1">
                • Nhận License Key vĩnh viễn<br />
                • Ưu tiên tải game tốc độ cao<br />
                • Skin nhân vật độc quyền (NFT)
              </p>
              <div className="mt-4">
                <h4 className="mb-3" style={{ color: '#bc13fe' }}>2 SUI</h4>
                <button
                  onClick={() => handleBuyKey("VIP")}
                  className="btn btn-buy-vip w-100 fw-bold py-2"
                >
                  MUA NGAY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}