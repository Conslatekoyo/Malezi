import { motion } from 'framer-motion';

export default function StarsBg() {
  // Generate random stars for a soft baby-sky effect
  const stars = Array.from({ length: 48 }).map((_, i) => {
    const size = Math.random() * 2 + 2;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    return (
      <motion.span
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.2, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
        style={{
          position: 'absolute',
          top: `${top}%`,
          left: `${left}%`,
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fffbe9 60%, #ffe4fa 100%)',
          boxShadow: `0 0 8px 2px #fffbe9`,
          opacity: 0.7,
        }}
      />
    );
  });

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {stars}
    </div>
  );
}
