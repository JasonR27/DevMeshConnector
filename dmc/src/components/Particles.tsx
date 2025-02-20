import { useCallback, useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Container } from "react-dom/client";
import { useThemeContext } from '../context/ThemeContext';
import type { Engine } from "@tsparticles/engine";


const Particle: React.FC = () => {
    const { theme, mode, themeParticleColor } = useThemeContext(); // Access the current theme from context
    console.log('themeParticleColor: ', themeParticleColor)
    const [init, setInit] = useState(false);
    const [particleColor, setParticleColor] = useState("#008b8b")

    

    useEffect(() => {
        console.log('from useffect')
        // const reset = 
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
    
            setParticleColor("#008b8b")
            if (particleColor === "#008b8b" ) {
                setParticleColor('#005ce6');
              } else {
                setParticleColor("#008b8b");
              }
        });

        // async () => {
        //     if (initParticlesEngine.current) {
        //         await initParticlesEngine.current.destroy(); // Destroy the current instance
        //         // await initParticles(particlesInit.current); // Reinitialize
        //         initParticlesEngine(async (engine) => {
        //             await loadSlim(engine);
        //         }).then(() => {
        //             setInit(true);
        //             // setParticleColor("#FF0000")
        //             // if (particleColor === 'red' ) {
        //             //     setParticleColor('blue');
        //             //   } else {
        //             //     setParticleColor('red');
        //             //   }
        //         });
        //     }
        // }
    }, [mode])


    return (
        <>
            {init && (
                <Particles
                    id="tsparticles"
                    //   particlesLoaded={particlesLoaded}
                    style={{
                        zIndex: -1,
                    }}
                    options={{
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: true,
                                    mode: "grab",
                                },
                                // resize: true,
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: particleColor,
                                // value: theme === "light" ? "#008b8b" : "#0000ff", // Dynamic background based on theme
                                // value: themeParticleColor,
                            },
                            // size: 5,
                            width: 7,
                            links: {
                                // color: theme === "light" ? "#008b8b" : "#0000ff", // Dynamic background based on theme
                                // color: themeParticleColor,
                                color: particleColor,                                
                                distance: 150,
                                enable: true,
                                opacity: 0.8,
                                width: 7,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 6,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    //   area: 800,
                                },
                                value: 160,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            // shape: {
                            //     type: ["circle", "triangle", "square"],
                            // },
                            shape: {
                                type: "square",
                            },
                            // polygon: {
                            //     sides: 5, // the number of sides of the polygon
                            // },
                            size: {
                                value: { min: 5, max: 15 },
                            },

                        },
                        detectRetina: true,
                    }}
                />
            )}
        </>
    );
};

export default Particle;