import { useCallback, useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Container } from "react-dom/client";
import { useThemeContext } from '../context/ThemeContext';
import type { Engine } from "@tsparticles/engine";


const Particle: React.FC = () => {
    const { theme, darkMode } = useThemeContext(); // Access the current theme from context
    const [init, setInit] = useState(false);
    const [particleColor, setParticleColor] = useState("#008b8b")

    initParticlesEngine(async (engine) => {
        await loadSlim(engine);
    }).then(() => {
        setInit(true);
        setParticleColor("#008b8b")
    });

    useEffect(() => {
        console.log('from useffect')
        // const reset = 
        async () => {
            if (initParticlesEngine.current) {
                await initParticlesEngine.current.destroy(); // Destroy the current instance
                // await initParticles(particlesInit.current); // Reinitialize
                initParticlesEngine(async (engine) => {
                    await loadSlim(engine);
                }).then(() => {
                    setInit(true);
                    setParticleColor("#FF0000")
                });
            }
        }
    }, [theme])

    //   const particlesLoaded = (container: Container | undefined): Promise<void> => {
    //   };
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
                                // value: "#bae6fd",
                                // value: "#008b8b",
                                value: particleColor,
                                // value: theme === "light" ? "#008b8b" : "#0000ff", // Dynamic background based on theme
                            },
                            // size: 5,
                            width: 7,
                            links: {
                                // color: theme === "light" ? "#008b8b" : "#0000ff", // Dynamic background based on theme
                                color: particleColor,
                                // color: "#e0f2fe",
                                // color: "#008b8b",
                                // distance: 150,
                                // enable: true,
                                // opacity: 0.5,
                                // width: 1,
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