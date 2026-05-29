const eppImports = import.meta.glob('../assets/epp/*.png', { eager: true });

export const eppList = Object.keys(eppImports)
  .sort((a, b) => {
    const matchA = a.match(/\/(\d+)\.png$/);
    const matchB = b.match(/\/(\d+)\.png$/);
    const numA = matchA ? parseInt(matchA[1], 10) : 0;
    const numB = matchB ? parseInt(matchB[1], 10) : 0;
    return numA - numB;
  })
  .map((path) => {
    const match = path.match(/\/(\d+)\.png$/);
    const num = match ? match[1] : 'unknown';
    return {
      id: `epp_${num}`,
      name: `EPP ${num}`,
      img: eppImports[path].default || eppImports[path]
    };
  });
