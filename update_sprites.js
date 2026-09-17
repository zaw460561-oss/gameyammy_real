const fs = require('fs');

const PALETTE = {
    'S': '#d4a373', 's': '#b48a5c', // Sand
    'W': '#0284c7', 'w': '#0369a1', // Water
    'G': '#4ade80', 'g': '#22c55e', 'V': '#166534', // Green
    'T': '#78350f', 't': '#451a03', // Wood/Trunk
    'P': '#fbbf24', 'p': '#d97706', 'q': '#b45309', // Pyramid Gold/Shadow
    'B': '#f3f4f6', 'b': '#d1d5db', 'd': '#9ca3af', 'D': '#6b7280', // White Marble
    'L': '#4b5563', 'l': '#374151', 'm': '#1f2937', // Dark Stone
    'A': '#dc2626', 'a': '#991b1b', // Red
    'C': '#8b5cf6', 'c': '#6d28d9', // Cloth / Sails
    'O': '#fcd34d', // Bright Gold (Coins)
    'Y': '#eab308', // Gold Accent
    '#': '#ffffff', '*': '#cbd5e1', // Clouds
    'M': '#334155', 'N': '#1e293b', // Mountains
    'H': '#fde047', 'h': '#fef08a',  // Sun/Moon
    'R': '#ef4444', 'r': '#b91c1c', // Spartan Red
    'K': '#000000', 'k': '#111827', // Black
    'U': '#8b5cf6', 'u': '#6d28d9', // Purple
};

