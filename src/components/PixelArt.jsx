// Original pixel illustrations: each character is one crisp SVG square.
const drawings = {
  dog: [
    '........................',
    '.......oooooooo.........',
    '.....oottttttttoo.......',
    '....obblwwwwwwlbbo......',
    '....obblwwwwwwlbbo......',
    '....obblwowwowlbbo......',
    '....obblwwwwwwlbbo......',
    '....obblwwwwwllbbo......',
    '.....oolwwbbwwloo.......',
    '......olwwbbwwlo........',
    '.......olwppwlo.........',
    '.......oopppoo..........',
    '......olrrrrrlo.........',
    '......olllwlllo...oo....',
    '.....olllwwwlllo.otlo...',
    '.....olllwwwlllo.otlo...',
    '.....olllwwwlllootlo....',
    '.....olllwwwllllttlo....',
    '.....ololwwwlollllo.....',
    '.....owwooooowwloo......',
    '......oo....ooo.........',
    '........................',
  ],
  star: [
    '........................', '...........oo...........', '..........oyyo..........', '..........oyyo..........', '.........oyyyyo.........', '.........oyyyyo.........', '...ooooooyyyyyyoooooo...', '...oyyyyyyyyyyyyyyyo...', '....oyyyyyyyyyyyyyo....', '.....oyyyyyyyyyyyo.....', '......oyyyyyyyyyo......', '......oyyyyyyyyyo......', '......oyyyyyyyyyo......', '.....oyyyyyyyyyyyo.....', '.....oyyyyoooyyyyo.....', '....oyyyyo...oyyyyo....', '....oyyyo.....oyyyo....', '....oyyo.......oyyo....', '.....oo.........oo.....', '........................', '........................', '........................',
  ],
  bow: [
    '........................', '........................', '........................', '...oooo..........oooo...', '..oppppo........oppppo..', '..oppccpo......opccppo..', '..oppcccpo....opcccppo..', '..oppccccooooooccccppo..', '..oppccccoppppoccccppo..', '...opccccoppppoccccpo...', '....opcccoppppocccpo....', '.....oooooppppooooo.....', '.........oooooo.........', '........oppooppo........', '.......opppoopppo.......', '......oppppooppppo......', '.....oppppo..oppppo.....', '.....opppo....opppo.....', '......ooo......ooo......', '........................', '........................', '........................',
  ],
  laptop: [
    '........................', '........................', '...oooooooooooooooooo...', '...ollllllllllllllllo...', '...olddddddddddddddlo...', '...olddddddddddddddlo...', '...olddddddddddddddlo...', '...oldddwwddddwwdddlo...', '...olddwwddddddwwddlo...', '...oldwwddddddddwwdlo...', '...olddwwddddddwwddlo...', '...oldddwwddddwwdddlo...', '...olddddddddddddddlo...', '...olddddddddddddddlo...', '...ollllllllllllllllo...', '...oooooooooooooooooo...', '..oppppppppppppppppppo..', '.oppppppppppppppppppppo.', '.opppppppoooooopppppppo.', '..oooooooooooooooooooo..', '........................', '........................',
  ],
  book: [
    '........................', '........................', '.....oooooooooooooo.....', '....oppppppppppppppo....', '...ooppppppppppppppo....', '...ococcccccccccccco....', '...ococcccccccccccco....', '...ococccwwwwwwcccco....', '...ococccwwwwwwcccco....', '...ococccwwwwwwcccco....', '...ococcccccccccccco....', '...ococcccccccccccco....', '...ococcccccccccccco....', '...ococcccccccccccco....', '...ococcccccccccccco....', '...ococcccccccccccco....', '...ooooooooooooooooo....', '...owwwwwwwwwwwwwwwo....', '...owwwwwwwwwwwwwwwo....', '....ooooooooooooooo.....', '........................', '........................',
  ],
  coin: [
    '........................', '........................', '.........oooooo.........', '.......ooyyyyyyoo.......', '......oyywwwwwwyyo......', '.....oyywwyyyywwyyo.....', '....oyywwyyoyyywwyyo....', '....oyywyyooooyywyyo....', '....oyywyooyyyyywyyo....', '....oyywyooyyyyywyyo....', '....oyywyyoooyyywyyo....', '....oyywyyyyoooywyyo....', '....oyywyyyyoooywyyo....', '....oyywyyooooyywyyo....', '....oyywwyyoyyywwyyo....', '.....oyywwyyyywwyyo.....', '......oyywwwwwwyyo......', '.......ooyyyyyyoo.......', '.........oooooo.........', '........................', '........................', '........................',
  ],
  mug: [
    '........................', '........s...s...........', '.......ss..ss...........', '.......s...s............', '........s...s...........', '........................',
    '.....oooooooooooo.......', '....otttttttttttto......', '....occccccccccccoooo...', '....occcccccccccco..oo..', '....occcwwcccwwcco...o..', '....occwwwwcwwwwco...o..', '....occcwwwwwwwcco...o..', '....occccwwwwwccco..oo..', '....occcccwwwccccoooo...', '....occccccwccccco......', '.....occcccccccco.......', '......oooooooooo........', '........................', '...pppppppppppppppppp...', '....oooooooooooooooo....', '........................',
  ],
  cake: [
    '........................', '...........gg...........', '..........gg............', '.........rrr............', '........rrrrr...........', '.........rrr............', '.........wwww...........', '.......wwwwwwww.........', '.....wwwwwwwwwwww.......', '....oooooooooooooo......', '....wppppppppppppw......', '....wwwwwwwwwwwwww......', '....wyyyyyyyyyyyyw......', '....wyyyyyyyyyyyyw......', '....wrrrrrrrrrrrrw......', '....wwwwwwwwwwwwww......', '....wyyyyyyyyyyyyw......', '....wyyyyyyyyyyyyw......', '....oooooooooooooo......', '........................', '........................', '........................',
  ],
  croissant: [
    '........................', '........................', '........................', '........................', '.........oooooo.........', '.......ooyyyyyyoo.......', '.....ooyyoyyyyoyyoo.....', '....oyyyyoyyyyoyyyyo....', '...oyyyyoyyyyyyoyyyyo...', '..oyyyyyoyyyyyyoyyyyyo..', '..oyyyyoyyyyyyyyoyyyyo..', '.oyyyooyyyyyyyyyyooyyyo.', '.oyyyoyyyyyyyyyyyyoyyyo.', '.oyyyooyyyyyyyyyyooyyyo.', '..oyyyooyyyyyyyyooyyyo..', '..oyyyoooyyyyyyoooyyyo..', '...oyyo..oooooo..oyyo...', '....oo............oo....', '........................', '........................', '........................', '........................',
  ],
  cookie: [
    '........................', '........................', '.........oooooo.........', '......oooyyyyyyooo......', '.....oyyyyyyyyyyyyo.....', '....oyyyybbbyyyyyyyo....', '...oyyyyybbbbyyyyyyyo...', '...oyyyyyyyyyyybbyyyo...', '..oyyyyyyyyyyyybbbyyyo..', '..oyybbbyyyyyyyyyyyyyo..', '..oyybbbbyyyyyyyyyyyyo..', '..oyyybbyyyyybbbyyyyyo..', '..oyyyyyyyyyybbbbyyyyo..', '..oyyyyyyyyyyybbyyyyyo..', '...oyyybbbyyyyyyyyyyo...', '...oyyybbbbyyyyyyyyyo...', '....oyyybbyyybbyyyyo....', '.....oyyyyyyybbyyyo.....', '......oooyyyyyyooo......', '.........oooooo.........', '........................', '........................',
  ],
  cat: [
    '........................', '........................', '........................', '........................', '........................', '........................', '.....oo......oo.........', '.....oto....oto.........', '.....ottollotto.........', '.....ollllllllo.........', '....ollllllllllooooo....', '....olllllllllllllllo...', '....oloollloollllllllo..', '....olllltllllllllllllo.', '.....ollwwllllllllllllo.', '......oollllllllllllllo.', '....oooooollllllllllllo.', '...olllllllllllllllllo..', '....ooooooooooooooooo...', '........................', '........................', '........................',
  ],
};
const colors = { o: '#75505b', t: '#bd788f', c: '#d99caa', s: '#bea793', w: '#fff6e5', p: '#f1c6d0', r: '#bd516e', g: '#6f8656', y: '#e8c777', b: '#835241', l: '#dfbbc8', d: '#9b9ab5' };
export default function PixelArt({ kind = 'mug', variant = 0 }) {
  const palette = { ...colors, ...(variant === 1 ? { c: '#8c9b70', t: '#596643', p: '#c3c7a4' } : {}), ...(kind === 'dog' ? { o: '#705044', l: '#d6b08c', t: '#b98c6a', b: '#775441' } : {}) };
  return <svg className={`pixel-art pixel-${kind}`} viewBox="0 0 24 22" xmlns="http://www.w3.org/2000/svg" shapeRendering="crispEdges" aria-hidden="true" focusable="false">{drawings[kind].flatMap((row, y) => [...row].map((char, x) => palette[char] ? <rect key={`${x}-${y}`} className={char === 's' ? 'steam-pixel' : undefined} x={x} y={y} width="1" height="1" fill={palette[char]} /> : null))}</svg>;
}
