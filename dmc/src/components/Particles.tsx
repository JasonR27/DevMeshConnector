// import { useCallback } from "react";
// import type { Container, Engine } from "@tsparticles/engine";
// import Particles from "@tsparticles/react";
// //import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

// const ParticlesComp = () => {
//     const particlesInit = useCallback(async (engine: Engine) => {
//         console.log(engine);

//         // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
//         // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
//         // starting from v2 you can add only the features you need reducing the bundle size
//         //await loadFull(engine);
//         await loadSlim(engine);
//     }, []);

//     const particlesLoaded = useCallback(async (container: Container | undefined) => {
//         await console.log(container);
//     }, []);
//     return ( 
//         <Particles
//             id="tsparticles"
//             init={particlesInit}
//             loaded={particlesLoaded}
//             options={{
//                 background: {
//                     color: {
//                         value: "",
//                     },
//                 },
//                 fpsLimit: 120,
//                 interactivity: {
//                     events: {
//                         onClick: {
//                             enable: true,
//                             mode: "push",
//                         },
//                         onHover: {
//                             enable: true,
//                             mode: "grab",
//                         },
//                         // resize: true,
//                     },
//                     modes: {
//                         push: {
//                             quantity: 4,
//                         },
//                         repulse: {
//                             distance: 200,
//                             duration: 0.4,
//                         },
//                     },
//                 },
//                 particles: {
//                     color: {
//                         value: "#008b8b",
//                     },
//                     links: {
//                         color: "#008b8b",
//                         distance: 150,
//                         enable: true,
//                         opacity: 0.8,
//                         width: 7,
//                     },
//                     move: {
//                         direction: "none",
//                         enable: true,
//                         outModes: {
//                             default: "bounce",
//                         },
//                         random: false,
//                         speed: 6,
//                         straight: false,
//                     },
//                     number: {
//                         density: {
//                             enable: true,
//                             // area: 800,
//                         },
//                         value: 80,
//                     },
//                     opacity: {
//                         value: 0.5,
//                     },
//                     shape: {
//                         type: "square",
//                     },
//                     size: {
//                         value: { min: 5, max: 15 },
//                     },
//                 },
//                 detectRetina: true,
//             }}
//         />
//     );
// };

// export default ParticlesComp;

// import { useCallback, useEffect, useState } from "react";
// // import type { Container, Engine } from "@tsparticles/engine";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import type { Container, Engine } from "@tsparticles/engine";
// // import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// // import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// // import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

// const ParticlesComp = () => {
//     const [init, setInit] = useState(false);

//     // this should be run only once per application lifetime
//     useEffect(() => {
//         initParticlesEngine(async (engine) => {
//             // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
//             // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
//             // starting from v2 you can add only the features you need reducing the bundle size
//             //await loadAll(engine);
//             //await loadFull(engine);
//             await loadSlim(engine);
//             //await loadBasic(engine);
//         }).then(() => {
//             setInit(true);
//         });
//     }, []);

//     const particlesLoaded = (container: Container) => {
//         console.log(container);
//     };

//     return (
//         { init && <Particles
//             id="tsparticles"
//             particlesLoaded={particlesLoaded}
//             options={{
//                 background: {
//                     color: {
//                         value: "#0d47a1",
//                     },
//                 },
//                 fpsLimit: 120,
//                 interactivity: {
//                     events: {
//                         onClick: {
//                             enable: true,
//                             mode: "push",
//                         },
//                         onHover: {
//                             enable: true,
//                             mode: "repulse",
//                         },
//                         resize: true,
//                     },
//                     modes: {
//                         push: {
//                             quantity: 4,
//                         },
//                         repulse: {
//                             distance: 200,
//                             duration: 0.4,
//                         },
//                     },
//                 },
//                 particles: {
//                     color: {
//                         value: "#ffffff",
//                     },
//                     links: {
//                         color: "#ffffff",
//                         distance: 150,
//                         enable: true,
//                         opacity: 0.5,
//                         width: 1,
//                     },
//                     move: {
//                         direction: "none",
//                         enable: true,
//                         outModes: {
//                             default: "bounce",
//                         },
//                         random: false,
//                         speed: 6,
//                         straight: false,
//                     },
//                     number: {
//                         density: {
//                             enable: true,
//                             area: 800,
//                         },
//                         value: 80,
//                     },
//                     opacity: {
//                         value: 0.5,
//                     },
//                     shape: {
//                         type: "circle",
//                     },
//                     size: {
//                         value: { min: 1, max: 5 },
//                     },
//                 },
//                 detectRetina: true,
//             }}
//         />
//       }
//     )};

import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";

// import { loadFull } from "tsparticles";

import { loadSlim } from "@tsparticles/slim";
import { Container } from "react-dom/client";


export default function Particle() {
    const [init, setInit] = useState(false);
    useEffect(() => {
        console.log("init");
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    //   const particlesLoaded = (container: Container | undefined): Promise<void> => {
    //   };

    return (
        <>
            {init && (
                <Particles
                    id="tsparticles"
                    //   particlesLoaded={particlesLoaded}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
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
                                value: "#008b8b",
                            },
                            // size: 5,
                            width: 7,
                            links: {
                                // color: "#e0f2fe",
                                color: "#008b8b",
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
}