const SPRITES = {
    palm: [
        "   G   ",
        "  GGG  ",
        " gGVGg ",
        "  GGG  ",
        "   T   ",
        "   T   ",
        "   T   ",
        "   T   "
    ],
    olive: [
        "  ggg  ",
        " gGGgg ",
        "ggGVGgg",
        " gGGgg ",
        "  ggg  ",
        "   T   ",
        "   T   "
    ],
    pyramid: [
        "             P             ",
        "            PpP            ",
        "           PPppP           ",
        "          PPpPppP          ",
        "         PPPpppPpP         ",
        "        PPpPPppppPP        ",
        "       PPPpppPPpppPP       ",
        "      PPpPPppppPppppP      ",
        "     PPPPpppPPpppppppP     ",
        "    PPpPPPppppPPpPppppP    ",
        "   PPPPppppPpppppppPpppP   ",
        "  PPpPPpPPppppPPppppPpppP  ",
        " PPPpppPPPPppppppPPppppppP ",
        "PPPPppppppppPpppppppPppppPP"
    ],
    sphinx: [
        "       PppP       ",
        "      BPPppB      ",
        "     BBpKKpBB     ",
        "    BBPppppPBB    ",
        "    BPppppppPB    ",
        "    BppppppppB    ",
        "    BPppppppPB    ",
        "   BBppppppppBB   ",
        "   BPpppddpppPB   ",
        "   BpppddddpppB   ",
        "  PppppddddppppP  ",
        "  PpppppddpppppP  ",
        " PPppppppppppppPP ",
        " PPpp        ppPP ",
        " Ppp          ppP ",
        "PP              PP"
    ],
    parthenon: [
        "              BBBB              ",
        "           BBBBBBBBBB           ",
        "        BBBBBBBBBBBBBBBB        ",
        "      BBBBBBddddddddBBBBBB      ",
        "    BBBBBBddddddddddddBBBBBB    ",
        "  BBBBBBddddddddddddddddBBBBBB  ",
        " BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ",
        " BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ",
        " BB dd BB dd BB dd BB dd BB ddBB",
        " BB dd BB dd BB dd BB dd BB ddBB",
        " BB dd BB dd BB dd BB dd BB ddBB",
        " BB dd BB dd BB dd BB dd BB ddBB",
        " BB dd BB dd BB dd BB dd BB ddBB",
        " BB dd BB dd BB dd BB dd BB ddBB",
        " BB dd BB dd BB dd BB dd BB ddBB",
        " BB dd BB dd BB dd BB dd BB ddBB",
        " BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB ",
        " dddddddddddddddddddddddddddddd ",
        " LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL ",
        " mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm "
    ],
    colosseum: [
        "   bbbbbbbbbbbbbbbbbbbbbbbb   ",
        "  bbbbbbbbbbbbbbbbbbbbbbbbbb  ",
        " bbb   bb   bb   bb   bb   bbb",
        " bb     b    b    b    b    bb",
        " bbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        " bbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        " bb  bb  bb  bb  bb  bb  bb  b",
        " b    b   b   b   b   b   b  b",
        " bbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        " bbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        " bb  bb  bb  bb  bb  bb  bb  b",
        " b    b   b   b   b   b   b  b",
        " bbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        " bbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        " b  b  b  b  b  b  b  b  b  bb",
        " bbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
    ],
    aqueduct: [
        "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "b b   b b   b b   b b   b b   b b   b b   b b   ",
        "b b   b b   b b   b b   b b   b b   b b   b b   ",
        "b b   b b   b b   b b   b b   b b   b b   b b   ",
        "b b   b b   b b   b b   b b   b b   b b   b b   "
    ],
    sparta: [
        "L                        ",
        "L      R      R      R   ",
        "L     RRR    RRR    RRR  ",
        "L     RRR    RRR    RRR  ",
        "L     RRR    RRR    RRR  ",
        "L    OYYYO  OYYYO  OYYYO ",
        "L   YYYYYYY YYYYYYY YYYYY",
        "L   YYYYYYY YYYYYYY YYYYY",
        "L  ttYYYYYttYYYYYttYYYYY ",
        "L  tt YYY tt YYY tt YYY  ",
        "L  tt YYY tt YYY tt YYY  ",
        "L  tt     tt     tt      ",
        "L  tt     tt     tt      ",
        "l  tt     tt     tt      ",
        "l  tt     tt     tt      ",
        "lllllllllllllllllllllllll"
    ],
    camel: [
        "    TT        ",
        "   TTT        ",
        "  TKT         ",
        " T TTT      T ",
        "  TTTTT   TTT ",
        "   TTTTTTTTT  ",
        "    TTTTTTT   ",
        "     TTTTT    ",
        "     T   T    ",
        "     T   T    ",
        "    T    T    ",
        "    T    T    ",
        "   tt   tt    "
    ],
    ship: [
        "         #         ",
        "        ###        ",
        "       #####       ",
        "      #######      ",
        "     #########     ",
        "    ###########    ",
        "   #############   ",
        "  ###############  ",
        " ################# ",
        "         T         ",
        "         T         ",
        "  T      T      T  ",
        "  TTTTTTTTTTTTTTT  ",
        " LLLLLLLLLLLLLLLLL ",
        " TTTTTTTTTTTTTTTTT ",
        "TTTTTTTTTTTTTTTTTTT",
        "  t t t t t t t t  ",
        " t t t t t t t t   ",
        "t t t t t t t t    "
    ],
    wall: [
        "l L l L l L l L l L ",
        "LLLLLLLLLLLLLLLLLLLL",
        "llllllllllllllllllll",
        "LLLLLLLLLLLLLLLLLLLL",
        "llllllllllllllllllll",
        "LLLLLLLLLLLLLLLLLLLL",
        "llllllllllllllllllll",
        "LLLLLLLLLLLLLLLLLLLL"
    ],
    house_egypt: [
        "  ppp  ",
        " ppppp ",
        "ppppppp",
        "SSSpSSS",
        "SS   SS",
        "S     S"
    ],
    house_greek: [
        "  a a  ",
        " aaaaa ",
        "aaaaaaa",
        "BBBBBBB",
        "BB   BB",
        "B     B"
    ],
    cloud: [
        "   ###   ",
        "  #####  ",
        " ####### ",
        " ####### ",
        "  *****  "
    ],
    mountain: [
        "      M      ",
        "     MMM     ",
        "    MMMMM    ",
        "   mMMMMMm   ",
        "  mMMMMMMMm  ",
        " mMMMMMMMMMm ",
        "mMMMMMMMMMMMm"
    ],
    bird: [
        "l l",
        " l "
    ],
    dock: [
        "TTTTTTTT",
        " T  T  T"
    ]
};

let content = fs.readFileSync('index.html', 'utf8');

