const About = () => {
  return (
    <div className="about">
      <div className="bg-gradient"></div>
      <div className="about-container">
        <div className="about-heading">Welcome to Wherely!</div>
        <div className="about-paragraph">
          At the heart of the app is a carefully curated collection of
          captivating photos, each brimming with hidden characters waiting to be
          discovered. Get ready to embark on a thrilling journey as you put your
          observation skills to the test.
        </div>
        <div className="about-paragraph">
          User-friendly interface ensures a seamless and intuitive experience.
          Simply click on a photo, and like magic, a targeting box will appear,
          ready for your exploration. To enhance the excitement, I have provided
          a list of characters for you to choose from, allowing you to tag the
          hidden gems you encounter.
        </div>
        <div className="about-paragraph">
          But that's not all! Firebase backend system validates your selections
          in real-time, providing immediate feedback on your accuracy. With
          every correct tag, you'll feel a rush of accomplishment, spurring you
          on to find even more elusive characters.
        </div>
        <div className="about-paragraph">
          To add an element of competition, I have implemented a timer that
          tracks your progress. Challenge yourself to improve your speed and
          precision with each playthrough. Enter your name to compete for a
          coveted spot on the high scores table, showcasing your mastery of the
          game.
        </div>
        <div className="about-paragraph">
          So dive in, embrace the challenge, and lose yourself in the
          captivating world of our photo tagging app. Let the adventure begin!
        </div>
        <div className="about-credentials">
          Game console images provided by{' '}
          <a href="https://www.artstation.com/pierreroussel">Pierre Roussel</a>
        </div>
      </div>
    </div>
  );
};

export default About;
