import React, { useState } from 'react';
import '../styles/TopsoilCalculator.css';

const TopsoilCalculator = () => {
    const [area, setArea] = useState('');
    const [thickness, setThickness] = useState('');
    const [result, setResult] = useState(null);

    const calculateTopsoil = () => {
        const cubicFeet = (area * (thickness / 12)).toFixed(2);
        const cubicYards = (cubicFeet / 27).toFixed(2);

        setResult({
            cubicFeet,
            cubicYards,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        calculateTopsoil();
    };

    return (
        <div className="topsoil-calculator">
            <form onSubmit={handleSubmit}>
                <label>
                    Area (in square feet):
                    <input
                        type="number"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    />
                </label>
                <label>
                    Thickness (in inches):
                    <input
                        type="number"
                        value={thickness}
                        onChange={(e) => setThickness(e.target.value)}
                    />
                </label>
                <button type="submit">Calculate</button>
            </form>
            {result && (
                <div className="result">
                    <p>You need a total of {result.cubicFeet} cubic feet of topsoil, or</p>
                    <p>{result.cubicYards} cubic yard of topsoil, or</p>
                </div>
            )}
        </div>
    );
};

export default TopsoilCalculator;
