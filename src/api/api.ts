import { kodams, badNames, badWords, goodNames } from './Kodam';

export const fetchKodam = async (): Promise<string> => {
  const isUnlucky = Math.random() < 0.3; 
  const isLucky = Math.random() < 0.1; 

  if (isUnlucky) {
    const badName = badNames[Math.floor(Math.random() * badNames.length)];
    const badWord = badWords[Math.floor(Math.random() * badWords.length)];
    return `${badWord} Kamu dapat nama kodam: ${badName}`;
  }

  if (isLucky) {
    const goodName = goodNames[Math.floor(Math.random() * goodNames.length)];
    return `Selamat! Kamu beruntung! Nama kodam keren kamu adalah: ${goodName}`;
  }

  const kodam = kodams[Math.floor(Math.random() * kodams.length)];
  return `Selamat! Nama kodam kamu adalah: ${kodam}`;
};
