import { Question, PrizeLevel } from '../types/game';

export const PRIZE_LADDER: PrizeLevel[] = [
  { level: 16, points: 70000000, label: '7 CRORE 🏆', isMilestone: true },
  { level: 15, points: 10000000, label: '1 CRORE ⭐', isMilestone: false },
  { level: 14, points: 5000000, label: '50 Lakh ⭐', isMilestone: false },
  { level: 13, points: 2500000, label: '25 Lakh ⭐', isMilestone: false },
  { level: 12, points: 1250000, label: '12.5 Lakh ⭐', isMilestone: false },
  { level: 11, points: 640000, label: '6,40,000 ⭐', isMilestone: false },
  { level: 10, points: 320000, label: '3,20,000 🚩', isMilestone: true }, // Padhao 2
  { level: 9, points: 160000, label: '1,60,000 ⭐', isMilestone: false },
  { level: 8, points: 80000, label: '80,000 ⭐', isMilestone: false },
  { level: 7, points: 40000, label: '40,000 ⭐', isMilestone: false },
  { level: 6, points: 20000, label: '20,000 ⭐', isMilestone: false },
  { level: 5, points: 10000, label: '10,000 🚩', isMilestone: true }, // Padhao 1
  { level: 4, points: 5000, label: '5,000 ⭐', isMilestone: false },
  { level: 3, points: 3000, label: '3,000 ⭐', isMilestone: false },
  { level: 2, points: 2000, label: '2,000 ⭐', isMilestone: false },
  { level: 1, points: 1000, label: '1,000 ⭐', isMilestone: false },
];

