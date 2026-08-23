import { useImage } from '../hooks/useImage';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, X } from 'lucide-react';

const bodies = [
  { id: 'sun', name: 'Sun', color: 'bg-yellow-400', size: 80, orbit: 0, speed: 0, fact: "The Sun holds 99.8% of the solar system's mass and is a nearly perfect sphere of hot plasma." },
  { id: 'mercury', name: 'Mercury', color: 'bg-slate-400', size: 16, orbit: 120, speed: 4, fact: 'Mercury is the fastest planet, zipping around the Sun at 29 miles per second.' },
  { id: 'venus', name: 'Venus', color: 'bg-orange-300', size: 24, orbit: 180, speed: 6, fact: 'Venus spins in the opposite direction to most planets and is the hottest planet.' },
  { id: 'earth', name: 'Earth', color: 'bg-blue-400', size: 26, orbit: 240, speed: 8, fact: 'Earth is the only known planet with active plate tectonics and abundant surface water.' },
  { id: 'mars', name: 'Mars', color: 'bg-red-500', size: 20, orbit: 300, speed: 10, fact: 'Mars is home to Olympus Mons, the tallest volcano in our solar system.' },
  { id: 'jupiter', name: 'Jupiter', color: 'bg-orange-200', size: 48, orbit: 400, speed: 16, fact: 'Jupiter has a Great Red Spot, a giant storm that has been raging for hundreds of years.' },
  { id: 'saturn', name: 'Saturn', color: 'bg-yellow-200', size: 40, orbit: 520, speed: 20, fact: "Saturn's rings are made primarily of billions of pieces of ice and rock." },
  { id: 'uranus', name: 'Uranus', color: 'bg-cyan-200', size: 32, orbit: 620, speed: 24, fact: 'Uranus rotates on its side, making it unique among the planets.' },
  { id: 'neptune', name: 'Neptune', color: 'bg-blue-600', size: 30, orbit: 720, speed: 28, fact: 'Neptune has supersonic winds that can reach up to 1,200 miles per hour.' }
];

export default function InteractiveSolarSystem() {
  const { getImage } = useImage();

  const [selectedBody, setSelectedBody] = useState<string | null>(null);

  const activeBody = bodies.find(b => b.id === selectedBody);

  return (
    <div className="relative w-full aspect-square md:aspect-video bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center">
      <div className={`absolute inset-0 opacity-30 mix-blend-screen bg-[url('${getImage('solarSystem.bg1', 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=1000')}')] bg-cover`}></div>
      
      {/* Container for orbits to allow scrolling on small screens */}
      <div className="relative w-full h-full flex items-center justify-center overflow-auto snap-x snap-mandatory">
        <div className="relative flex items-center justify-center min-w-[800px] min-h-[800px] transform scale-50 sm:scale-75 md:scale-100">
          
          {bodies.map((body, i) => (
            <div key={body.id} className="absolute flex items-center justify-center">
              {/* Orbit Path */}
              {body.orbit > 0 && (
                <div 
                  className="absolute border border-slate-700/50 rounded-full"
                  style={{ width: body.orbit * 2, height: body.orbit * 2 }}
                />
              )}
              
              {/* Planet / Sun Container */}
              <motion.div
                className="absolute flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: body.speed, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                style={{
                  width: body.orbit * 2,
                  height: body.orbit * 2
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.5 }}
                  onClick={() => setSelectedBody(body.id)}
                  className={`absolute rounded-full shadow-lg ${body.color} cursor-pointer hover:ring-4 hover:ring-white/30 transition-shadow`}
                  style={{ 
                    width: body.size, 
                    height: body.size,
                    top: 0,
                    marginTop: -body.size / 2,
                    boxShadow: body.id === 'sun' ? '0 0 40px 20px rgba(250, 204, 21, 0.4)' : 'none'
                  }}
                  // Counter-rotate the button so it doesn't spin wildly visually
                  animate={{ rotate: -360 }}
                  transition={{ 
                    duration: body.speed, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
              </motion.div>
            </div>
          ))}
          
        </div>
      </div>

      <AnimatePresence>
        {activeBody && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-80 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-white shadow-2xl"
          >
            <button 
              onClick={() => setSelectedBody(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h4 className="text-2xl font-black mb-2 flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full ${activeBody.color} shadow-lg`} />
              {activeBody.name}
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed">
              {activeBody.fact}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute top-6 left-6 bg-slate-900/50 backdrop-blur px-4 py-2 rounded-full border border-white/10 text-white/80 font-medium text-sm flex items-center gap-2">
        <Info className="w-4 h-4" /> Click planets to explore
      </div>
    </div>
  );
}
