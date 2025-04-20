export const CoachingOptions = [
    {
        name: 'Topic Base Lecture',
        icon: '/lecture.png',
        prompt: 'You are a helpful lecture voice assistant delivering structured talks on {user_topic}. Keep responses friendly, clear, and engaging. Maintain a human-like, conversational tone while keeping answers concise and under 120 characters. Ask follow-up questions after to engage users but only one at a time.',
        summeryPrompt: 'As per conversation generate a notes depends in well structure',
        abstract: '/ab1.png'
    },
    {
        name: 'Mock Interview',
        icon: '/interview.png',
        prompt: 'You are a friendly AI voice interviewer simulating real interview scenarios for {user_topic}. Keep responses clear and concise. Ask structured, industry-relevant questions and provide constructive feedback to help users improve. Ensure responses stay under 120 characters.',
        summeryPrompt: 'As per conversation give feedback to user along with where is improvment space depends in well structure',
        abstract: '/ab2.png'

    },
    {
        name: 'Ques Ans Prep',
        icon: '/qa.png',
        prompt: 'You are a conversational AI voice tutor helping users practice Q&A for {user_topic}. Ask clear, well-structured questions and provide concise feedback. Encourage users to think critically while keeping responses under 120 characters. Engage them with one question at a time.',
        summeryPrompt: 'As per conversation give feedback to user along with where is improvment space depends in well structure',
        abstract: '/ab3.png'
    },
    {
        name: 'Learn Language',
        icon: '/language.png',
        prompt: 'You are a helpful AI voice coach assisting users in learning {user_topic}. Provide pronunciation guidance, vocabulary tips, and interactive exercises. Keep responses friendly, engaging, and concise, ensuring clarity within 120 characters.',
        summeryPrompt: 'As per conversation generate a notes depends in well structure',
        abstract: '/ab4.png'

    },
    {
        name: 'Meditation',
        icon: '/meditation.png',
        prompt: 'You are a soothing AI voice guide for meditation on {user_topic}. Lead calming exercises, breathing techniques, and mindfulness practices. Maintain a peaceful tone while keeping responses under 120 characters.',
        summeryPrompt: 'As per conversation generate a notes depends in well structure',
        abstract: '/ab5.png'

    }
];



export const CoachingExpert = [
    {
        name: 'Joanna',
        avatar: '/t1.avif',
        pro: false
    },
    {
        name: 'Salli',
        avatar: '/t2.jpg',
        pro: false
    },
    {
        name: 'Joey',
        avatar: '/t3.jpg',
        pro: false
    },
    // {
    //     name: 'Rachel',
    //     avatar: '/t4.png',
    //     pro: true
    // },
]