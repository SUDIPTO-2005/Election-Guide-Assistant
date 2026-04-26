import type { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 'basics-1',
    title: 'lessons.basics1.title',
    description: 'lessons.basics1.description',
    content: 'lessons.basics1.content',
    category: 'Election Basics',
    readTime: 3,
    quiz: [
      {
        id: 'q1',
        question: 'lessons.basics1.q1.question',
        options: ['lessons.basics1.q1.o1', 'lessons.basics1.q1.o2', 'lessons.basics1.q1.o3', 'lessons.basics1.q1.o4'],
        correctAnswer: 1,
        explanation: 'Elections are formal processes to choose individuals for public office.',
        category: 'basics',
        level: 'beginner'
      },
      {
        id: 'q2',
        question: 'lessons.basics1.q2.question',
        options: ['lessons.basics1.q2.o1', 'lessons.basics1.q2.o2', 'lessons.basics1.q2.o3', 'lessons.basics1.q2.o4'],
        correctAnswer: 1,
        explanation: 'Elections have been the usual mechanism since the 17th century.',
        category: 'basics',
        level: 'beginner'
      },
      {
        id: 'q3',
        question: 'lessons.basics1.q3.question',
        options: ['lessons.basics1.q3.o1', 'lessons.basics1.q3.o2', 'lessons.basics1.q3.o3', 'lessons.basics1.q3.o4'],
        correctAnswer: 1,
        explanation: 'Elections are formal group decision-making processes.',
        category: 'basics',
        level: 'beginner'
      }
    ]
  },
  {
    id: 'basics-2',
    title: 'lessons.basics2.title',
    description: 'lessons.basics2.description',
    content: 'lessons.basics2.content',
    category: 'Election Basics',
    readTime: 4,
    quiz: [
      {
        id: 'q1',
        question: 'lessons.basics2.q1.question',
        options: ['lessons.basics2.q1.o1', 'lessons.basics2.q1.o2', 'lessons.basics2.q1.o3', 'lessons.basics2.q1.o4'],
        correctAnswer: 1,
        explanation: 'Voting is the foundation of democracy, allowing citizens to voice their opinions.',
        category: 'basics',
        level: 'beginner'
      },
      {
        id: 'q2',
        question: 'lessons.basics2.q2.question',
        options: ['lessons.basics2.q2.o1', 'lessons.basics2.q2.o2', 'lessons.basics2.q2.o3', 'lessons.basics2.q2.o4'],
        correctAnswer: 1,
        explanation: 'Voters choose representatives who will make decisions on laws and policies.',
        category: 'basics',
        level: 'beginner'
      },
      {
        id: 'q3',
        question: 'lessons.basics2.q3.question',
        options: ['lessons.basics2.q3.o1', 'lessons.basics2.q3.o2', 'lessons.basics2.q3.o3', 'lessons.basics2.q3.o4'],
        correctAnswer: 3,
        explanation: 'Elected representatives make decisions on public matters, not personal habits like diet.',
        category: 'basics',
        level: 'beginner'
      }
    ]
  },
  {
    id: 'systems-1',
    title: 'lessons.systems1.title',
    description: 'lessons.systems1.description',
    content: 'lessons.systems1.content',
    category: 'Electoral Systems',
    readTime: 6,
    quiz: [
      {
        id: 'q1',
        question: 'lessons.systems1.q1.question',
        options: ['lessons.systems1.q1.o1', 'lessons.systems1.q1.o2', 'lessons.systems1.q1.o3', 'lessons.systems1.q1.o4'],
        correctAnswer: 0,
        explanation: 'First-Past-The-Post is a common electoral system.',
        category: 'systems',
        level: 'intermediate'
      },
      {
        id: 'q2',
        question: 'lessons.systems1.q2.question',
        options: ['lessons.systems1.q2.o1', 'lessons.systems1.q2.o2', 'lessons.systems1.q2.o3', 'lessons.systems1.q2.o4'],
        correctAnswer: 1,
        explanation: 'PR stands for Proportional Representation.',
        category: 'systems',
        level: 'intermediate'
      },
      {
        id: 'q3',
        question: 'lessons.systems1.q3.question',
        options: ['lessons.systems1.q3.o1', 'lessons.systems1.q3.o2', 'lessons.systems1.q3.o3', 'lessons.systems1.q3.o4'],
        correctAnswer: 2,
        explanation: 'Different systems exist because they balance various goals and have different pros and cons.',
        category: 'systems',
        level: 'intermediate'
      }
    ]
  },
  {
    id: 'process-1',
    title: 'lessons.process1.title',
    description: 'lessons.process1.description',
    content: 'lessons.process1.content',
    category: 'Voting Process',
    readTime: 5,
    quiz: [
      {
        id: 'q1',
        question: 'lessons.process1.q1.question',
        options: ['lessons.process1.q1.o1', 'lessons.process1.q1.o2', 'lessons.process1.q1.o3', 'lessons.process1.q1.o4'],
        correctAnswer: 1,
        explanation: 'You must be registered to vote before you can cast a ballot.',
        category: 'process',
        level: 'intermediate'
      },
      {
        id: 'q2',
        question: 'lessons.process1.q2.question',
        options: ['lessons.process1.q2.o1', 'lessons.process1.q2.o2', 'lessons.process1.q2.o3', 'lessons.process1.q2.o4'],
        correctAnswer: 1,
        explanation: 'The process varies significantly by country and even by region.',
        category: 'process',
        level: 'intermediate'
      },
      {
        id: 'q3',
        question: 'lessons.process1.q3.question',
        options: ['lessons.process1.q3.o1', 'lessons.process1.q3.o2', 'lessons.process1.q3.o3', 'lessons.process1.q3.o4'],
        correctAnswer: 2,
        explanation: 'Depending on the location, registration can be automatic or require active filing.',
        category: 'process',
        level: 'intermediate'
      }
    ]
  },
  {
    id: 'process-2',
    title: 'lessons.process2.title',
    description: 'lessons.process2.description',
    content: 'lessons.process2.content',
    category: 'Voting Process',
    readTime: 4,
    quiz: [
      {
        id: 'q1',
        question: 'lessons.process2.q1.question',
        options: ['lessons.process2.q1.o1', 'lessons.process2.q1.o2', 'lessons.process2.q1.o3', 'lessons.process2.q1.o4'],
        correctAnswer: 0,
        explanation: 'Voters typically go to a designated polling station.',
        category: 'process',
        level: 'beginner'
      },
      {
        id: 'q2',
        question: 'lessons.process2.q2.question',
        options: ['lessons.process2.q2.o1', 'lessons.process2.q2.o2', 'lessons.process2.q2.o3', 'lessons.process2.q2.o4'],
        correctAnswer: 1,
        explanation: 'Voting booths ensure the privacy and secrecy of your vote.',
        category: 'process',
        level: 'beginner'
      },
      {
        id: 'q3',
        question: 'lessons.process2.q3.question',
        options: ['lessons.process2.q3.o1', 'lessons.process2.q3.o2', 'lessons.process2.q3.o3', 'lessons.process2.q3.o4'],
        correctAnswer: 1,
        explanation: 'Many countries offer mail-in or early voting options.',
        category: 'process',
        level: 'beginner'
      }
    ]
  },
  {
    id: 'safety-1',
    title: 'lessons.safety1.title',
    description: 'lessons.safety1.description',
    content: 'lessons.safety1.content',
    category: 'Election Safety',
    readTime: 5,
    quiz: [
      {
        id: 'q1',
        question: 'lessons.safety1.q1.question',
        options: ['lessons.safety1.q1.o1', 'lessons.safety1.q1.o2', 'lessons.safety1.q1.o3', 'lessons.safety1.q1.o4'],
        correctAnswer: 1,
        explanation: 'Misinformation and fake news can spread quickly during campaigns.',
        category: 'safety',
        level: 'advanced'
      },
      {
        id: 'q2',
        question: 'lessons.safety1.q2.question',
        options: ['lessons.safety1.q2.o1', 'lessons.safety1.q2.o2', 'lessons.safety1.q2.o3', 'lessons.safety1.q2.o4'],
        correctAnswer: 1,
        explanation: 'It is crucial to verify sources and check facts before sharing.',
        category: 'safety',
        level: 'advanced'
      },
      {
        id: 'q3',
        question: 'lessons.safety1.q3.question',
        options: ['lessons.safety1.q3.o1', 'lessons.safety1.q3.o2', 'lessons.safety1.q3.o3', 'lessons.safety1.q3.o4'],
        correctAnswer: 1,
        explanation: 'Checking dates helps prevent being misled by old news presented out of context.',
        category: 'safety',
        level: 'advanced'
      }
    ]
  },
  {
    id: 'campaign-1',
    title: 'lessons.campaign1.title',
    description: 'lessons.campaign1.description',
    content: 'lessons.campaign1.content',
    category: 'Electoral Systems',
    readTime: 5,
    quiz: [
      {
        id: 'q1',
        question: 'lessons.campaign1.q1.question',
        options: ['lessons.campaign1.q1.o1', 'lessons.campaign1.q1.o2', 'lessons.campaign1.q1.o3', 'lessons.campaign1.q1.o4'],
        correctAnswer: 1,
        explanation: 'The main concern is that large, untraceable donations could lead to corruption.',
        category: 'finance',
        level: 'intermediate'
      },
      {
        id: 'q2',
        question: 'lessons.campaign1.q2.question',
        options: ['lessons.campaign1.q2.o1', 'lessons.campaign1.q2.o2', 'lessons.campaign1.q2.o3', 'lessons.campaign1.q2.o4'],
        correctAnswer: 1,
        explanation: 'Transparency allows voters to see who is financially backing candidates.',
        category: 'finance',
        level: 'intermediate'
      },
      {
        id: 'q3',
        question: 'lessons.campaign1.q3.question',
        options: ['lessons.campaign1.q3.o1', 'lessons.campaign1.q3.o2', 'lessons.campaign1.q3.o3', 'lessons.campaign1.q3.o4'],
        correctAnswer: 1,
        explanation: 'Limits help level the playing field so wealthy individuals don\'t dominate the process.',
        category: 'finance',
        level: 'intermediate'
      }
    ]
  },
  {
    id: 'digital-1',
    title: 'lessons.digital1.title',
    description: 'lessons.digital1.description',
    content: 'lessons.digital1.content',
    category: 'Election Safety',
    readTime: 6,
    quiz: [
      {
        id: 'q1',
        question: 'lessons.digital1.q1.question',
        options: ['lessons.digital1.q1.o1', 'lessons.digital1.q1.o2', 'lessons.digital1.q1.o3', 'lessons.digital1.q1.o4'],
        correctAnswer: 1,
        explanation: 'Social media allows candidates to speak directly to voters without traditional media filters.',
        category: 'digital',
        level: 'advanced'
      },
      {
        id: 'q2',
        question: 'lessons.digital1.q2.question',
        options: ['lessons.digital1.q2.o1', 'lessons.digital1.q2.o2', 'lessons.digital1.q2.o3', 'lessons.digital1.q2.o4'],
        correctAnswer: 1,
        explanation: 'Echo chambers occur when algorithms show you content that aligns with your views, limiting exposure to different perspectives.',
        category: 'digital',
        level: 'advanced'
      },
      {
        id: 'q3',
        question: 'lessons.digital1.q3.question',
        options: ['lessons.digital1.q3.o1', 'lessons.digital1.q3.o2', 'lessons.digital1.q3.o3', 'lessons.digital1.q3.o4'],
        correctAnswer: 1,
        explanation: 'Micro-targeting can be used to send specific messages to small groups that the general public never sees.',
        category: 'digital',
        level: 'advanced'
      }
    ]
  },
  {
    id: 'privacy-1',
    title: 'lessons.privacy1.title',
    description: 'lessons.privacy1.description',
    content: 'lessons.privacy1.content',
    category: 'Election Safety',
    readTime: 4,
    quiz: [
      {
        id: 'q1',
        question: 'lessons.privacy1.q1.question',
        options: ['lessons.privacy1.q1.o1', 'lessons.privacy1.q1.o2', 'lessons.privacy1.q1.o3', 'lessons.privacy1.q1.o4'],
        correctAnswer: 1,
        explanation: 'Secrecy ensures that nobody can know how you voted, preventing intimidation.',
        category: 'privacy',
        level: 'basic'
      },
      {
        id: 'q2',
        question: 'lessons.privacy1.q2.question',
        options: ['lessons.privacy1.q2.o1', 'lessons.privacy1.q2.o2', 'lessons.privacy1.q2.o3', 'lessons.privacy1.q2.o4'],
        correctAnswer: 0,
        explanation: 'Voter databases contain sensitive personal information that must be secured to maintain trust in the system.',
        category: 'privacy',
        level: 'intermediate'
      },
      {
        id: 'q3',
        question: 'lessons.privacy1.q3.question',
        options: ['lessons.privacy1.q3.o1', 'lessons.privacy1.q3.o2', 'lessons.privacy1.q3.o3', 'lessons.privacy1.q3.o4'],
        correctAnswer: 1,
        explanation: 'Physical barriers like compartments ensure that other people cannot see your choices.',
        category: 'privacy',
        level: 'basic'
      }
    ]
  },
  {
    id: 'eligibility-1',
    title: 'lessons.eligibility1.title',
    description: 'lessons.eligibility1.description',
    content: 'lessons.eligibility1.content',
    category: 'Electoral Systems',
    readTime: 5,
    quiz: [
      {
        id: 'q1',
        question: 'lessons.eligibility1.q1.question',
        options: ['lessons.eligibility1.q1.o1', 'lessons.eligibility1.q1.o2', 'lessons.eligibility1.q1.o3', 'lessons.eligibility1.q1.o4'],
        correctAnswer: 1,
        explanation: 'Almost all countries require candidates to be citizens.',
        category: 'eligibility',
        level: 'basic'
      },
      {
        id: 'q2',
        question: 'lessons.eligibility1.q2.question',
        options: ['lessons.eligibility1.q2.o1', 'lessons.eligibility1.q2.o2', 'lessons.eligibility1.q2.o3', 'lessons.eligibility1.q2.o4'],
        correctAnswer: 1,
        explanation: 'Holding certain government roles while running can create unfair advantages or conflicts of interest.',
        category: 'eligibility',
        level: 'intermediate'
      },
      {
        id: 'q3',
        question: 'lessons.eligibility1.q3.question',
        options: ['lessons.eligibility1.q3.o1', 'lessons.eligibility1.q3.o2', 'lessons.eligibility1.q3.o3', 'lessons.eligibility1.q3.o4'],
        correctAnswer: 1,
        explanation: 'In many countries, you can vote at 18 but must be 25 or older to run for major offices.',
        category: 'eligibility',
        level: 'intermediate'
      }
    ]
  },
  {
    id: 'media-1',
    title: 'lessons.media1.title',
    description: 'lessons.media1.description',
    content: 'lessons.media1.content',
    category: 'Election Terms',
    readTime: 6,
    quiz: [
      {
        id: 'q1',
        question: 'lessons.media1.q1.question',
        options: ['lessons.media1.q1.o1', 'lessons.media1.q1.o2', 'lessons.media1.q1.o3', 'lessons.media1.q1.o4'],
        correctAnswer: 1,
        explanation: 'The media acts as a watchdog by investigating and reporting on those in power.',
        category: 'media',
        level: 'intermediate'
      },
      {
        id: 'q2',
        question: 'lessons.media1.q2.question',
        options: ['lessons.media1.q2.o1', 'lessons.media1.q2.o2', 'lessons.media1.q2.o3', 'lessons.media1.q2.o4'],
        correctAnswer: 1,
        explanation: 'Bias occurs when media outlets favor one side over another in their coverage.',
        category: 'media',
        level: 'intermediate'
      },
      {
        id: 'q3',
        question: 'lessons.media1.q3.question',
        options: ['lessons.media1.q3.o1', 'lessons.media1.q3.o2', 'lessons.media1.q3.o3', 'lessons.media1.q3.o4'],
        correctAnswer: 1,
        explanation: 'Diversifying sources helps you see different viewpoints and verify facts.',
        category: 'media',
        level: 'basic'
      }
    ]
  }
];
