'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const SoccerBackgroundAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationInitialized = useRef(false);

    useEffect(() => {
        if (animationInitialized.current || !containerRef.current) return;
        animationInitialized.current = true;

        const soccer1 = document.getElementById('soccer1');
        const soccer2 = document.getElementById('soccer2');

        if (!soccer1 || !soccer2) return;

        // Initialize - show soccer1, hide soccer2
        gsap.set(soccer1, { opacity: 1 });
        gsap.set(soccer2, { opacity: 0 });

        // Main Timeline with loop
        const mainTL = gsap.timeline({
            repeat: -1,
            onRepeat: () => {
                // Reset all elements on each loop
                gsap.set('.soccer1_fill > *', { x: 0, scale: 1, opacity: 1 });
                gsap.set('.soccer1_extra-line > g', { x: 0, rotation: 0, scale: 1, opacity: 1 });
                gsap.set('.soccer1_line > *', { opacity: 1, scale: 1 });
                gsap.set('.soccer1ball', { rotation: 0, x: 0, opacity: 1 });
                gsap.set('.soccer1ball > g:first-child > *', { scale: 1 });
                gsap.set('.soccer2_fill > *', { scale: 1, opacity: 1 });
                gsap.set('.soccer2_extra-line > *', { opacity: 1 });
            }
        });

        // ========== SOCCER 1 ANIMATION ==========
        mainTL
            // Entrada de elementos
            .fromTo('.soccer1_fill > *',
                { x: -2000, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.015, duration: 0.3 },
                0
            )
            .fromTo('.soccer1_extra-line > g',
                { x: -1500, rotation: -360, opacity: 0 },
                { x: 0, rotation: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power3.out' },
                0
            )
            .fromTo('.soccer1_line > *',
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, stagger: 0.008, duration: 0.2 },
                0.3
            )
            // Ball animation
            .fromTo('.soccer1ball > g:first-child > *',
                { scale: 0 },
                { scale: 1, stagger: 0.1, duration: 0.3 },
                0.8
            )
            .to('.soccer1ball', {
                rotation: 720,
                x: 1200,
                duration: 2,
                ease: 'power2.out'
            }, 1.5)
            .to('.soccer1ball', { opacity: 0, duration: 0.5 }, '-=0.5')
            // Hold for a moment
            .to({}, { duration: 1 })
            // Fade out soccer1
            .to('.soccer1_fill > *', { opacity: 0, scale: 0, stagger: 0.005, duration: 0.2 })
            .to('.soccer1_extra-line > g', { opacity: 0, scale: 0, stagger: 0.05, duration: 0.3 }, '-=0.2')
            .to('.soccer1_line > *', { opacity: 0, stagger: 0.005, duration: 0.15 }, '-=0.2')
            .to(soccer1, { opacity: 0, duration: 0.3 })

            // ========== SOCCER 2 ANIMATION ==========
            .to(soccer2, { opacity: 1, duration: 0.3 })
            .fromTo('.soccer2_fill > *',
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, stagger: 0.015, duration: 0.25 }
            )
            .fromTo('.soccer2_extra-line > *',
                { opacity: 0 },
                { opacity: 1, stagger: 0.1, duration: 0.8 },
                '-=0.5'
            )
            // Hold for a moment
            .to({}, { duration: 2 })
            // Fade out soccer2
            .to('.soccer2_fill > *', { opacity: 0, scale: 0, stagger: 0.01, duration: 0.2 })
            .to('.soccer2_extra-line > *', { opacity: 0, duration: 0.3 }, '-=0.2')
            .to(soccer2, { opacity: 0, duration: 0.3 })

            // Show soccer1 again for the loop
            .set(soccer1, { opacity: 1 })
            .set('.soccer1_fill > *', { x: 0, scale: 1, opacity: 1 })
            .set('.soccer1_extra-line > g', { x: 0, rotation: 0, scale: 1, opacity: 1 })
            .set('.soccer1_line > *', { opacity: 1, scale: 1 })
            .set('.soccer1ball', { rotation: 0, x: 0, opacity: 1 })
            .set('.soccer1ball > g:first-child > *', { scale: 1 });

        return () => {
            mainTL.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-30"
        >
            {/* Soccer 1 */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                id="soccer1"
                x="0px"
                y="0px"
                viewBox="0 0 2948.4 2312.3"
                xmlSpace="preserve"
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ opacity: 0 }}
            >
                <title>soccer-1</title>
                <g className="soccer1ball">
                    <g>
                        <polygon fill="#FFFFFF" points="2731.4,2053.3 2802.7,2098 2784.7,2026" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2764.7,2117.3 2802.7,2098 2798,2198.7" opacity="0.2" />
                        <polygon fill="#FFFFFF" points="2764.7,2117.3 2759.4,2176 2798,2198.7" opacity="0.2" />
                        <polygon fill="#FFFFFF" points="2852,2129.3 2802.7,2098 2868.7,2044.7" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2852,2129.3 2896.7,2094.7 2868.7,2044.7" opacity="0.2" />
                        <polygon fill="#FFFFFF" points="2812.7,2046 2868.7,2044.7 2878.7,2024.7" opacity="0.2" />
                        <polygon fill="#FFFFFF" points="2878.7,2024.7 2917.4,2046 2880.7,2013.3" opacity="0.2" />
                        <polygon fill="#FFFFFF" points="2920.7,2116 2939.4,2088 2917.4,2046" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2888.7,2198 2923.4,2170 2920.7,2116" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2892.7,2236.7 2934,2180.7 2888.7,2198" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2920.7,2116 2947.4,2137.3 2939.4,2088" opacity="0.2" />
                        <polygon fill="#FFFFFF" points="2798,2198.7 2804.7,2244 2867.4,2233.3" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2804.7,2244 2773.4,2252.7 2798,2198.7" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2773.4,2252.7 2718.7,2212.7 2759.4,2176" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2773.4,2252.7 2822,2262 2804.7,2244" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2822,2262 2865.4,2250.7 2804.7,2244" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2865.4,2250.7 2892.7,2236.7 2867.4,2233.3" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2718.7,2212.7 2737.4,2239.3 2773.4,2252.7" opacity="0.4" />
                        <polygon fill="#FFFFFF" points="2718.7,2212.7 2690,2184 2679.4,2126.7" opacity="0.2" />
                        <polygon fill="#FFFFFF" points="2694,2066 2731.4,2053.3 2720,2092" opacity="0.2" />
                        <polygon fill="#FFFFFF" points="2713.4,2037.3 2749.4,2007.3 2731.4,2053.3" opacity="0.2" />
                        <polygon fill="#FFFFFF" points="2696.7,2135.3 2718,2184 2759.4,2176" opacity="0.2" />
                        <polygon fill="#FFFFFF" points="2696.7,2135.3 2764.7,2117.3 2720,2092" opacity="0.4" />
                    </g>
                    <g className="soccer1ball-line" style={{ fill: 'none', stroke: '#fff', strokeLinejoin: 'round', strokeWidth: '2px' }}>
                        <polygon points="2784.7 2026.01 2812.7 2046.01 2802.7 2098.01 2784.7 2026.01" />
                        <polygon points="2731.37 2053.34 2802.7 2098.01 2784.7 2026.01 2731.37 2053.34" />
                        <polygon points="2731.37 2053.34 2720.04 2092.01 2764.7 2117.34 2731.37 2053.34" />
                        <polygon points="2764.7 2117.34 2802.7 2098.01 2798.04 2198.68 2764.7 2117.34" />
                        <polygon points="2764.7 2117.34 2759.37 2176.01 2798.04 2198.68 2764.7 2117.34" />
                        <polygon points="2798.04 2198.68 2850.04 2170.68 2852.04 2129.34 2798.04 2198.68" />
                        <polygon points="2852.04 2129.34 2802.7 2098.01 2868.7 2044.68 2852.04 2129.34" />
                        <polygon points="2852.04 2129.34 2896.7 2094.68 2868.7 2044.68 2852.04 2129.34" />
                        <polygon points="2812.7 2046.01 2868.7 2044.68 2878.7 2024.68 2812.7 2046.01" />
                        <polygon points="2784.7 2026.01 2796.7 1999.34 2812.7 2046.01 2784.7 2026.01" />
                        <polygon points="2796.7 1999.34 2832.7 1996.01 2794.7 1995.34 2796.7 1999.34" />
                        <polygon points="2832.7 1996.01 2878.7 2024.68 2880.7 2013.34 2832.7 1996.01" />
                        <polygon points="2878.7 2024.68 2917.37 2046.01 2880.7 2013.34 2878.7 2024.68" />
                        <polygon points="2917.37 2046.01 2896.7 2094.68 2920.7 2116.01 2917.37 2046.01" />
                        <polygon points="2920.7 2116.01 2939.37 2088.01 2917.37 2046.01 2920.7 2116.01" />
                        <polygon points="2852.04 2129.34 2888.7 2198.01 2850.04 2170.68 2852.04 2129.34" />
                        <polygon points="2888.7 2198.01 2923.37 2170.01 2920.7 2116.01 2888.7 2198.01" />
                        <polygon points="2888.7 2198.01 2867.37 2233.34 2892.7 2236.68 2888.7 2198.01" />
                        <polygon points="2892.7 2236.68 2934.04 2180.68 2888.7 2198.01 2892.7 2236.68" />
                        <polygon points="2923.37 2170.01 2934.04 2180.68 2947.37 2137.34 2923.37 2170.01" />
                        <polygon points="2920.7 2116.01 2947.37 2137.34 2939.37 2088.01 2920.7 2116.01" />
                        <polygon points="2798.04 2198.68 2804.7 2244.01 2867.37 2233.34 2798.04 2198.68" />
                        <polygon points="2804.7 2244.01 2773.37 2252.68 2798.04 2198.68 2804.7 2244.01" />
                        <polygon points="2773.37 2252.68 2718.7 2212.68 2759.37 2176.01 2773.37 2252.68" />
                        <polygon points="2718.7 2212.68 2718.04 2184.01 2759.37 2176.01 2718.7 2212.68" />
                        <polygon points="2773.37 2252.68 2822.04 2262.01 2804.7 2244.01 2773.37 2252.68" />
                        <polygon points="2822.04 2262.01 2865.37 2250.68 2804.7 2244.01 2822.04 2262.01" />
                        <polygon points="2865.37 2250.68 2892.7 2236.68 2867.37 2233.34 2865.37 2250.68" />
                        <polygon points="2718.7 2212.68 2737.37 2239.34 2773.37 2252.68 2718.7 2212.68" />
                        <polygon points="2718.7 2212.68 2690.04 2184.01 2679.37 2126.68 2718.7 2212.68" />
                        <polygon points="2679.37 2126.68 2696.7 2135.34 2720.04 2092.01 2679.37 2126.68" />
                        <polygon points="2679.37 2126.68 2694.04 2066.01 2720.04 2092.01 2679.37 2126.68" />
                        <polygon points="2694.04 2066.01 2731.37 2053.34 2720.04 2092.01 2694.04 2066.01" />
                        <polygon points="2694.04 2066.01 2713.37 2037.34 2731.37 2053.34 2694.04 2066.01" />
                        <polygon points="2713.37 2037.34 2749.37 2007.34 2731.37 2053.34 2713.37 2037.34" />
                        <polygon points="2749.37 2007.34 2784.7 2026.01 2794.7 1995.34 2749.37 2007.34" />
                        <polygon points="2696.7 2135.34 2718.04 2184.01 2759.37 2176.01 2696.7 2135.34" />
                        <polygon points="2696.7 2135.34 2764.7 2117.34 2720.04 2092.01 2696.7 2135.34" />
                    </g>
                </g>
                <g className="soccer1_fill" data-name="FILL">
                    <polygon fill="#FFFFFF" points="1859.2,936.7 1731.5,1087.9 1862.1,809.9" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="1732.2,1089.9 1859.4,934.2 1781,750" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="1771.9,816.2 1743.4,774.5 1810.6,726.6" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="1736.3,906.8 1609.7,1049 1738.3,786.7" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="1643.7,979.3 1646.1,868 1759.1,819.1" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="1602.6,862.6 1628.7,811.5 1678.7,784.3" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="1678.7,784.3 1643.9,920.2 1755.9,752.8" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="1678.7,784.3 1751.5,732.2 1813.5,764.8" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="1803.3,1171.7 1843.8,1399.1 1853.9,1100.2" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="1970.3,1256.8 1843.8,1399.1 1972.3,1136.7" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="1883.4,944 1854,1100.7 1951.4,1008.3" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="1838.3,1519.1 1711.3,1413 1840.3,1399.1" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="2058.9,1580.8 1908.4,1522.8 1857.4,1639.3" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="2158.4,1661.3 2220.4,1719.8 2114.9,1845.8" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="2115.9,1845.3 2251.9,1814.3 2239.9,1756.8" opacity="0.2" />
                    <polygon fill="#FFFFFF" points="2140.9,1976.8 2232.9,2090.8 2176.9,1905.3" opacity="0.2" />
                    <polygon fill="#FFFFFF" points="2346.4,2033.8 2380.9,2092.8 2177.4,2020.8" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="2425.4,2148.7 2472,2159.3 2439.4,2204" opacity="0.3" />
                    <polygon fill="#FFFFFF" points="2496,2226.7 2539.4,2204 2472,2159.3" opacity="0.2" />
                    <polygon fill="#FFFFFF" points="2600,2149.3 2607.4,2158 2571.4,2220" opacity="0.2" />
                </g>
                <g className="soccer1_extra-line" data-name="Extra Line">
                    <g>
                        <polyline fill="none" stroke="#FFFFFF" strokeLinejoin="round" strokeWidth="2" points="753,1032.3 1,406 832.1,1366.1 1132.1,1348.1 795.2,1067.5" />
                        <line x1="998.3" x2="1159.1" y1="683.3" y2="1378.1" fill="none" stroke="#FFFFFF" strokeLinejoin="round" strokeWidth="2" />
                    </g>
                    <g>
                        <line x1="1001.2" x2="987.1" y1="859.6" y2="677.3" fill="none" stroke="#FFFFFF" strokeLinejoin="round" strokeWidth="2" />
                        <line x1="1036.1" x2="1004.8" y1="1309.1" y2="905.1" fill="none" stroke="#FFFFFF" strokeLinejoin="round" strokeWidth="2" />
                    </g>
                    <g>
                        <line x1="587" x2="759.1" y1="788" y2="1028" fill="none" stroke="#FFFFFF" strokeLinejoin="round" strokeWidth="2" />
                        <polyline fill="none" stroke="#FFFFFF" strokeLinejoin="round" strokeWidth="2" points="790,1071.2 952.1,1297.1 103,928.1 199,247 545.3,730" />
                    </g>
                    <g>
                        <polyline fill="none" stroke="#FFFFFF" strokeMiterlimit="10" strokeWidth="3" points="886.9,599.3 951.6,520.5 1004,549 1068,609.2 1002.6,684.3 950.9,659.5 888.3,597.6" />
                        <line x1="940.8" x2="1004" y1="627.7" y2="549" fill="none" stroke="#FFFFFF" strokeMiterlimit="10" strokeWidth="3" />
                    </g>
                    <g>
                        <polygon fill="none" stroke="#FFFFFF" strokeMiterlimit="10" strokeWidth="3" points="1240,439.7 1226.8,472.2 1244.9,509 1288.4,502.9 1300.8,470 1282.9,434.6" />
                        <polyline fill="none" stroke="#FFFFFF" strokeMiterlimit="10" strokeWidth="3" points="1245.7,508 1259.2,474.5 1242,440.8" />
                    </g>
                    <g>
                        <polygon fill="none" stroke="#FFFFFF" strokeMiterlimit="10" strokeWidth="3" points="550.7,715.7 534.3,763 553.8,781.9 598.6,791.8 615.2,744.1 595.2,726.1" />
                        <polyline fill="none" stroke="#FFFFFF" strokeMiterlimit="10" strokeWidth="3" points="554.3,780.7 570.5,733.6 552.7,717.4" />
                    </g>
                </g>
                <g className="soccer1_line" data-name="LINE" style={{ fill: 'none', stroke: '#fff', strokeLinejoin: 'round', strokeWidth: '2px' }}>
                    <polygon points="1803.31 1171.71 1843.78 1399.05 1853.86 1100.2 1803.31 1171.71" />
                    <polygon points="1803.31 1171.71 1744.04 1076.01 1853.86 1100.2 1803.31 1171.71" />
                    <polygon points="1803.31 1171.71 1931.65 1119.43 1853.86 1100.2 1803.31 1171.71" />
                    <polygon points="1970.32 1256.81 1843.78 1399.05 1972.35 1136.73 1970.32 1256.81" />
                    <polygon points="1970.32 1256.81 1843.78 1399.05 1976.7 1292.68 1970.32 1256.81" />
                    <polygon points="1932.7 1377.34 1843.78 1399.05 1976.7 1292.68 1932.7 1377.34" />
                    <polygon points="1858.38 981.04 1728.04 954.68 1883.82 942.37 1858.38 981.04" />
                    <polygon points="1736.27 906.75 1609.73 1049 1738.3 786.68 1736.27 906.75" />
                    <polygon points="2058.87 1580.84 1908.37 1522.84 1857.37 1639.34 2058.87 1580.84" />
                    <polygon points="2158.37 1661.34 2220.37 1719.84 2114.87 1845.84 2158.37 1661.34" />
                    <polygon points="2115.87 1845.34 2251.87 1814.34 2239.87 1756.84 2115.87 1845.34" />
                    <polygon points="2140.87 1976.84 2232.87 2090.84 2176.87 1905.34 2140.87 1976.84" />
                    <polygon points="2346.37 2033.84 2380.87 2092.84 2177.37 2020.84 2346.37 2033.84" />
                    <polygon points="2425.37 2148.68 2439.37 2204.01 2496.04 2226.68 2425.37 2148.68" />
                    <polygon points="2496.04 2226.68 2539.37 2204.01 2472.04 2159.34 2496.04 2226.68" />
                    <polygon points="2600.04 2149.34 2607.37 2158.01 2571.37 2220.01 2600.04 2149.34" />
                </g>
            </svg>

            {/* Soccer 2 */}
            <svg
                id="soccer2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2538.46 2045.16"
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ opacity: 0 }}
            >
                <title>soccer 2</title>
                <g className="soccer2_fill" data-name="FILL" style={{ fill: '#fff', opacity: 0.3 }}>
                    <polygon points="1669.27 544.27 1797.94 654.94 1865.94 535.61 1669.27 544.27" />
                    <polygon points="1647.94 687.61 1786.61 741.61 1797.94 654.94 1647.94 687.61" />
                    <polygon points="1669.27 544.27 1845.27 386.94 1865.94 535.61 1669.27 544.27" />
                    <polygon points="1845.27 386.94 1917.27 432.27 1865.94 535.61 1845.27 386.94" />
                    <polygon points="1865.94 535.61 1869.27 606.94 1837.27 586.94 1865.94 535.61" />
                    <polygon points="1985.94 562.27 1906.61 628.27 1869.27 606.94 1985.94 562.27" />
                    <polygon points="1869.27 606.94 1970.61 514.27 1985.94 562.27 1869.27 606.94" />
                    <polygon points="1926.61 554.94 1917.27 432.27 1970.61 514.27 1926.61 554.94" />
                    <polygon points="1926.61 554.94 1893.27 518.27 1869.27 606.94 1926.61 554.94" />
                    <polygon points="1865.94 535.61 1917.27 432.27 1893.27 518.27 1865.94 535.61" />
                    <polygon points="1733.94 317.61 1871.94 362.94 1917.27 432.27 1733.94 317.61" />
                    <polygon points="1845.27 386.94 1741.27 375.61 1733.94 317.61 1845.27 386.94" />
                    <polygon points="1845.27 386.94 1669.27 544.27 1741.27 375.61 1845.27 386.94" />
                    <polygon points="1356.13 578.74 1776.94 909.61 1786.61 741.61 1356.13 578.74" />
                    <polygon points="1768.94 708.61 1378.94 960.61 1337.27 635.61 1768.94 708.61" />
                    <polygon points="1690.94 941.61 1349.94 1118.61 1405.94 804.61 1690.94 941.61" />
                    <polygon points="1769.94 937.61 1506.94 953.61 1545.94 791.61 1769.94 937.61" />
                    <polygon points="1558.94 1180.61 1375.94 1182.61 1349.94 1118.61 1558.94 1180.61" />
                    <polygon points="1385.94 1030.61 1558.94 1180.61 1800.94 1016.61 1385.94 1030.61" />
                    <polygon points="1953.94 1087.61 1558.94 1180.61 1855.94 1001.61 1953.94 1087.61" />
                    <polygon points="1858.94 1401.61 2093.94 1270.61 1953.94 1087.61 1858.94 1401.61" />
                    <polygon points="1953.94 1087.61 1767.94 1241.61 2012.94 1188.61 1953.94 1087.61" />
                    <polygon points="1486.94 1219.61 1699.94 1350.61 1799.94 1188.61 1486.94 1219.61" />
                    <polygon points="1747.94 1314.61 1858.94 1401.61 1960.94 1281.61 1747.94 1314.61" />
                    <polygon points="2200.94 1688.61 2188.94 1557.61 2157.94 1478.61 2200.94 1688.61" />
                    <polygon points="2145.94 1597.61 2072.94 1730.61 2200.94 1688.61 2145.94 1597.61" />
                    <polygon points="2072.94 1730.61 2197.94 1890.61 2200.94 1688.61 2072.94 1730.61" />
                    <polygon points="2088.94 1927.61 2126.94 1946.61 2197.94 1890.61 2088.94 1927.61" />
                    <polygon points="2394.94 1989.61 2368.94 1955.61 2233.94 1897.61 2394.94 1989.61" />
                    <polygon points="2197.94 1890.61 2275.94 2002.61 2394.94 1989.61 2197.94 1890.61" />
                    <polygon points="1798.94 1653.61 1824.94 1594.61 1762.94 1471.61 1798.94 1653.61" />
                    <polygon points="1762.94 1700.61 1704.94 1545.61 1798.94 1653.61 1762.94 1700.61" />
                    <polygon points="1764.94 1823.61 1722.94 1776.61 1648.94 1752.61 1764.94 1823.61" />
                    <polygon points="1515.94 1821.61 1789.94 1896.61 1764.94 1823.61 1515.94 1821.61" />
                </g>
                <g className="soccer2_extra-line" data-name="Extra Line" style={{ fill: 'none', stroke: '#fff', strokeWidth: 2 }}>
                    <path d="M81.61,1351.1L897.51,1600.8" />
                    <path d="M1218.2,573.2L1056.9,337.61" />
                </g>
            </svg>
        </div>
    );
};
