export function genRanPwd(long = 4) {
  const nRandom = (range) => Math.round(Math.random() * range);

  const characters = "ac1bde2fgh3ijk4lmn5opq6rst7uvw8x9yz0";

  let pwd = "";

  for (let i = 0; i < long; i++) {
    if (nRandom(99) % 2) {
      pwd += characters[nRandom(characters.length - 1)].toUpperCase();
    } else {
      pwd += characters[nRandom(characters.length - 1)];
    }
  }
  return pwd;
}