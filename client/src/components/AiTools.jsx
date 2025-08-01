import React, { useState, useRef } from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ToolCard = ({ tool, navigate, user }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const divRef = useRef(null);

    const handleMouseMove = (e) => {
        const bounds = divRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top,
        });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onClick={() => user && navigate(tool.path)}
            className="relative p-6 bg-white shadow-lg rounded-xl cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-200 text-center overflow-hidden"
        >
            {/* Spotlight blur effect */}
            {visible && (
                <div
                    className="pointer-events-none blur-xl bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 size-80 absolute z-0 transition-opacity duration-300"
                    style={{ top: position.y - 120, left: position.x - 120 }}
                />
            )}

            {/* Content */}
            <div className="relative z-10">
                <tool.Icon
                    className="w-16 h-16 rounded-lg mb-4 mx-auto text-white"
                    style={{
                        background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
                        padding: '12px',
                    }}
                />
                <h2 className="text-2xl font-semibold mb-2 text-primary">{tool.title}</h2>
                <p className="text-gray-600 mb-4 max-w-[95%] mx-auto">{tool.description}</p>
            </div>
        </div>
    );
};

const AiTools = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    return (
        <div className='px-4 sm:px-20 xl:px-32 mb-16 flex flex-col items-center justify-center py-10'>
            <div className='text-center'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-bold font-semibold bg-gradient-to-r from-blue-700 to-purple-400 bg-clip-text text-transparent mb-4'>
                    Amazing AI Tools
                </h1>
                <p className='text-gray-700 max-w-4xl mx-auto text-md sm:text-2xl md:text-2xl'>
                    Explore our collection of AI tools designed to enhance your productivity and creativity. From content generation to data analysis, we have the right tool for you.
                </p>
            </div>

            <div className="mt-4 sm:mt-20 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-start m-6">
                {AiToolsData.map((tool, index) => (
                    <ToolCard key={index} tool={tool} navigate={navigate} user={user} />
                ))}
            </div>
        </div>
    );
};

export default AiTools;