export const INITIAL_QUESTIONS: Question[] = [
  // --- TODDLER (3-5 Years) ---
  {
    id: 't-1',
    statement: "Which animal gives us milk and says 'Moo Moo'?",
    category: "Animals",
    ageGroup: 'toddler',
    emoji: "🐮",
    options: ["Cat", "Cow", "Lion", "Duck"],
    correctIndex: 1,
    explanation: "Cows give us fresh healthy milk and go 'Moo Moo'!",
    hint: "It has two horns, eats green grass, and gives white milk!"
  },
  {
    id: 't-2',
    statement: "What color is the sky on a sunny, bright day?",
    category: "Colors & Nature",
    ageGroup: 'toddler',
    emoji: "☀️",
    options: ["Green", "Blue", "Black", "Pink"],
    correctIndex: 1,
    explanation: "The clear sunny sky is beautiful bright blue!",
    hint: "It's the same color as the big ocean water!"
  },
  {
    id: 't-3',
    statement: "Which fruit is red, sweet, and keeps the doctor away?",
    category: "Fruits & Food",
    ageGroup: 'toddler',
    emoji: "🍎",
    options: ["Apple", "Lemon", "Carrot", "Potato"],
    correctIndex: 0,
    explanation: "An apple a day keeps the doctor away!",
    hint: "It starts with the letter 'A' and is crunchy and red!"
  },
  {
    id: 't-4',
    statement: "How many legs does a cute little doggy have?",
    category: "Counting",
    ageGroup: 'toddler',
    emoji: "🐶",
    options: ["2 legs", "4 legs", "6 legs", "8 legs"],
    correctIndex: 1,
    explanation: "Dogs walk and run happily on 4 paws!",
    hint: "Two in front, and two in the back! Count: 1, 2, 3, 4!"
  },
  {
    id: 't-5',
    statement: "What do we use to clean and brush our teeth every morning?",
    category: "Good Habits",
    ageGroup: 'toddler',
    emoji: "🪥",
    options: ["Pencil", "Toothbrush", "Spoon", "Comb"],
    correctIndex: 1,
    explanation: "We use a toothbrush with toothpaste to keep teeth sparkling clean!",
    hint: "You put minty toothpaste on its soft bristles!"
  },
  {
    id: 't-6',
    statement: "What shape is a yummy round pizza pie or a coin?",
    category: "Shapes",
    ageGroup: 'toddler',
    emoji: "🍕",
    options: ["Square", "Circle", "Triangle", "Star"],
    correctIndex: 1,
    explanation: "A round pizza, clock face, and coin are all circles!",
    hint: "It goes round and round with no corners at all!"
  },
  {
    id: 't-7',
    statement: "Which baby animal is called a 'kitten'?",
    category: "Animals",
    ageGroup: 'toddler',
    emoji: "🐱",
    options: ["Baby Dog", "Baby Cat", "Baby Bird", "Baby Elephant"],
    correctIndex: 1,
    explanation: "A baby cat says 'meow' and is called a sweet kitten!",
    hint: "It loves chasing balls of yarn and drinking milk!"
  },
  {
    id: 't-8',
    statement: "What color is a ripe, delicious banana that monkeys love?",
    category: "Colors & Nature",
    ageGroup: 'toddler',
    emoji: "🍌",
    options: ["Purple", "Yellow", "Blue", "Black"],
    correctIndex: 1,
    explanation: "Ripe bananas have a bright yellow peel!",
    hint: "It is bright like sunshine!"
  },
  {
    id: 't-9',
    statement: "Which body part do you use to listen to music and stories?",
    category: "My Body",
    ageGroup: 'toddler',
    emoji: "👂",
    options: ["Nose", "Ears", "Elbow", "Toes"],
    correctIndex: 1,
    explanation: "We hear wonderful sounds with our two ears!",
    hint: "They are on the left and right sides of your head!"
  },
  {
    id: 't-10',
    statement: "What appears in the sky during the day that gives us light and warmth?",
    category: "Nature",
    ageGroup: 'toddler',
    emoji: "🌞",
    options: ["The Sun", "The Moon", "Snowman", "Flashlight"],
    correctIndex: 0,
    explanation: "The big golden Sun shines bright and warms our planet!",
    hint: "It rises in the morning and sets in the evening!"
  },
  {
    id: 't-11',
    statement: "Which vehicle has two wheels and pedals you push with your feet?",
    category: "Vehicles",
    ageGroup: 'toddler',
    emoji: "🚲",
    options: ["Aeroplane", "Bicycle", "Train", "Submarine"],
    correctIndex: 1,
    explanation: "A bicycle has 2 wheels, a bell, and pedals to ride!",
    hint: "You wear a helmet and ring its bell 'Tring Tring'!"
  },
  {
    id: 't-12',
    statement: "Which bird swims in the pond and says 'Quack Quack'?",
    category: "Animals",
    ageGroup: 'toddler',
    emoji: "🦆",
    options: ["Duck", "Owl", "Eagle", "Penguin"],
    correctIndex: 0,
    explanation: "Ducks have webbed feet to swim and love to quack!",
    hint: "Five little ones went swimming one day... over the hill and far away!"
  },
  {
    id: 't-13',
    statement: "What do you put on your feet before putting on shoes?",
    category: "Daily Life",
    ageGroup: 'toddler',
    emoji: "🧦",
    options: ["Gloves", "Socks", "Hat", "Scarf"],
    correctIndex: 1,
    explanation: "We pull on cozy socks before tying our shoes!",
    hint: "They keep your little toes warm inside your shoes!"
  },
  {
    id: 't-14',
    statement: "How many eyes do people have on their face?",
    category: "Counting",
    ageGroup: 'toddler',
    emoji: "👀",
    options: ["1", "2", "4", "10"],
    correctIndex: 1,
    explanation: "We have two eyes to see all the colorful things in the world!",
    hint: "Count with me: One, Two!"
  },
  {
    id: 't-15',
    statement: "Which animal has a very long neck to reach high green leaves?",
    category: "Animals",
    ageGroup: 'toddler',
    emoji: "🦒",
    options: ["Giraffe", "Rabbit", "Turtle", "Mouse"],
    correctIndex: 0,
    explanation: "The tall giraffe has the longest neck in the animal kingdom!",
    hint: "It is the tallest land animal with yellow and brown spots!"
  },

  // --- JUNIOR (6-8 Years) ---
  {
    id: 'j-1',
    statement: "Which animal is famously known as the 'King of the Jungle'?",
    category: "Wild Animals",
    ageGroup: 'junior',
    emoji: "🦁",
    options: ["Elephant", "Lion", "Tiger", "Fox"],
    correctIndex: 1,
    explanation: "The brave Lion with a majestic mane is called the King of the Jungle!",
    hint: "Male ones have a big furry mane and a powerful roar!"
  },
  {
    id: 'j-2',
    statement: "How many days are there in a standard week?",
    category: "Math & Time",
    ageGroup: 'junior',
    emoji: "📅",
    options: ["5 days", "7 days", "10 days", "12 days"],
    correctIndex: 1,
    explanation: "There are 7 days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday!",
    hint: "Monday through Sunday makes a full week!"
  },
  {
    id: 'j-3',
    statement: "Which planet is our home, covered with oceans and green continents?",
    category: "Space & Science",
    ageGroup: 'junior',
    emoji: "🌍",
    options: ["Mars", "Earth", "Jupiter", "Venus"],
    correctIndex: 1,
    explanation: "Earth is the blue-green planet where humans, animals, and plants live!",
    hint: "It is often called the Blue Planet!"
  },
  {
    id: 'j-4',
    statement: "What sweet golden liquid do hardworking honeybees make?",
    category: "Nature",
    ageGroup: 'junior',
    emoji: "🍯",
    options: ["Milk", "Honey", "Chocolate", "Juice"],
    correctIndex: 1,
    explanation: "Honeybees collect nectar from colorful flowers to make sweet honey in hives!",
    hint: "Bears like Winnie the Pooh love eating pots of this!"
  },
  {
    id: 'j-5',
    statement: "At a traffic signal, which light color tells vehicles to STOP?",
    category: "Safety & Signs",
    ageGroup: 'junior',
    emoji: "🚦",
    options: ["Green", "Yellow", "Red", "Blue"],
    correctIndex: 2,
    explanation: "Red light means STOP, Yellow means wait/get ready, Green means GO!",
    hint: "Think of an apple or a strawberry color!"
  },
  {
    id: 'j-6',
    statement: "Which bird cannot fly in the air, but is a champion swimmer in chilly icy waters?",
    category: "Birds & Animals",
    ageGroup: 'junior',
    emoji: "🐧",
    options: ["Parrot", "Penguin", "Sparrow", "Peacock"],
    correctIndex: 1,
    explanation: "Penguins waddle on ice and 'fly' underwater like speed torpedoes!",
    hint: "They look like they are wearing black and white tuxedos!"
  },
  {
    id: 'j-7',
    statement: "What gas do green trees and plants release for us to breathe?",
    category: "Science & Nature",
    ageGroup: 'junior',
    emoji: "🌳",
    options: ["Oxygen", "Carbon", "Helium", "Steam"],
    correctIndex: 0,
    explanation: "Plants absorb carbon dioxide and give us fresh, life-giving oxygen!",
    hint: "It starts with the letter 'O' and fills our lungs with clean air!"
  },
  {
    id: 'j-8',
    statement: "What is 5 + 4?",
    category: "Fun Math",
    ageGroup: 'junior',
    emoji: "🔢",
    options: ["7", "8", "9", "10"],
    correctIndex: 2,
    explanation: "5 plus 4 equals 9! Great calculation, champ!",
    hint: "Hold up 5 fingers on one hand and 4 on the other, count them all together!"
  },
  {
    id: 'j-9',
    statement: "How many colors make up a bright rainbow after a rainy day?",
    category: "Science & Color",
    ageGroup: 'junior',
    emoji: "🌈",
    options: ["3 colors", "5 colors", "7 colors", "12 colors"],
    correctIndex: 2,
    explanation: "A rainbow has 7 colors: Violet, Indigo, Blue, Green, Yellow, Orange, Red (VIBGYOR)!",
    hint: "Remember the 7 letters in VIBGYOR!"
  },
  {
    id: 'j-10',
    statement: "What comes down from the clouds when water vapor cools down in the sky?",
    category: "Weather",
    ageGroup: 'junior',
    emoji: "🌧️",
    options: ["Sand", "Rain", "Fire", "Leaves"],
    correctIndex: 1,
    explanation: "Clouds release rain droplets when water droplets condense and grow heavy!",
    hint: "You open your umbrella and splash in puddles with boots!"
  },
  {
    id: 'j-11',
    statement: "Which is the largest animal currently living on planet Earth?",
    category: "Wild Animals",
    ageGroup: 'junior',
    emoji: "🐋",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctIndex: 1,
    explanation: "The giant Blue Whale in our oceans is the biggest animal to ever live!",
    hint: "It lives in the deep ocean and its tongue weighs as much as an elephant!"
  },
  {
    id: 'j-12',
    statement: "Which season comes with falling leaves and cooler windy days before winter?",
    category: "Seasons",
    ageGroup: 'junior',
    emoji: "🍂",
    options: ["Summer", "Autumn / Fall", "Spring", "Monsoon"],
    correctIndex: 1,
    explanation: "In Autumn (or Fall), tree leaves turn golden-orange and gently fall down!",
    hint: "Leaves turn yellow, red, and brown and crunch under your feet!"
  },
  {
    id: 'j-13',
    statement: "What do caterpillars turn into after resting peacefully in a cocoon?",
    category: "Life Cycles",
    ageGroup: 'junior',
    emoji: "🦋",
    options: ["Spider", "Butterfly", "Frog", "Beetle"],
    correctIndex: 1,
    explanation: "Caterpillars transform through metamorphosis into colorful butterflies!",
    hint: "It grows colorful wings and flutters gracefully from flower to flower!"
  },
  {
    id: 'j-14',
    statement: "I have hands and a face, but I cannot smile or clap. I tell you the time. What am I?",
    category: "Riddle",
    ageGroup: 'junior',
    emoji: "⏰",
    options: ["Mirror", "Clock", "Book", "Chair"],
    correctIndex: 1,
    explanation: "A clock has an hour hand, a minute hand, and a round clock face!",
    hint: "It ticks 'Tick Tock' all day on the wall!"
  },
  {
    id: 'j-15',
    statement: "How many continents are there in the world?",
    category: "World Geography",
    ageGroup: 'junior',
    emoji: "🗺️",
    options: ["4", "5", "7", "10"],
    correctIndex: 2,
    explanation: "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia!",
    hint: "The same number as the days in a week and colors in a rainbow!"
  },

  // --- BOTH (Fun Trivia for 3-8) ---
  {
    id: 'b-1',
    statement: "Which animal has a long flexible trunk to spray water and pick up peanuts?",
    category: "Animals",
    ageGroup: 'both',
    emoji: "🐘",
    options: ["Lion", "Elephant", "Horse", "Bear"],
    correctIndex: 1,
    explanation: "Elephants use their amazing long trunks to drink, trumpet, and grab food!",
    hint: "It is the largest land animal with big floppy ears!"
  },
  {
    id: 'b-2',
    statement: "What do you say when someone kindly gives you a gift or helps you?",
    category: "Manners",
    ageGroup: 'both',
    emoji: "🎁",
    options: ["Go Away", "Thank You", "No", "Goodbye"],
    correctIndex: 1,
    explanation: "Saying 'Thank You' is the magic polite phrase when someone is kind to us!",
    hint: "It is one of the Golden Words alongside 'Please' and 'Sorry'!"
  },
  {
    id: 'b-3',
    statement: "Which transport runs on railway tracks and says 'Chugga Chugga Choo Choo'?",
    category: "Vehicles",
    ageGroup: 'both',
    emoji: "🚂",
    options: ["Bus", "Train", "Boat", "Helicopter"],
    correctIndex: 1,
    explanation: "Trains have powerful engines and pull carriages along steel railway tracks!",
    hint: "It blows its whistle 'Choo Choo' and stops at platforms!"
  },
  {
    id: 'b-4',
    statement: "Which insect has eight legs and spins silky sticky webs to catch flies?",
    category: "Nature",
    ageGroup: 'both',
    emoji: "🕷️",
    options: ["Spider", "Ant", "Ladybug", "Grasshopper"],
    correctIndex: 0,
    explanation: "The itsy bitsy spider climbs up the water spout and weaves intricate webs!",
    hint: "Itsy Bitsy crawled up the water spout!"
  },
  {
    id: 'b-5',
    statement: "What shines brightly at night along with the moon in the clear dark sky?",
    category: "Sky & Space",
    ageGroup: 'both',
    emoji: "✨",
    options: ["Stars", "Raindrops", "Rainbow", "Sunflowers"],
    correctIndex: 0,
    explanation: "Twinkle twinkle little star, how I wonder what you are!",
    hint: "They twinkle like little diamonds in the sky!"
  }
];

