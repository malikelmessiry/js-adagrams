const letterPool = {
  'A': 9, 'B': 2, 'C': 2, 'D': 4, 'E': 12, 'F': 2, 'G': 3, 'H': 2, 'I': 9, 
  'J': 1, 'K': 1, 'L': 4, 'M': 2, 'N': 6, 'O': 8, 'P': 2, 'Q': 1, 'R': 6, 
  'S': 4, 'T': 6, 'U': 4, 'V': 2, 'W': 2, 'X': 1, 'Y': 2, 'Z': 1
}

const getAllLetters = () => {
  let allLetters = [];
  for (const letter in letterPool) {
    const freq = letterPool[letter];
    allLetters.push(...letter.repeat(freq))
  } return allLetters;
}

export const drawLetters = () => {
  let allLetters = getAllLetters();
  let hand = [];
  for (let i = 0; i < 10; i++) {
    let randIndex = Math.floor(Math.random() * allLetters.length);
    let letter = allLetters.splice(randIndex, 1)[0];
    hand.push(letter);
  } return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  let lettersInHandCopy = [...lettersInHand];
  for (const char of input.toUpperCase()) {
    const index = lettersInHandCopy.indexOf(char);
    if (index === -1) {
      return false;
    } lettersInHandCopy.splice(index, 1);
  } return true;
};

export const scoreWord = (word) => {

  const scoreChart = {
    A: 1, B: 3, C: 3, D: 2, E: 1,
    F: 4, G: 2, H: 4, I: 1, J: 8,
    K: 5, L: 1, M: 3, N: 1, O: 1,
    P: 3, Q: 10, R: 1, S: 1, T: 1,
    U: 1, V: 4, W: 4, X: 8, Y: 4,
    Z: 10
  };
  

  let score = 0;
  if (word.length >= 7 && word.length <= 10) {
    score += 8;
  }

  for (const char of word.toUpperCase()) {
    score += scoreChart[char];
  } 
  return score;
}

export const highestScoreFrom = (words) => {
  let topScore = 0;
  let topWord = '';

  for (const word of words) {
    let wordScore = scoreWord(word);
    if (wordScore > topScore) {
      topWord = word;
      topScore = wordScore;
    } else if (wordScore === topScore) {
      let isTenLetterWord = word.length === 10 && topWord.length !== 10;
      let isShorterWord = word.length < topWord.length && topWord.length !== 10;
      if (isTenLetterWord | isShorterWord) {
        topWord = word;
      }
    }
  }
  return {
    'word': topWord,
    'score': topScore,
  };
}
