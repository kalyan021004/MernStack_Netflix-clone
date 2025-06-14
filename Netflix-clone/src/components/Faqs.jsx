import React, { useState } from 'react';

const faqs = [
  {
    question: 'What is Netflix?',
    answer: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
  },
  {
    question: 'How much does Netflix cost?',
    answer: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 per month.',
  },
  {
    question: 'Where can I watch?',
    answer: 'Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device.',
  },
  {
    question: 'How do I cancel?',
    answer: 'Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks.',
  },
  {
    question: 'What can I watch on Netflix?',
    answer: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.',
  },
];

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="btn btn-dark text-white w-100 text-start d-flex justify-content-between align-items-center"
        style={{ fontSize: '1.1rem', fontWeight: '600' }}
      >
        {question}
        <span style={{ fontSize: '1.5rem' }}>{open ? '-' : '+'}</span>
      </button>
      {open && (
        <div className="faq-answer mt-2 px-3" style={{ fontSize: '1rem', color: '#bbb' }}>
          {answer}
        </div>
      )}
    </div>
  );
}

export default function Faqs() {
  return (
    <section className="py-5 bg-dark text-white">
      <div className="container" style={{ maxWidth: '1200px' }}>
        <h2 className="mb-4 fw-bold">Frequently Asked Questions</h2>
        {faqs.map((faq, idx) => (
          <FaqItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
