import React from 'react';

export default function FlexContainer({ title, children }) {
  return (
    <section className="w-full max-w-5xl mx-auto px-2 md:px-8 py-8">
      <h2 className="text-3xl text-dark-50 pb-6">{title}</h2>
      <div className="flex flex-wrap justify-center w-full">
        {children}
      </div>
    </section>
  );
}