const replacement = const PALETTE =  + JSON.stringify(PALETTE, null, 4) + ;

        const SPRITES =  + JSON.stringify(SPRITES, null, 4) + ;

        const drawSprite = (ctx, name, ox, oy, scale = 1) => {
            const lines = SPRITES[name];
            if (!lines) return;
            for (let y = 0; y < lines.length; y++) {
                for (let x = 0; x < lines[y].length; x++) {
                    const char = lines[y][x];
                    if (char !== ' ' && PALETTE[char]) {
                        ctx.fillStyle = PALETTE[char];
                        ctx.fillRect(ox + x * scale, oy + y * scale, scale, scale);
                    }
                }
            }
        };

        function PixelCivilization({ choices, stage, resultMode = false }) {
            const canvasRef = useRef(null);
            
            const c1 = choices[0]?.id;
            const c2 = choices[1]?.id;
            const c3 = choices[2]?.id;
            const c4 = choices[3]?.id;

            useEffect(() => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const W = 320;
                const H = 160;
                let animationFrameId;
                let time = 0;

                const render = () => {
                    time++;
                    // Background Sky
                    ctx.fillStyle = '#0f172a';
                    ctx.fillRect(0, 0, W, H);
                    
                    // Stars & Moon/Sun
                    ctx.fillStyle = '#fef08a';
                    ctx.globalAlpha = 0.5 + Math.sin(time * 0.05) * 0.5;
                    ctx.fillRect(40, 20, 2, 2);
                    ctx.fillRect(120, 10, 2, 2);
                    ctx.fillRect(200, 30, 2, 2);
                    ctx.globalAlpha = 0.5 + Math.cos(time * 0.03) * 0.5;
                    ctx.fillRect(280, 50, 2, 2);
                    ctx.fillRect(80, 60, 2, 2);
                    ctx.globalAlpha = 1;
                    
                    // Sun/Moon
                    ctx.fillStyle = '#fde047';
                    ctx.beginPath();
                    ctx.arc(60, 30, 10, 0, Math.PI*2);
                    ctx.fill();

                    // Clouds
                    drawSprite(ctx, 'cloud', (time * 0.2) % (W + 80) - 80, 10, 2);
                    drawSprite(ctx, 'cloud', (time * 0.1 + 100) % (W + 80) - 80, 30, 2);
                    drawSprite(ctx, 'cloud', (time * 0.16 + 200) % (W + 80) - 80, 16, 2);
                    
                    // Birds
                    drawSprite(ctx, 'bird', 240 + Math.sin(time*0.05)*20, 20 + Math.cos(time*0.1)*10, 2);
                    drawSprite(ctx, 'bird', 250 + Math.sin(time*0.05)*20, 26 + Math.cos(time*0.1)*10, 2);
                    
                    // Distant Mountains
                    drawSprite(ctx, 'mountain', 20, 80, 2);
                    drawSprite(ctx, 'mountain', 70, 80, 2);
                    drawSprite(ctx, 'mountain', 120, 80, 2);
                    drawSprite(ctx, 'mountain', 240, 80, 2);
                    drawSprite(ctx, 'mountain', 290, 80, 2);

                    // LAYER 1: BASE TERRAIN
                    if (c1 === '1A') { // EGYPT
                        ctx.fillStyle = '#d4a373'; ctx.fillRect(0, 100, W, 60);
                        ctx.fillStyle = '#cda065'; ctx.fillRect(0, 110, W, 50);
                        ctx.fillStyle = '#b48a5c'; ctx.fillRect(0, 130, W, 30);
                        
                        // Nile
                        ctx.fillStyle = '#0284c7'; ctx.fillRect(200, 100, 80, 60);
                        ctx.fillStyle = '#38bdf8';
                        ctx.fillRect(210 + Math.sin(time*0.1)*10, 110, 20, 4);
                        ctx.fillRect(240 + Math.cos(time*0.1)*10, 130, 30, 4);
                        ctx.fillRect(220 + Math.sin(time*0.05)*10, 150, 24, 4);
                        
                        // Flora & Houses
                        drawSprite(ctx, 'palm', 20, 80, 2);
                        drawSprite(ctx, 'palm', 50, 90, 2);
                        drawSprite(ctx, 'palm', 170, 84, 2);
                        drawSprite(ctx, 'palm', 290, 92, 2);
                        drawSprite(ctx, 'house_egypt', 30, 120, 2);
                        drawSprite(ctx, 'house_egypt', 160, 110, 2);
                        drawSprite(ctx, 'house_egypt', 280, 104, 2);
                        
                    } else if (c1 === '1B') { // GREEK
                        ctx.fillStyle = '#0284c7'; ctx.fillRect(0, 100, W, 60);
                        ctx.fillStyle = '#0369a1'; ctx.fillRect(0, 130, W, 30);
                        ctx.fillStyle = '#71717a'; ctx.fillRect(0, 80, 120, 80);
                        ctx.fillStyle = '#52525b'; ctx.fillRect(0, 100, 90, 60);
                        
                        drawSprite(ctx, 'dock', 110, 110, 2);
                        
                        drawSprite(ctx, 'olive', 10, 70, 2);
                        drawSprite(ctx, 'olive', 40, 84, 2);
                        drawSprite(ctx, 'olive', 90, 80, 2);
                        drawSprite(ctx, 'house_greek', 30, 100, 2);
                        drawSprite(ctx, 'house_greek', 70, 110, 2);
                        
                        ctx.fillStyle = '#38bdf8';
                        ctx.fillRect(160 + Math.sin(time*0.05)*10, 120, 16, 2);
                        ctx.fillRect(240 + Math.cos(time*0.06)*10, 140, 24, 2);
                        ctx.fillRect(200 + Math.sin(time*0.08)*10, 130, 20, 2);
                    } else {
                        ctx.fillStyle = '#1e293b'; ctx.fillRect(0, 100, W, 60);
                    }

                    // LAYER 2: GOVERNANCE
                    if (c2 === '2A1') {
                        drawSprite(ctx, 'pyramid', 60, 50, 2);
                        drawSprite(ctx, 'pyramid', -10, 60, 2); 
                        drawSprite(ctx, 'sphinx', 140, 80, 2);
                    } else if (c2 === '2A2') {
                        drawSprite(ctx, 'colosseum', 40, 50, 2);
                        drawSprite(ctx, 'aqueduct', 120, 70, 2);
                        drawSprite(ctx, 'aqueduct', 168, 70, 2);
                        drawSprite(ctx, 'aqueduct', 216, 70, 2);
                    } else if (c2 === '2B1') {
                        drawSprite(ctx, 'parthenon', 20, 40, 2);
                        drawSprite(ctx, 'house_greek', 80, 90, 2);
                        drawSprite(ctx, 'house_greek', 10, 110, 2);
                    } else if (c2 === '2B2') {
                        drawSprite(ctx, 'sparta', 20, 50, 2);
                        // Sparta Phalanx troops
                        ctx.fillStyle = '#dc2626'; ctx.fillRect(40, 120, 6, 6);
                        ctx.fillStyle = '#dc2626'; ctx.fillRect(50, 120, 6, 6);
                        ctx.fillStyle = '#dc2626'; ctx.fillRect(60, 120, 6, 6);
                    }

                    // LAYER 3: TRADE & POLICY
                    if (c3 === '3.1') {
                        const cx = (time * 0.6) % (W + 40) - 40;
                        drawSprite(ctx, 'camel', cx, 120, 2);
                        drawSprite(ctx, 'camel', cx - 24, 124, 2);
                        drawSprite(ctx, 'camel', cx - 48, 120, 2);
                    } else if (c3 === '3.2') {
                        const sx = c1 === '1B' ? 140 : 220;
                        drawSprite(ctx, 'ship', sx, 90 + Math.sin(time*0.1)*4, 2);
                        drawSprite(ctx, 'ship', sx + 50, 110 + Math.cos(time*0.15)*4, 2);
                    } else if (c3 === '3.3') {
                        drawSprite(ctx, 'wall', 0, 70, 2);
                        drawSprite(ctx, 'wall', 20, 70, 2);
                        drawSprite(ctx, 'wall', W - 20, 70, 2);
                        drawSprite(ctx, 'wall', W - 40, 70, 2);
                    }

                    // LAYER 4: GOLDEN AGE
                    if (c4 === '4.1') {
                        ctx.globalAlpha = 0.3 + Math.sin(time * 0.05) * 0.1;
                        ctx.fillStyle = '#d8b4fe';
                        ctx.beginPath();
                        ctx.arc(W/2, H/2, 100, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.globalAlpha = 1;
                        
                        for(let i=0; i<8; i++) {
                            const py = H - ((time * 1 + i * 30) % H);
                            const px = (W/2 - 80) + (i * 24) + Math.sin(time * 0.05 + i) * 40;
                            ctx.fillStyle = '#e9d5ff';
                            ctx.fillRect(px, py, 2, 4);
                        }
                    } else if (c4 === '4.2') {
                        for(let i=0; i<15; i++) {
                            if (Math.sin(time * 0.1 + i * 1.5) > 0.5) {
                                const px = 20 + i * 20;
                                const py = 80 + (i % 5) * 16;
                                ctx.fillStyle = '#fcd34d';
                                ctx.fillRect(px, py, 4, 4);
                                ctx.fillStyle = '#ffffff';
                                ctx.fillRect(px, py, 2, 2);
                            }
                        }
                    }

                    animationFrameId = requestAnimationFrame(render);;

let startIndex = content.indexOf('const PALETTE = {');
let endIndex = content.indexOf('animationFrameId = requestAnimationFrame(render);');
if(startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + replacement + content.substring(endIndex + 49);
    fs.writeFileSync('index.html', content);
    console.log('Success');
} else {
    console.log('Could not find markers');
}
