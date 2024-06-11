import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-4xl font-bold text-center text-blue-600">
        About TouTix
      </h1>
      <div className="text-lg leading-relaxed text-gray-800">
        <p className="mb-6">
          Welcome to <span className="text-blue-500">TouTix</span>, your premier
          online ticket selling platform!
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-blue-600">
          TouTix Mission Statement
        </h2>
        <p className="mb-6">
          TouTix is dedicated to revolutionizing ticketing by creating a fair,
          transparent platform that ensures equitable access and maximizes
          profitability for event organizers, artists, and teams, while
          maintaining affordable prices for fans.
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-blue-600">
          What is TouTix?
        </h2>
        <p className="mb-6">
          TouTix is an innovative online ticketing marketplace that transforms
          how tickets are bought and sold. Our platform not only allows for the
          purchase and sale of tickets to a wide range of events but also
          introduces a game-changing profit-sharing model on secondary sales,
          safeguarding against scalping and promoting fair pricing. With TouTix,
          users enjoy a seamless experience enriched with options for
          pre-ordering merchandise, parking, and concessions.
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-blue-600">
          Our Culture
        </h2>
        <p className="mb-6">
          At TouTix, we thrive on innovation and collaboration to connect and
          enrich the experiences of live event enthusiasts around the world. We
          champion a culture where performers, athletes, organizers, and fans
          come first. We recognize that artists and athletes dedicate their
          lives to their craft, and fans invest hard-earned money to engage with
          these performances. We ensure that true fans never lose out to
          scalpers and that attending an event isn’t just about being in a
          place; it’s about being part of a community that shares a love for the
          music, sport, or performance. We are committed to making each event
          the best possible experience, as attending an event is today’s true
          luxury. We’re dedicated to rewarding fans, filling stands, and cutting
          out the middleman, ensuring that every ticket enriches and celebrates
          the community it serves.
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-blue-600">
          Our Principles
        </h2>
        <ul className="mb-6 list-disc list-inside">
          <li className="mb-2">
            <span className="font-semibold">Give Fans a Voice:</span> We empower
            ticket buyers and sellers to have a voice in the marketplace,
            ensuring their rights are defended and their opinions matter.
          </li>
          <li className="mb-2">
            <span className="font-semibold">
              Build Connection and Community:
            </span>{' '}
            By enhancing the way tickets are bought and sold, we strengthen
            community ties and bring people closer through shared live
            experiences.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Serve Everyone:</span> TouTix is
            committed to technological inclusivity, ensuring our services are
            accessible to all, enhancing convenience while minimizing added
            costs.
          </li>
          <li className="mb-2">
            <span className="font-semibold">
              Keep People Safe and Protect Privacy:
            </span>{' '}
            We prioritize the safety and privacy of our users, employing
            advanced security measures to protect data and transactions.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Promote Economic Opportunity:</span>{' '}
            Our tools are designed to level the playing field, allowing vendors,
            artists, and teams to flourish at their full capacity.
          </li>
        </ul>
        <h2 className="mb-4 text-2xl font-semibold text-blue-600">
          Meet the Founders
        </h2>
        <p className="mb-6">
          Dillane Wehbe and Daniel Zhang are the driving force behind TouTix.
          Dillane, a former high-performance athlete and music producer from the
          US, faced firsthand the challenges of being priced out of live events
          during his college days in New York. Daniel, originally a world-class
          pianist and top junior tennis player, encountered similar barriers due
          to scalpers in both London and China. The duo met at Durham
          University, where the idea for TouTix was born from a shared vision to
          make live events more accessible and enjoyable. Together, they are
          turning their vision into a reality, making live events more equitable
          and enjoyable for everyone involved.
        </p>
      </div>
    </div>
  );
};

export default About;