// Helper to shuffle options and keep track of new correct index
export function shuffleQuestionOptions(q: Question): Question {
  const optionsWithIndex = q.options.map((opt, i) => ({ opt, originalIndex: i }));
  // Fisher-Yates shuffle
  for (let i = optionsWithIndex.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
  }

  const newCorrectIndex = optionsWithIndex.findIndex(item => item.originalIndex === q.correctIndex);
  const newOptions = optionsWithIndex.map(item => item.opt) as [string, string, string, string];

  return {
    ...q,
    options: newOptions,
    correctIndex: newCorrectIndex,
  };
}

// Select random pool of questions for game ladder
export function getGameQuestionPool(ageGroup: 'all' | 'toddler' | 'junior', totalLevels: number = 16): Question[] {
  let filtered = INITIAL_QUESTIONS.filter(q => {
    if (ageGroup === 'all') return true;
    return q.ageGroup === ageGroup || q.ageGroup === 'both';
  });

  // If filtered is fewer than totalLevels, repeat or wrap
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  const selected: Question[] = [];

  for (let i = 0; i < totalLevels; i++) {
    const baseQ = shuffled[i % shuffled.length];
    selected.push(shuffleQuestionOptions({
      ...baseQ,
      id: `${baseQ.id}-${i}-${Date.now()}`
    }));
  }

  return selected;
}
